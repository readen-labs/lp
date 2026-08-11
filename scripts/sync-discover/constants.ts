const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';

const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY ?? '';

const FETCH_PAGE_SIZE = 1000;

const CONTENT_DIR = 'src/content/discover';

export { CONTENT_DIR, FETCH_PAGE_SIZE, SUPABASE_ANON_KEY, SUPABASE_URL };
