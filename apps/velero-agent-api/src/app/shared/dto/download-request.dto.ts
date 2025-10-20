import { IsNotEmpty, IsString } from 'class-validator';
import { V1DownloadTargetKind } from '@velero-agent/velero';

export class CreateDownloadRequestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  kind: V1DownloadTargetKind;
}
