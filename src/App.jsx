import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

function App({ name }) {
  const gato = "Lukus";
  const edad = 15;

  return (
    <>
      <Header />
      <Content />
      <Footer />
    </>
  );
}

export default App;
