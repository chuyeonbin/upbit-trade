import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './store/store';
import { Provider } from 'react-redux';
import GlobalStyle from './styles/globalStyle';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
