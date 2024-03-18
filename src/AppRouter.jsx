// AppRouter.jsx
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import guestRouter from './guestRouter';
import userRouter from './userRouter';
import adminRouter from './adminRouter';

export default function AppRouter() {
  const { user } = useAuth();
  const determineRouter = () => {
    if (!user?.id) {
      return guestRouter;
    } else if (user.role === 'Admin') {
      return adminRouter;
    } else {
      return userRouter;
    }
  };

  const finalRouter = determineRouter();

  return (
    <RouterProvider router={finalRouter} />
  );
}
