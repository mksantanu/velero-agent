import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ImagePullPolicyEnum } from '@velero-agent/shared-types';

export class AddVeleroPluginDTO {
  @IsString()
  @IsNotEmpty()
  image: string;

  @IsOptional()
  @IsEnum(ImagePullPolicyEnum)
  imagePullPolicy: ImagePullPolicyEnum;
}
