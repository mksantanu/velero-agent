import { Controller } from '@nestjs/common';
import { Resources, V1ServerStatusRequest } from '@velero-agent/velero';
import { K8sCustomObjectService } from '@velero-agent-api/modules/k8s-custom-object/k8s-custom-object.service';
import { K8sCustomObjectController } from '@velero-agent-api/modules/k8s-custom-object/k8s-custom-object.controller';
import { Subject } from '@velero-agent-api/shared/decorators/subject.decorator';

@Controller(Resources.SERVER_STATUS_REQUEST.route)
@Subject(Resources.BACKUP.plural)
export class ServerStatusRequestController extends K8sCustomObjectController<V1ServerStatusRequest> {
  constructor(readonly k8sCustomObjectService: K8sCustomObjectService) {
    super(k8sCustomObjectService, Resources.SERVER_STATUS_REQUEST);
  }
}
