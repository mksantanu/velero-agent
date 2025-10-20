import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SettingsService } from '@velero-agent-api/modules/settings/settings.service';
import { AppLogger } from '@velero-agent-api/shared/modules/logger/logger.service';
import { UseGuards } from '@nestjs/common';
import { WsJwtAuthGuard } from '@velero-agent-api/shared/guards/ws-jwt-auth.guard';
import {
  AppAbility,
  CaslAbilityFactory,
} from '@velero-agent-api/shared/modules/casl/casl-ability.factory';
import { Action, LogType } from '@velero-agent/shared-types';
import { CheckPolicies } from '@velero-agent-api/shared/decorators/check-policies.decorator';

@WebSocketGateway({ cors: true })
export class SettingsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly settingsService: SettingsService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
    private logger: AppLogger
  ) {}

  handleConnection(@ConnectedSocket() client: Socket): void {
    this.logger.debug(`Client connected ${client.id}`, WebSocketGateway.name);
  }

  handleDisconnect(@ConnectedSocket() client: Socket): void {
    this.logger.debug(
      `Client disconnected ${client.id}`,
      WebSocketGateway.name
    );
    this.settingsService.closeLogsSteam(client);
  }

  @UseGuards(WsJwtAuthGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Manage, 'all'))
  @SubscribeMessage('settings:logs:on')
  public logsServerOn(
    @ConnectedSocket() client: Socket,
    @MessageBody('type') type: LogType,
    @MessageBody('name') name: string
  ): void {
    this.settingsService.openLogsStream(client, type, name);
  }

  @UseGuards(WsJwtAuthGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Manage, 'all'))
  @SubscribeMessage('settings:logs:off')
  public logsServerOff(@ConnectedSocket() client: Socket): void {
    this.settingsService.closeLogsSteam(client);
  }
}
