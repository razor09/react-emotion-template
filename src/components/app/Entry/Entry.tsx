import { Global, ThemeProvider } from '@emotion/react';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../../store';
import { styles, theme } from '../../../theme';
import { StartPage } from '../StartPage';
import { EntryComponent } from './Entry.d';

export const Entry: EntryComponent = () => {
  return (
    <Provider {...store}>
      <ThemeProvider theme={theme}>
        <Global styles={styles} />
        <BrowserRouter>
          <StartPage />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};
