import { DefaultTheme } from 'styled-components';

const colors = {
  darkGray: '#666',
  lightGray: '#d5d6dc',
  lightBlue: '#1976d2',
  lightRed: '#c84a31',
};

const fontSize = {
  microSmall: '8px',
  micro: '14px',
  small: '16px',
  regular: '20px',
  medium: '28px',
  large: '32px',
};

export type ColorsTypes = typeof colors;
export type FontSizeTypes = typeof fontSize;

const theme: DefaultTheme = {
  colors,
  fontSize,
};

export default theme;
