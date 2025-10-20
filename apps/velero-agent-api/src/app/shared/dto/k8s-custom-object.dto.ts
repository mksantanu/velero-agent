import { IsIn, IsOptional, IsString } from 'class-validator';
import { PLURALS } from '@velero-agent/velero';

export class K8sCustomObjectParams {
  @IsOptional()
  @IsIn(PLURALS)
  plural: string;

  @IsOptional()
  @IsString()
  name?: string;
}
