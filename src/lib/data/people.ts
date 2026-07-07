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

const avatarUrl = (seed: string) =>
  `https://api.dicebear.com/9.x/notionists/png?seed=${seed}&size=112`;

export const DISCOVER_PEOPLE: DiscoverPerson[] = [
  {
    name: 'Paul Graham',
    role: 'founder',
    avatar: avatarUrl('paul'),
  },
  {
    name: 'Reid Hoffman',
    role: 'investor',
    avatar: avatarUrl('reid'),
  },
  {
    name: 'Margaret Atwood',
    role: 'author',
    avatar: avatarUrl('margaret'),
  },
  {
    name: 'Naval Ravikant',
    role: 'investor',
    avatar: avatarUrl('naval'),
  },
  {
    name: 'Yuval Noah Harari',
    role: 'historian',
    avatar: avatarUrl('yuval'),
  },
  {
    name: 'Oprah Winfrey',
    role: 'media',
    avatar: avatarUrl('oprah'),
  },
];
