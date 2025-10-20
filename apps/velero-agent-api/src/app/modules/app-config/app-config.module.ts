import { Module } from '@nestjs/common';
import { AppConfigController } from './app-config.controller';
import { AuthModule } from '@velero-agent-api/modules/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AppConfigController],
  providers: [],
})
export class AppConfigModule {}
