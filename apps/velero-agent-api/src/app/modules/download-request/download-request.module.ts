import { Module } from '@nestjs/common';
import { DownloadRequestService } from 'apps/velero-agent-api/src/app/modules/download-request/download-request.service';
import { DownloadRequestController } from '@velero-agent-api/modules/download-request/download-request.controller';

@Module({
  controllers: [DownloadRequestController],
  providers: [DownloadRequestService],
  exports: [DownloadRequestService],
})
export class DownloadRequestModule {}
