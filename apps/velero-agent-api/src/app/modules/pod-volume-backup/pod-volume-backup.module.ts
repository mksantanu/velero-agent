import { Module } from '@nestjs/common';
import { PodVolumeBackupController } from '@velero-agent-api/modules/pod-volume-backup/pod-volume-backup.controller';

@Module({
  controllers: [PodVolumeBackupController],
  providers: [],
  exports: [],
})
export class PodVolumeBackupModule {}
