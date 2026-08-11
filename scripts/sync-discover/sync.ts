import { fetchDiscoverData } from './queries';
import { transformDiscoverData } from './transform';
import { writeDiscoverSnapshot } from './write';

const run = async (): Promise<void> => {
  console.log('sync-discover: fetching from Supabase...');
  const raw = await fetchDiscoverData();
  console.log(
    `sync-discover: fetched ${raw.figures.length} figures, ${raw.books.length} books, ${raw.bookFigures.length} recommendations, ${raw.industries.length} industries`,
  );

  const snapshot = transformDiscoverData(raw);
  console.log(
    `sync-discover: writing ${snapshot.figures.length} figures, ${snapshot.books.length} referenced books, ${snapshot.industries.length} industries`,
  );

  writeDiscoverSnapshot(snapshot);
  console.log('sync-discover: done — src/content/discover/*.json updated');
};

run().catch((error: unknown) => {
  console.error('sync-discover failed:', error);
  process.exit(1);
});
