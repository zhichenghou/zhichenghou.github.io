import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import BlogLogo from '../assets/blog.jpg';
import Footer from '../components/Footer';
import Nav from '../components/Nav';

const Blog: React.FC = () => {
  return (
    <Fragment>
      <header>
        <h1>小虫 ｜ Blog</h1>
        <p>好记性不如烂笔头</p>
        <img alt='Logo' src={BlogLogo} height='150' />
        <Nav />
      </header>
      <main>
        <hr />
        <section>
          <header>
            <h2>Blog Posts</h2>
          </header>
          <div>
            <span>2022-08-17 </span>
            <Link to='/blog/how-to-build-this-site'>
              <span>这个网站是如何构建的</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </Fragment>
  );
};

export default Blog;
