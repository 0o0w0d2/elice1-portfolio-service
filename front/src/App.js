import React, { useState, useEffect, useReducer, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import * as Api from './api';
import { loginReducer } from './reducer';

import Header from './components/Header';
import Footer from './components/Footer';
import LoginForm from './components/user/LoginForm';
import Network from './components/user/Network';
import RegisterForm from './components/user/RegisterForm';
import Portfolio from './components/Portfolio';

import MySwaggerUI from './SwaggerUI';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

const theme = createTheme({
  typography: {
    h4: {
      fontFamily: 'ChosunGu',
      fontWeight: 'bold',
      color: '#495942',
      padding: '5px',
      borderRadius: '15px',
      backgroundColor: 'ivory',
      border: 'rgba(128, 128, 128, 0.438) solid 1px',
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    },
    h5: {
      fontFamily: 'ChosunGu',
      fontWeight: 'bold',
    },
    body1: {
      fontFamily: 'ChosunGu',
    },
    body2: {
      fontFamily: 'ChosunGu',
      fontSize: '1.2rem',
      color: '#495942',
      paddingTop: '50px',
      paddingBottom: '50px',
      margin: '100px',
    },
  },
  palette: {
    primary: {
      main: '#617A55',
    },
    secondary: {
      main: '#617A55',
    },
    contained: {},
  },
});

function App() {
  // useReducer 훅을 통해 userState 상태와 dispatch함수를 생성함.
  const [userState, dispatch] = useReducer(loginReducer, {
    user: null,
  });

  // 아래의 fetchCurrentUser 함수가 실행된 다음에 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면 isFetchCompleted 가 true여야 컴포넌트가 구현됨.
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
      const res = await Api.get('user/current');
      const currentUser = res.data;

      // dispatch 함수를 통해 로그인 성공 상태로 만듦.
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: currentUser,
      });

      console.log('%c sessionStorage에 토큰 있음.', 'color: #d93d1a;');
    } catch {
      console.log('%c SessionStorage에 토큰 없음.', 'color: #d93d1a;');
    }
    // fetchCurrentUser 과정이 끝났으므로, isFetchCompleted 상태를 true로 바꿔줌
    setIsFetchCompleted(true);
  };

  // useEffect함수를 통해 fetchCurrentUser 함수를 실행함.
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!isFetchCompleted) {
    return <h1 className="loading">loading...</h1>;
  }

  return (
    <DispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={userState}>
        <Router>
          <ThemeProvider theme={theme}>
            {userState.user && <Header />}
            {console.log(userState)}
            <div id="wrapper">
              <Routes>
                <Route path="/" exact element={<Portfolio />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/users/:userId" element={<Portfolio />} />
                <Route path="/network" element={<Network />} />
                <Route path="/swagger" element={<MySwaggerUI />} />
                <Route path="*" element={<Portfolio />} />
              </Routes>
            </div>
            {userState.user && <Footer id="footer" />}
          </ThemeProvider>
        </Router>
      </UserStateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
