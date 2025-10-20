import { Module } from '@nestjs/common';
import { FormController } from '@velero-agent-api/modules/form/form.controller';
import { FormService } from '@velero-agent-api/modules/form/form.service';

@Module({
  controllers: [FormController],
  providers: [FormService],
})
export class FormModule {}
