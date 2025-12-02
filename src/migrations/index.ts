import * as migration_20251202_165106 from './20251202_165106';
import * as migration_20251202_165541 from './20251202_165541';

export const migrations = [
  {
    up: migration_20251202_165106.up,
    down: migration_20251202_165106.down,
    name: '20251202_165106',
  },
  {
    up: migration_20251202_165541.up,
    down: migration_20251202_165541.down,
    name: '20251202_165541'
  },
];
