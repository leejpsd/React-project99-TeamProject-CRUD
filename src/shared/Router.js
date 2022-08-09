import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import theme from "../styledcomponents/theme";
import Update from "../pages/Update";
import EditPage from "../pages/EditPage";
import Home from "../pages/Home";
import Deatail from "../pages/Deatail";
import { ThemeProvider } from "styled-components";

const Router = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Update" element={<Update />} />
          <Route path="/deatail/:id" element={<Deatail />} />
          <Route path="EditPage" element={<EditPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Router;
