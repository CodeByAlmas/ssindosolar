// Curved clip-path wipes (objectBoundingBox units). "in" rises from the bottom, "out" leaves through the top.
export const WIPE = {
  empty: 'M0,1 L0,1 Q0.5,1 1,1 L1,1 Z',
  mid: 'M0,1 L0,0.5 Q0.5,0 1,0.5 L1,1 Z',
  full: 'M0,1 L0,0 Q0.5,0 1,0 L1,1 Z',
  fullTop: 'M0,0 L0,1 Q0.5,1 1,1 L1,0 Z',
  midOut: 'M0,0 L0,0.5 Q0.5,1 1,0.5 L1,0 Z',
  gone: 'M0,0 L0,0 Q0.5,0 1,0 L1,0 Z',
};
