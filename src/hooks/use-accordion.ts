import { useId, useState } from 'react';

export const useAccordion = () => {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) =>
    setOpenId((current) => (current === id ? null : id));

  return { baseId, openId, handleToggle };
};
