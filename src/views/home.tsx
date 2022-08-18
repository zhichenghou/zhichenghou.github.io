import React, { Fragment } from 'react';
import GT11 from '../assets/guitar/gt11.webp';
import SG61 from '../assets/guitar/sg61.jpg';
import Tele from '../assets/guitar/tele.jpg';
import Logo from '../assets/me.png';
import CoverRitan from '../assets/podcast/ritan.jpeg';
import CoverTuogouxiu from '../assets/podcast/tuogouxiu.jpeg';
import CoverWenhua from '../assets/podcast/wenhuayouxian.jpeg';
import CoverWuliaozhai from '../assets/podcast/wuliaozhai.jpeg';
import CoverXiexing from '../assets/podcast/xiexingliaotianhui.jpeg';
import CoverYuzhou from '../assets/podcast/yuzhou.jpeg';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import BookByYear from './data/books';

const Home: React.FC = () => {
  return (
    <Fragment>
      <header>
        <h1>小虫 ｜ 关于我</h1>
        <p>对世界保持好奇</p>
        <img alt='Logo' src={Logo} height='150' />
        <Nav />
      </header>
      <main>
        {/* Blogs */}
        <hr />
        <section>
          <header>
            <h2>"好记性不如烂笔头"</h2>
          </header>
          <aside>
            <a href='#/blog/how-to-build-this-site'>
              <h3>这个网站是如何构建的</h3>
            </a>
            <p>2022-08-17</p>
          </aside>
          {/* 
          <section>
            <a href='#/book'>
              <i>看看更多 ...</i>
            </a>
          </section> */}
        </section>

        {/* books */}
        <hr />
        <section>
          <header>
            <h2>"书籍是人类进步的阶梯"</h2>
          </header>

          {BookByYear[0].books.slice(0, 3).map((book) => (
            <aside>
              <section>
                <img alt={book.title} src={book.cover} height='150' />
              </section>
              <h3>{book.title}</h3>
              <p>{book.desc}</p>
            </aside>
          ))}
          <section>
            <a href='#/book'>
              <i>看看更多 ...</i>
            </a>
          </section>
        </section>

        {/* guitar */}
        <section>
          <hr />
          <header>
            <h2>"贷款买琴，贵就是好"</h2>
          </header>
          <aside>
            <section>
              <img alt='tele' src={Tele} height='150' />
            </section>
            <h3>Fender 60S Telecaster</h3>
            <p>Traditional, Made In Japan - Lake Placid Blue</p>
          </aside>
          <aside>
            <section>
              <img alt='gt11' src={GT11} height='150' />
            </section>
            <h3>Fender Custom Shop GT11</h3>
            <p>Journeyman Relic Stratocaster - Sonic Blue</p>
          </aside>
          <aside>
            <section>
              <img alt='sg61' src={SG61} height='150' />
            </section>
            <h3>Gibson SG Standard '61</h3>
            <p>Vintage Cherry</p>
          </aside>
        </section>

        {/* podcast */}
        <hr />
        <section>
          <header>
            <h2>我爱听播客</h2>
          </header>
          <aside>
            <section>
              <img alt='jiehun' src={CoverYuzhou} height='150' />
            </section>
            <h3>跟宇宙结婚</h3>
            <p>三位老姐姐妄图传播各种无用/冷门/过时但有趣的知识</p>
          </aside>
          <aside>
            <section>
              <img alt='脱狗秀' src={CoverTuogouxiu} height='150' />
            </section>
            <h3>脱狗秀</h3>
            <p>一档关于乐队和弹吉他的播客节目</p>
          </aside>
          <aside>
            <section>
              <img alt='无聊斋' src={CoverWuliaozhai} height='150' />
            </section>
            <h3>无聊斋</h3>
            <p>两个单口喜剧演员的清谈节目</p>
          </aside>
          <aside>
            <section>
              <img alt='谐星聊天会' src={CoverXiexing} height='150' />
            </section>
            <h3>谐星聊天会</h3>
            <p>单口演员与观众线下录制的音频节目</p>
          </aside>
          <aside>
            <section>
              <img alt='日谈公园' src={CoverRitan} height='150' />
            </section>
            <h3>日谈公园</h3>
            <p>我想说的，你想听的，都在日谈公园</p>
          </aside>
          <aside>
            <section>
              <img alt='文化有限' src={CoverWenhua} height='150' />
            </section>
            <h3>文化有限</h3>
            <p>关于读书的泛文化播客</p>
          </aside>
        </section>
      </main>
      <Footer />
    </Fragment>
  );
};

export default Home;
