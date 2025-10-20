import { Controller } from '@nestjs/common';
import { Resources, V1PodVolumeRestore } from '@velero-agent/velero';
import { K8sCustomObjectService } from '@velero-agent-api/modules/k8s-custom-object/k8s-custom-object.service';
import { K8sCustomObjectController } from '@velero-agent-api/modules/k8s-custom-object/k8s-custom-object.controller';
import { Subject } from '@velero-agent-api/shared/decorators/subject.decorator';

@Controller(Resources.POD_VOLUME_RESTORE.route)
@Subject(Resources.POD_VOLUME_RESTORE.plural)
export class PodVolumeRestoreController extends K8sCustomObjectController<V1PodVolumeRestore> {
  constructor(readonly k8sCustomObjectService: K8sCustomObjectService) {
    super(k8sCustomObjectService, Resources.POD_VOLUME_RESTORE);
  }
}
