import { createClient, type SupabaseClient } from '@supabase/supabase-js';

import { FETCH_PAGE_SIZE, SUPABASE_ANON_KEY, SUPABASE_URL } from './constants';

type FigureRow = {
  id: string;
  slug: string;
  name: string;
  title: string | null;
  avatar_url: string | null;
  bio: string | null;
};

type BookRow = {
  id: string;
  isbn: string;
  title: string;
  cover: string | null;
  published_at: string | null;
  pages: number | null;
  synopsis: string | null;
};

type BookFigureRow = { figure_id: string; book_id: string };

type IndustryRow = { id: string; name: string };

type FigureIndustryRow = { figure_id: string; industry_id: string };

type AuthorRow = { id: string; name: string };

type BookAuthorRow = { book_id: string; author_id: string };

const createSupabaseClient = (): SupabaseClient => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error(
      'sync-discover requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_ANON_KEY in the environment (see scripts/sync-discover/README.md).',
    );
  }

  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
};

const fetchAllRows = async <T>(
  supabase: SupabaseClient,
  table: string,
  columns: string,
): Promise<T[]> => {
  const rows: T[] = [];
  let from = 0;

  for (;;) {
    const to = from + FETCH_PAGE_SIZE - 1;
    const { data, error } = await supabase
      .from(table)
      .select(columns)
      .range(from, to);

    if (error) {
      throw new Error(`Failed to fetch ${table}: ${error.message}`);
    }

    const page = (data ?? []) as T[];
    rows.push(...page);

    if (page.length < FETCH_PAGE_SIZE) {
      break;
    }

    from += FETCH_PAGE_SIZE;
  }

  return rows;
};

type DiscoverRawData = {
  figures: FigureRow[];
  books: BookRow[];
  bookFigures: BookFigureRow[];
  industries: IndustryRow[];
  figureIndustries: FigureIndustryRow[];
  authors: AuthorRow[];
  bookAuthors: BookAuthorRow[];
};

const fetchDiscoverData = async (): Promise<DiscoverRawData> => {
  const supabase = createSupabaseClient();

  const [
    figures,
    books,
    bookFigures,
    industries,
    figureIndustries,
    authors,
    bookAuthors,
  ] = await Promise.all([
    fetchAllRows<FigureRow>(
      supabase,
      'figures',
      'id, slug, name, title, avatar_url, bio',
    ),
    fetchAllRows<BookRow>(
      supabase,
      'books',
      'id, isbn, title, cover, published_at, pages, synopsis',
    ),
    fetchAllRows<BookFigureRow>(supabase, 'book_figure', 'figure_id, book_id'),
    fetchAllRows<IndustryRow>(supabase, 'industries', 'id, name'),
    fetchAllRows<FigureIndustryRow>(
      supabase,
      'figure_industry',
      'figure_id, industry_id',
    ),
    fetchAllRows<AuthorRow>(supabase, 'authors', 'id, name'),
    fetchAllRows<BookAuthorRow>(supabase, 'book_author', 'book_id, author_id'),
  ]);

  return {
    authors,
    bookAuthors,
    bookFigures,
    books,
    figureIndustries,
    figures,
    industries,
  };
};

export type {
  AuthorRow,
  BookAuthorRow,
  BookFigureRow,
  BookRow,
  DiscoverRawData,
  FigureIndustryRow,
  FigureRow,
  IndustryRow,
};
export { fetchDiscoverData };
