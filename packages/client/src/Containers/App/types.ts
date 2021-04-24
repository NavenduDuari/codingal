export enum ActionTypes {
  TEST_ACTION = 'test-action',
}

export interface MapStateToPropsI {}

export interface MapDispatchToPropsI {}

export interface ComponentPropsI {}

export type PropsI = MapStateToPropsI & MapDispatchToPropsI & ComponentPropsI;

export interface ComponentStateI {}

export interface StoreStateI {}
