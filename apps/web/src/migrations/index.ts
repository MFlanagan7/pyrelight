import * as migration_20260907_002408_initial from './20260907_002408_initial';
import * as migration_20260907_141055_legal_documents from './20260907_141055_legal_documents';
import * as migration_20260907_232552_search_text from './20260907_232552_search_text';

export const migrations = [
  {
    up: migration_20260907_002408_initial.up,
    down: migration_20260907_002408_initial.down,
    name: '20260907_002408_initial',
  },
  {
    up: migration_20260907_141055_legal_documents.up,
    down: migration_20260907_141055_legal_documents.down,
    name: '20260907_141055_legal_documents',
  },
  {
    up: migration_20260907_232552_search_text.up,
    down: migration_20260907_232552_search_text.down,
    name: '20260907_232552_search_text'
  },
];
