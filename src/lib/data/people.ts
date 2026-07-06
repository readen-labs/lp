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

export const DISCOVER_PEOPLE: DiscoverPerson[] = [
  {
    name: 'Paul Graham',
    role: 'founder',
    avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=paul',
  },
  {
    name: 'Reid Hoffman',
    role: 'investor',
    avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=reid',
  },
  {
    name: 'Margaret Atwood',
    role: 'author',
    avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=margaret',
  },
  {
    name: 'Naval Ravikant',
    role: 'investor',
    avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=naval',
  },
  {
    name: 'Yuval Noah Harari',
    role: 'historian',
    avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=yuval',
  },
  {
    name: 'Oprah Winfrey',
    role: 'media',
    avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=oprah',
  },
];
