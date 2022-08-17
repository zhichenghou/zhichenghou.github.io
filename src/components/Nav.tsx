import React from 'react';
import { Link } from 'react-router-dom';

const Nav: React.FC = () => {
  return (
    <section>
      <nav>
        <ul>
          <li>
            <Link to='/home'>Home</Link>
          </li>
          <li>
            <Link to='/blog'>Blog</Link>
          </li>
          <li>
            <Link to='/project'>Project</Link>
          </li>
          <li>
            <a href='https://github.com/zhichenghou' target='_blank' rel='noreferrer'>
              GitHub ↗
            </a>
          </li>
          <li>
            <a href='https://space.bilibili.com/6877276' target='_blank' rel='noreferrer'>
              Bilibili ↗
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Nav;
