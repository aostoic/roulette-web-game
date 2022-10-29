import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import LossPage from "../pages/LossPage";
import WinPage from "../pages/WinPage";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/win" element={<WinPage />} />
        <Route path="/loss" element={<LossPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
