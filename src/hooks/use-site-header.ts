import { useState } from 'react';

export const useSiteHeader = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleToggleMenu = () => setMenuOpen((open) => !open);

  const handleCloseMenu = () => setMenuOpen(false);

  return { menuOpen, handleToggleMenu, handleCloseMenu };
};
