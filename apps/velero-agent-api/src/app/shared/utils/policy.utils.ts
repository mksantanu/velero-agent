import { Action } from '@velero-agent/shared-types';
import { PLURALS } from '@velero-agent/velero';

export const isValidPermission = (action: string, subject: string): boolean => {
  return (
    Object.values(Action).includes(action as Action) &&
    [...PLURALS, 'all'].includes(subject)
  );
};
