import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { ServerStatusRequestModule } from '@velero-agent-api/modules/server-status-request/server-status-request.module';
import { SettingsGateway } from '@velero-agent-api/modules/settings/settings.gateway';
import { AuthModule } from '@velero-agent-api/modules/auth/auth.module';
import { CaslModule } from '@velero-agent-api/shared/modules/casl/casl.module';

@Module({
  imports: [AuthModule, CaslModule, ServerStatusRequestModule],
  controllers: [SettingsController],
  providers: [SettingsService, SettingsGateway],
})
export class SettingsModule {}
