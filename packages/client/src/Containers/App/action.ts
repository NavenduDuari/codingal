import { ActionTypes } from './types';
import { Action } from '../../types';

export const testAction = (): Action<ActionTypes> => ({
  type: ActionTypes.TEST_ACTION,
  payload: {},
});
