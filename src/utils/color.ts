import tinycolor from 'tinycolor2';

interface Palette {
  base: string;
  light: string;
  dark: string;
  accent: string;
  complementary: string;
}

interface Theme {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  accent: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
}

export const generateTheme = (
  baseColor: string,
): {
  palette: Palette;
  light: Theme;
  dark: Theme;
} => {
  const base = tinycolor(baseColor);

  /* -------------------- */
  /* 1️⃣ PALETTE */
  /* -------------------- */
  const palette: Palette = {
    base: base.toHexString(),

    light: base.clone().spin(20).toHexString(),
    dark: base.clone().darken(20).toHexString(),

    accent: base.clone().spin(170).toHexString(),
    complementary: base.clone().complement().toHexString(),
  };

  /* -------------------- */
  /* 2️⃣ LIGHT THEME */
  /* -------------------- */
  const light: Theme = {
    background: tinycolor('#fff').darken(5).toHexString(),
    surface:  tinycolor('#fff').darken(5).darken(4).toHexString(),

    primary: palette.base,
    secondary: palette.light,
    accent: palette.accent,

    // 🔹 Okunabilirlik için sabit ve test edilmiş değerler
    textPrimary: '#111827', // gray-900
    textSecondary: '#4B5563', // gray-600

    border: base.clone().lighten(42).desaturate(25).toHexString(),
  };

  /* -------------------- */
  /* 3️⃣ DARK THEME */
  /* -------------------- */
  const dark: Theme = {
    background: tinycolor('#000').lighten(10).toHexString(),
    surface:  tinycolor('#000').lighten(10).lighten(8).toHexString(),


    // 🔹 Dark mode'da primary mutlaka açılmalı
    primary: base.clone().lighten(14).saturate(6).toHexString(),
    
    secondary: palette.light,

    // 🔹 Accent daha az patlak
    accent: palette.accent,

    textPrimary: '#E5E7EB', // gray-200
    textSecondary: '#9CA3AF', // gray-400

    border: base.clone().darken(35).desaturate(30).toHexString(),
  };

  return { palette, light, dark };
};
