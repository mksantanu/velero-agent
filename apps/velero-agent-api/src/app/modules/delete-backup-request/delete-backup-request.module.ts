import { Module } from '@nestjs/common';
import { DeleteBackupRequestController } from '@velero-agent-api/modules/delete-backup-request/delete-backup-request.controller';

@Module({
  controllers: [DeleteBackupRequestController],
  providers: [],
  exports: [],
})
export class DeleteBackupRequestModule {}
