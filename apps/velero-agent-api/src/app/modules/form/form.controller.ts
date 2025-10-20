import { Controller, Get } from '@nestjs/common';
import { FormService } from '@velero-agent-api/modules/form/form.service';
import { Observable } from 'rxjs';
import { FormList } from '@velero-agent/shared-types';

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Get('/schedules')
  public getFormSchedules(): Observable<FormList<string>> {
    return this.formService.getSchedules();
  }

  @Get('/backups')
  public getFormBackups(): Observable<FormList<string>> {
    return this.formService.getBackups();
  }

  @Get('/namespaces')
  public getNamespaces(): Observable<FormList<string>> {
    return this.formService.getNamespaces();
  }

  @Get('/storage-locations')
  public getStorageLocations(): Observable<FormList<string>> {
    return this.formService.getStorageLocations();
  }

  @Get('/snapshot-locations')
  public getSnapshotLocations(): Observable<FormList<string>> {
    return this.formService.getSnapshotLocations();
  }

  @Get('/secrets')
  public getFormSecrets(): Observable<FormList<string>> {
    return this.formService.getSecrets();
  }

  @Get('/config-maps')
  public getFormConfigMaps(): Observable<FormList<string>> {
    return this.formService.getConfigMaps();
  }
}
