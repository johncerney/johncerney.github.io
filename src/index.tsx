import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import Bio from "./pages/bio";
import Contact from "./pages/contact";
import Home from "./pages/home";
import NavBar from './components/navBar';
import Press from "./pages/press";
import Projects from "./pages/projects";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ParallaxProvider>
    <div id="app">
      <NavBar 
        title="John Cerney Murals"
        textLinks={["bio", "projects", "contact", "press"]}
        iconLinks={{instagram: "https://www.instagram.com/johncerney/", youtube: "https://www.youtube.com/channel/UC-1tgk8rtenvG9wnOq2isIw/videos"}}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bio" element={<Bio />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/press" element={<Press />} />
      </Routes>
    </div>
    </ParallaxProvider>
    </BrowserRouter>
  </React.StrictMode>
);