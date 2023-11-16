/* eslint-disable @typescript-eslint/no-explicit-any */
import { createTheme as createMuiTheme } from '@mui/material';
import { createPalette } from './palette';
import { createComponents } from './componentsTheme';
import { createShadows } from './shadows';
import { createTypography } from './typography';

export function createTheme() {
  const palette = createPalette();
  const components = createComponents({ palette });
  const shadows = createShadows();
  const typography = createTypography();

  return createMuiTheme({
    components: components as any,

    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1440,
      },
    },
    palette: palette as any,
    shadows: shadows as any,
    shape: {
      borderRadius: 8,
    },
    typography: typography as any,
  });
}
