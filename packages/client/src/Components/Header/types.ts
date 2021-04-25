export interface ComponentPropsI {}

export enum ClassEndReason {
  Completed = 'completed',
  Aborted = 'aborted',
}

export enum ClassAbortReason {
  R1 = 'r1',
  R2 = 'r2',
  R3 = 'r3',
  R4 = 'r4',
  R5 = 'r5',
}

export interface ComponentStateI {
  countDownTime: number;
  isMenuOpen: boolean;
  showEndClassModal: boolean;
  classEndReason: ClassEndReason;
  classAbortReason?: ClassAbortReason;
}
