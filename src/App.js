import "./App.css";
import { Header } from "./Components/Navigator/Header";
import { Footer } from "./Components/Navigator/Footer";
import { SideBar } from "./Components/SideBar/SideBar";
import Home from "../src/Home";
import { useState } from "react";
import About from "./Components/Pages/About";
import Login from "./Components/Pages/Login";
import Events from "./Components/Pages/Events";

function App() {
  const [activetab, setActivetab] = useState("Home");

  const NavPress = (value) => {
    console.log("pressed a button!")
    setActivetab(value)
    console.log(activetab)
  }

  return (
    <>
      <Header />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "150px 1fr", 
          gap: "5px",
        }}
      >
        <div
          style={{
            backgroundColor: "lightgray",
          }}
        >
          <SideBar activetab={activetab} setActivetab={NavPress} />
        </div>
        <div
          style={{
            backgroundColor: "white",
          }}
        >
          {activetab === "Home" && <Home /> }
          {activetab === "About" && <About />}
          {activetab === "Login" && <Login />}
          {activetab === "Events" && <Events />}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
