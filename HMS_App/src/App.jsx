// import React from 'react'
import { Route, Routes } from "react-router-dom";
import PublicLayout from "./Layout/PublicLayout";
import { PublicRoutes } from "./routes/PublicRoutes";
import { AuthRoutes } from "./routes/AuthRoutes";
import Authentication from "./config/Authentication";

const App = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        {PublicRoutes.map((pr, i) => {
          return <Route key={i} path={pr.path} element={<pr.element />} />;
        })}
      </Route>
      <Route element={<Authentication />}>
        {AuthRoutes.map((ar, i) => {
          return <Route key={i} path={ar.path} element={<ar.element />} />;
        })}
      </Route>
    </Routes>
  );
};

export default App;
