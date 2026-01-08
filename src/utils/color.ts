import tinycolor from 'tinycolor2';
import { Theme } from '../theme/themes';
import { ColorValue } from 'react-native';

/* ============================
   TYPES
============================ */

interface Palette {
  base: ColorValue;
  light: ColorValue;
  dark: ColorValue;
  accent: ColorValue;
  complementary: ColorValue;
}



/* ============================
   CONSTANTS
============================ */

const MIN_CONTRAST = 4.5;

/* ============================
   ON COLOR HELPER
============================ */

const getOnColor = (bg: ColorValue): ColorValue => {
  const white = '#FFFFFF';
  const black = '#000000';

  const whiteC = tinycolor.readability(bg.toString(), white);
  const blackC = tinycolor.readability(bg.toString(), black);

  if (whiteC >= MIN_CONTRAST) return white;
  if (blackC >= MIN_CONTRAST) return black;

  return whiteC > blackC ? white : black;
};

/* ============================
   THEME GENERATOR
============================ */

export const generateTheme = (
  baseColor: ColorValue,
): {
  palette: Palette;
  light: Theme;
  dark: Theme;
} => {
  const base = tinycolor(baseColor.toString());

  /* --------------------
     1️⃣ PALETTE
  -------------------- */

  const palette: Palette = {
    base: base.toHexString(),
    light: base.clone().spin(20).lighten(10).toHexString(),
    dark: base.clone().darken(20).toHexString(),
    accent: base.clone().spin(170).toHexString(),
    complementary: base.clone().complement().toHexString(),
  };

  /* --------------------
     2️⃣ LIGHT THEME
  -------------------- */

  const lightBackground = tinycolor('#FFFFFF').darken(5).toHexString();
  const lightSurface = tinycolor('#FFFFFF').darken(9).toHexString();
  const lightPrimary = palette.base;
  const lightSecondary = palette.light;
  const lightAccent = palette.accent;

  const light: Theme = {
  
    primary: lightPrimary,
    secondary: lightSecondary,
    accent: lightAccent,
    
    
    onPrimary: getOnColor(lightPrimary),
    onSecondary: getOnColor(lightSecondary),
    onAccent: getOnColor(lightAccent),


      background: lightBackground,
      surface: lightSurface,
      border: base.clone().lighten(42).desaturate(25).toHexString(),
      
      onBackground: getOnColor(lightBackground),
      onSurface: getOnColor(lightSurface),

  };

  /* --------------------
     3️⃣ DARK THEME
  -------------------- */

  const darkBackground = tinycolor('#000000').lighten(10).toHexString();
  const darkSurface = tinycolor('#000000').lighten(18).toHexString();
  const darkPrimary = base.clone().lighten(14).saturate(6).toHexString();
  const darkSecondary = palette.light;
  const darkAccent = palette.accent;

  const dark: Theme = {
   
    primary: darkPrimary,
    secondary: darkSecondary,
    accent: darkAccent,
    
    onPrimary: getOnColor(darkPrimary),
    onSecondary: getOnColor(darkSecondary),
    onAccent: getOnColor(darkAccent),

    background: darkBackground,
    surface: darkSurface,
    border: base.clone().darken(35).desaturate(30).toHexString(),

    onBackground: getOnColor(darkBackground),
    onSurface: getOnColor(darkSurface),

     
  };

  return { palette, light, dark };
};
