import CoverZhexue from '../../assets/books/中国哲学简史.jpeg';
import CoverNanhuodian from '../../assets/books/南货店.jpeg';
import CoverZhexuejia from '../../assets/books/哲学家.jpg';
import CoverZhigeng from '../../assets/books/杀死一只知更鸟.jpeg';
import CoverQiangpao from '../../assets/books/枪炮.jpeg';
import CoverZhisheng from '../../assets/books/置身事内.jpeg';

export interface IBookItem {
  title: string;
  author: string;
  date: string;
  press: string;
  desc: string;
  state: string;
  cover: string;
  douban: string;
}

export interface IBookYear {
  year: string;
  books: IBookItem[];
}

export const Book_2022: IBookItem[] = [
  {
    title: '《枪炮、病菌与钢铁》',
    author: '[美国] 贾雷德·戴蒙德',
    date: '2006-4',
    press: '上海译文出版社',
    state: '',
    desc: '关注社会与文明发展的大议题',
    cover: CoverQiangpao,
    douban: 'https://book.douban.com/subject/1813841/',
  },
  {
    title: '《中国哲学简史》',
    author: '冯友兰',
    date: '2010-8',
    press: '北京大学出版社',
    state: '✓',
    desc: '哲学，就是对于人生有系统的反思的思想',
    cover: CoverZhexue,
    douban: 'https://book.douban.com/subject/5253759/',
  },
  {
    title: '《置身事内：中国政府与经济发展》',
    author: '兰小欢',
    date: '2021-8',
    press: '上海人民出版社',
    state: '✓',
    desc: '要读懂中国经济，必先读懂中国政府',
    cover: CoverZhisheng,
    douban: 'https://book.douban.com/subject/35546622/',
  },
];

export const Book_Early: IBookItem[] = [
  {
    title: '《杀死一只知更鸟》',
    author: '[美国] 哈珀·李',
    date: '2017-2',
    press: '译林出版社',
    state: '✓',
    desc: '你永远也不可能真正了解一个人，除非你钻进他的皮肤里，像他一样走来走去',
    cover: CoverZhigeng,
    douban: 'https://book.douban.com/subject/26879778/',
  },
  {
    title: '《南货店》',
    author: '张忌',
    date: '2020-7',
    press: '中信出版集团',
    state: '✓',
    desc: '致敬平凡的人间烟火',
    cover: CoverNanhuodian,
    douban: 'https://book.douban.com/subject/35114602/',
  },
  {
    title: '《哲学家们都干了些什么》',
    author: '林欣浩',
    date: '2015-4',
    press: '北京联合出版公司',
    state: '✓',
    desc: '史上最严谨又最不严肃的哲学史',
    cover: CoverZhexuejia,
    douban: 'https://book.douban.com/subject/26390842/',
  },
];

export const BookByYear: IBookYear[] = [
  { year: '2022', books: Book_2022 },
  { year: '更早', books: Book_Early },
];

export default BookByYear;
