import {Action} from '@ngrx/store';

export const START_LOADING: string = '[UI] Start Loading';
export const STOP_LOADING: string = '[UI] Stop Loading';

//for completion support
export class StartLoading implements Action
{
  readonly type: string = START_LOADING;
}

export class StopLoading implements Action
{
  readonly type: string = STOP_LOADING;
}

export type UIActions = StartLoading | StopLoading;


