import { getTranslations } from 'next-intl/server';

import { NotFoundContent } from '@/components/layout/NotFoundContent';

export default async function NotFound() {
  const t = await getTranslations('notFound');

  return (
    <NotFoundContent
      title={t('title')}
      body={t('body')}
      homeLabel={t('home')}
    />
  );
}
