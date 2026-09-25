import * as migration_20260907_002408_initial from './20260907_002408_initial';
import * as migration_20260907_141055_legal_documents from './20260907_141055_legal_documents';
import * as migration_20260907_232552_search_text from './20260907_232552_search_text';
import * as migration_20260908_124317_content_license_spelling from './20260908_124317_content_license_spelling';
import * as migration_20260910_220758_site_settings_chrome from './20260910_220758_site_settings_chrome';
import * as migration_20260911_003733_tags from './20260911_003733_tags';
import * as migration_20260911_121436_resources from './20260911_121436_resources';
import * as migration_20260911_122416_wiki_pillars from './20260911_122416_wiki_pillars';
import * as migration_20260911_124540_search_text_content from './20260911_124540_search_text_content';
import * as migration_20260911_140000_search_indexes from './20260911_140000_search_indexes';
import * as migration_20260925_020843_schema_review from './20260925_020843_schema_review';
import * as migration_20260925_124016_autosave_drafts from './20260925_124016_autosave_drafts';

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
    name: '20260907_232552_search_text',
  },
  {
    up: migration_20260908_124317_content_license_spelling.up,
    down: migration_20260908_124317_content_license_spelling.down,
    name: '20260908_124317_content_license_spelling',
  },
  {
    up: migration_20260910_220758_site_settings_chrome.up,
    down: migration_20260910_220758_site_settings_chrome.down,
    name: '20260910_220758_site_settings_chrome',
  },
  {
    up: migration_20260911_003733_tags.up,
    down: migration_20260911_003733_tags.down,
    name: '20260911_003733_tags',
  },
  {
    up: migration_20260911_121436_resources.up,
    down: migration_20260911_121436_resources.down,
    name: '20260911_121436_resources',
  },
  {
    up: migration_20260911_122416_wiki_pillars.up,
    down: migration_20260911_122416_wiki_pillars.down,
    name: '20260911_122416_wiki_pillars',
  },
  {
    up: migration_20260911_124540_search_text_content.up,
    down: migration_20260911_124540_search_text_content.down,
    name: '20260911_124540_search_text_content',
  },
  {
    up: migration_20260911_140000_search_indexes.up,
    down: migration_20260911_140000_search_indexes.down,
    name: '20260911_140000_search_indexes',
  },
  {
    up: migration_20260925_020843_schema_review.up,
    down: migration_20260925_020843_schema_review.down,
    name: '20260925_020843_schema_review',
  },
  {
    up: migration_20260925_124016_autosave_drafts.up,
    down: migration_20260925_124016_autosave_drafts.down,
    name: '20260925_124016_autosave_drafts'
  },
];
