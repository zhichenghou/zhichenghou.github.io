import React, { Fragment } from 'react';
import BookLogo from '../assets/book.jpeg';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import BookByYear from './data/books';

const Book: React.FC = () => {
  return (
    <Fragment>
      <header>
        <h1>小虫 ｜ Book</h1>
        <p>"书籍是人类进步的阶梯"</p>
        <img alt='Logo' src={BookLogo} height='150' />
        <Nav />
      </header>
      <main>
        {BookByYear.map((yearBook) => (
          <Fragment>
            <hr />
            <section>
              <header>
                <h2>{yearBook.year}</h2>
              </header>
              <table>
                <thead>
                  <th></th>
                  <th>书名</th>
                  <th>信息</th>
                  <th>简介</th>
                  <th>进展</th>
                </thead>
                <tbody>
                  {yearBook.books.map((book) => (
                    <tr>
                      <td>
                        <img alt={book.title} src={book.cover} height='150' />
                      </td>
                      <td>
                        <a href={book.douban} target='_blank' rel='noreferrer'>
                          {book.title}
                        </a>
                      </td>
                      <td>
                        <small>
                          <p>{book.author}</p>
                          <p>{book.date}</p>
                          <p>{book.press}</p>
                        </small>
                      </td>
                      <td>
                        <small>
                          <p>{book.desc}</p>
                        </small>
                      </td>
                      <td>{book.state}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </Fragment>
        ))}
      </main>
      <Footer />
    </Fragment>
  );
};

export default Book;
