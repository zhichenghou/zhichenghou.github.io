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
        <hr />
      </header>
      <main>
        <h2>起因</h2>
        <p>最近由于工作的原因，学习了一些前端的知识，想着通过搭建个人网站来练练手，因此有了这个网站</p>
        <h2>技术选型</h2>
        <p>
          前端框架选择了 React， 使用{' '}
          <a href='Create React App' target='_blank' rel='noreferrer'>
            Create React App
          </a>{' '}
          很方便的构建起了一个项目的基础，然后就可以写代码来构建页面了。
        </p>
        <p>
          对于 CSS 开始打算使用 UI 框架来着，但看了一圈都很复杂，转念一想，既然是练手和学习项目，那就使用纯 css
          来构建吧。在 v2ex 上发现了{' '}
          <a href='https://andybrewer.github.io/mvp/' target='_blank' rel='noreferrer'>
            mvp.css
          </a>{' '}
          ，这是一个最小化的 css 样式苦，文件只有几百行，没有 class name，只用 html 标签来指定样式，是非常简单易用。
        </p>
        <h2>部署</h2>
        <p>部署使用 github pages，之前的博客就用它，对于我这个网站来说，足够简单且够用，因此没有纠结太多</p>
        <h2>备注</h2>
        <ul>
          <li>
            由于 react 组件的原因，对 mvp css 做了一处注释修改，否则网页 header 位置会有问题。
            <code>div header,</code>
          </li>
          <li>
            react-router 在 github pages 上存在刷新 404 的问题，解决办法是使用<code>HashRouter</code> 代替
            <code>BrowserRouter</code>。其他代码不变，唯一就是路径会带 <code>#</code>，但相比其他方案，是最简单可行的。
          </li>
        </ul>
      </main>
      <Footer />
    </Fragment>
  );
};

export default HowToBuildThisSite;
