export type SocialNetwork =
  | 'linkedin'
  | 'instagram'
  | 'tiktok'
  | 'x'
  | 'youtube';

export type SocialIconLinkProps = {
  network: SocialNetwork;
  href: string;
  label: string;
  className?: string;
};
