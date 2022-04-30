import React from 'react';
import './App.scss';
import { Button, createTheme, ThemeProvider } from '@mui/material';
import styles from './style.module.scss';


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
          <Button variant="contained">primary</Button>
          <Button color="secondary" variant="contained">
            secondary
          </Button>
          <Button color="error" variant="contained">
            danger
          </Button>
        </ThemeProvider>
      </div>
  );
}

export default App;
