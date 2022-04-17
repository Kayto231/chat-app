import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./Routes.js";

function AppRouter() {
  const { isUserLoggedIn } = useSelector((state) => state.user);
  return (
    <>
      {isUserLoggedIn ? (
        <>
          <Routes>
            {privateRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.element />}
              />
            ))}
            <Route path={"*"} element={<Navigate to={"/"} />} />
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            {publicRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.element />}
              />
            ))}
            <Route path='*' element={<Navigate to={"auth/login"} />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default AppRouter;
