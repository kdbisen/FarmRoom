import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import SignUp from "./publicsite/SignUp/SignUp";
import UserHome from "./authsite/UserHome/UserHome";
import SignIn from "./publicsite/SignIn/SignIn";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

declare global {
    interface Window {
        recaptchaVerifier: any;
        confirmationResult: any;
    }
}

root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App />} />
               <Route path={"/register"} element={<SignUp />} />
               <Route path={"/login"} element={<SignIn />} />
               <Route path={"/home"} element={<UserHome />} />
                 {/* <Route path="teams" element={<Teams />}>
                      <Route path=":teamId" element={<Team />} />
                      <Route path="new" element={<NewTeamForm />} />
                      <Route index element={<LeagueStandings />} />
                  </Route>*/}

          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
