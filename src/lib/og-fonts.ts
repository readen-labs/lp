import path from 'path';
import { readFile } from 'fs/promises';

/* Satori (next/og ImageResponse) cannot use the app's next/font pipeline and
   needs raw static TTF data — variable fonts and woff2 are unsupported. */

const FONTS_DIR = path.join(process.cwd(), 'src/assets/fonts');

export const loadOgFonts = async () => {
  const [regular, semibold] = await Promise.all([
    readFile(path.join(FONTS_DIR, 'lora-regular.ttf')),
    readFile(path.join(FONTS_DIR, 'lora-semibold.ttf')),
  ]);

  return [
    {
      name: 'Lora',
      data: regular,
      weight: 400 as const,
      style: 'normal' as const,
    },
    {
      name: 'Lora',
      data: semibold,
      weight: 600 as const,
      style: 'normal' as const,
    },
  ];
};
