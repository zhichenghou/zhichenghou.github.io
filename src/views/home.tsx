import React, { Fragment } from 'react';
import CoverZhexue from '../assets/books/中国哲学简史.jpeg';
import CoverNanhuodian from '../assets/books/南货店.jpeg';
import CoverZhexuejia from '../assets/books/哲学家.jpg';
import CoverZhigeng from '../assets/books/杀死一只知更鸟.jpeg';
import CoverQiangpao from '../assets/books/枪炮.jpeg';
import CoverZhishengshinei from '../assets/books/置身事内.jpeg';
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
        {/* guitar */}
        <hr />
        <section>
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

        {/* books */}
        <hr />
        <section>
          <header>
            <h2>"书籍是人类进步的阶梯"</h2>
          </header>
          <aside>
            <section>
              <img alt='哲学家们' src={CoverZhexuejia} height='150' />
            </section>
            <h3>《哲学家们都干了些什么》</h3>
            <p>对那些原以为是确定的东西产生怀疑，实用才是准则</p>
          </aside>
          <aside>
            <section>
              <img alt='置身事内' src={CoverZhishengshinei} height='150' />
            </section>
            <h3>《置身事内：中国政府与经济发展》</h3>
            <p>要读懂中国经济，必先读懂中国政府</p>
          </aside>
          <aside>
            <section>
              <img alt='南货店' src={CoverNanhuodian} height='150' />
            </section>
            <h3>《南货店》</h3>
            <p>致敬平凡的人间烟火</p>
          </aside>
          <aside>
            <section>
              <img alt='哲学简史' src={CoverZhexue} height='150' />
            </section>
            <h3>《中国哲学简史》</h3>
            <p>哲学，就是对于人生有系统的反思的思想</p>
          </aside>
          <aside>
            <section>
              <img alt='杀死一只知更鸟' src={CoverZhigeng} height='150' />
            </section>
            <h3>《杀死一只知更鸟》</h3>
            <p>你永远也不可能真正了解一个人，除非你站在他的角度考虑问题……除非你钻进他的皮肤里，像他一样走来走去</p>
          </aside>
          <aside>
            <section>
              <img alt='枪炮、病菌与钢铁' src={CoverQiangpao} height='150' />
            </section>
            <h3>《枪炮、病菌与钢铁》</h3>
            <p>关注社会与文明发展的大议题</p>
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
