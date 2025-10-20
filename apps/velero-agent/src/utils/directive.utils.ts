import type { App } from 'vue';
import { clickOutsideDirective } from '@velero-agent-app/directives/click-outside.directive';
import { dropdownDirective } from '@velero-agent-app/directives/dropdown.directive';
import { canDirective } from '@velero-agent-app/directives/can.directive';
import { copyDirective } from '@velero-agent-app/directives/copy.directive';
import { downloadDirective } from '@velero-agent-app/directives/download.directive';

export const registerDirectives = (app: App) => {
  app.directive('clickOut', clickOutsideDirective);
  app.directive('dropdown', dropdownDirective);
  app.directive('can', canDirective);
  app.directive('copyToClipboard', copyDirective);
  app.directive('download', downloadDirective);
};
