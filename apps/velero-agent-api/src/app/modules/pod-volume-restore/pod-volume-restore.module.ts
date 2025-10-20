import { Module } from '@nestjs/common';
import { PodVolumeRestoreController } from '@velero-agent-api/modules/pod-volume-restore/pod-volume-restore.controller';

@Module({
  controllers: [PodVolumeRestoreController],
  providers: [],
  exports: [],
})
export class PodVolumeRestoreModule {}
