import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Blog from './views/blog';
import Home from './views/home';
import HowToBuildThisSite from './views/posts/howToBuildThis';
import Project from './views/project';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='home' element={<Home />} />
        <Route path='blog' element={<Blog />} />
        <Route path='project' element={<Project />} />

        <Route path='blog/how-to-build-this-site' element={<HowToBuildThisSite />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
