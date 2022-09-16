import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    box-sizing:border-box;
    outline:none;
    border:none;
    margin:0;
  }
  ul {
    list-style: none;
  }
  a {
    text-decoration: none;
    color: black;
  }
`;

export default GlobalStyle;
