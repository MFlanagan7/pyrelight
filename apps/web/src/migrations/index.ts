import * as migration_20260907_002408_initial from './20260907_002408_initial';

export const migrations = [
  {
    up: migration_20260907_002408_initial.up,
    down: migration_20260907_002408_initial.down,
    name: '20260907_002408_initial'
  },
];
