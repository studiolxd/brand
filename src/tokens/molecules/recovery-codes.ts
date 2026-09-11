import recoveryCodes from '../../../tokens/molecule/recovery-codes.json';
import { flattenTokens } from '../utils';

export const recoveryCodesTokens = flattenTokens(recoveryCodes as never);
