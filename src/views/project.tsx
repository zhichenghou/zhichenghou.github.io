import React, { Fragment } from 'react';
import ProjectLogo from '../assets/projects.jpg';
import Footer from '../components/Footer';
import Nav from '../components/Nav';

const Project: React.FC = () => {
  return (
    <Fragment>
      <header>
        <h1>小虫 ｜ Project</h1>
        <p>人和动物的区别是会制造和使用工具</p>
        <img alt='Logo' src={ProjectLogo} height='150' />
        <Nav />
      </header>
      <main>
        <hr />
        <section>
          <header>
            <h2>Side Projects</h2>
          </header>
          <div></div>
        </section>
      </main>
      <Footer />
    </Fragment>
  );
};

export default Project;
