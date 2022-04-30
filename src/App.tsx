import React from 'react';
import './App.scss';
import { Button, createTheme, ThemeProvider } from '@mui/material';
import styles from './style.module.scss';
import TopAppBar from "./publicsite/TopAppBar/TopAppBar";


function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: styles.colorPrimary
      },
      secondary: {
        main: styles.colorSecondary
      },
      error: {
        main: styles.colorDanger
      }
    }
  });


  return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <TopAppBar />
        </ThemeProvider>
      </div>
  );
}

export default App;
