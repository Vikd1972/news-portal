import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '../../pages/Login/Login';
import Signup from '../../pages/SignUp/Signup';
import NewsList from '../../pages/NewsList/NewsList';
import WriteNews from '../../pages/WriteNews/WriteNews';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Layout from './Layout';
import config from '../../utils/constant';

type RouteType = {
  path: string;
  element: React.FC;
  requiredIsAuth?: boolean;
  redirectTo?: string;
};

const routes: RouteType[] = [
  {
    path: config.localPath.news,
    requiredIsAuth: false,
    element: NewsList,
  },
  {
    path: config.localPath.writeNews,
    requiredIsAuth: true,
    element: WriteNews,
  },
  {
    path: config.localPath.signIn,
    requiredIsAuth: false,
    element: Login,
  },
  {
    path: config.localPath.signUn,
    requiredIsAuth: false,
    element: Signup,
  },
];

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={!route.requiredIsAuth
              ? (
                <route.element />
              ) : (
                <PrivateRoute>
                  <route.element />
                </PrivateRoute>
              )}
          />
        ))}
      </Route>
    </Routes>
  );
};

export default Navigation;
