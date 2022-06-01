import React from 'react';
import './App.scss';
import {createTheme, ThemeProvider } from '@mui/material';
import styles from './style.module.scss';
import TopAppBar from "./publicsite/TopAppBar/TopAppBar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignUp from "./publicsite/SignUp/SignUp";
import SignIn from "./publicsite/SignIn/SignIn";
import UserHome from "./authsite/UserHome/UserHome";


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
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<TopAppBar />} />
              <Route path={"/register"} element={<SignUp />} />
              <Route path={"/login"} element={<SignIn />} />
              <Route path={"/home"} element={<UserHome />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </div>
  );
}

export default App;
