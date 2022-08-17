import React, { Fragment } from 'react';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';

const HowToBuildThisSite: React.FC = () => {
  return (
    <Fragment>
      <header>
        <h1>这个网站是如何构建的</h1>
        <p>2022-08-17</p>
        <Nav />
      </header>
      <main>
        <hr />
        <p>主要使用了 React 和 mvp css，花了一个下午的时间做出来的。</p>
      </main>
      <Footer />
    </Fragment>
  );
};

export default HowToBuildThisSite;
