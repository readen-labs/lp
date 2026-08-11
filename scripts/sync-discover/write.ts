import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { CONTENT_DIR } from './constants';
import type { DiscoverSnapshot } from './transform';

const writeJson = (fileName: string, value: unknown): void => {
  const path = join(process.cwd(), CONTENT_DIR, fileName);
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
};

const writeDiscoverSnapshot = (snapshot: DiscoverSnapshot): void => {
  mkdirSync(join(process.cwd(), CONTENT_DIR), { recursive: true });

  writeJson('figures.json', { figures: snapshot.figures });
  writeJson('books.json', { books: snapshot.books });
  writeJson('industries.json', { industries: snapshot.industries });
};

export { writeDiscoverSnapshot };
