import { registerAs } from '@nestjs/config';
import * as process from 'process';
import {BasicAuthConfig} from "@velero-agent/shared-types";

export default registerAs('basicAuth', (): BasicAuthConfig => {
  return {
    enabled: process.env.BASIC_AUTH_ENABLED === 'true' || false,
    username: process.env.BASIC_AUTH_USERNAME || 'psetadmin',
    password: process.env.BASIC_AUTH_PASSWORD || 'veler0u3y3ep04p5et',
  };
});
