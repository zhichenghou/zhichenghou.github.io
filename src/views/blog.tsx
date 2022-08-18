import React, { Fragment } from 'react';
import BlogLogo from '../assets/blog.jpg';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import PostByYear from './data/posts';

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
        {PostByYear.map((yearPost) => (
          <Fragment>
            <hr />
            <section>
              <header>
                <h2>{yearPost.year}</h2>

                <table>
                  <tbody>
                    {yearPost.posts.map((post) => (
                      <tr>
                        <td>
                          <a href={post.key}>{post.title}</a>
                        </td>
                        <td>
                          <small>{post.date} </small>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </header>
            </section>
          </Fragment>
        ))}
      </main>
      <Footer />
    </Fragment>
  );
};

export default Blog;
