export type DiscoverPersonRole =
  | 'founder'
  | 'investor'
  | 'author'
  | 'historian'
  | 'media'
  | 'scientist';

export type DiscoverPerson = {
  name: string;
  role: DiscoverPersonRole;
  avatar: string;
};

const AVATARS_BASE_URL =
  'https://qksmdkcxwljszptmykyj.supabase.co/storage/v1/object/public/avatars';

const avatarUrl = (slug: string) => `${AVATARS_BASE_URL}/${slug}.avif`;

export const DISCOVER_PEOPLE: DiscoverPerson[] = [
  {
    name: 'Bill Gates',
    role: 'founder',
    avatar: avatarUrl('bill-gates'),
  },
  {
    name: 'Naval Ravikant',
    role: 'investor',
    avatar: avatarUrl('naval-ravikant'),
  },
  {
    name: 'J.K. Rowling',
    role: 'author',
    avatar: avatarUrl('jk-rowling'),
  },
  {
    name: 'Yuval Noah Harari',
    role: 'historian',
    avatar: avatarUrl('yuval-noah-harari'),
  },
  {
    name: 'Tim Ferriss',
    role: 'media',
    avatar: avatarUrl('tim-ferriss'),
  },
  {
    name: 'Adam Grant',
    role: 'scientist',
    avatar: avatarUrl('adam-grant'),
  },
];
