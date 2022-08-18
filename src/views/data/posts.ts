export interface IPostItem {
  key: string;
  title: string;
  date: string;
  component: string;
}

export interface IPostYear {
  year: string;
  posts: IPostItem[];
}

export const Post_2022: IPostItem[] = [
  {
    key: '#/blog/how-to-build-this-site',
    title: '这个网站是如何构建的',
    date: '2022-08-17',
    component: 'HowToBuildThisSite',
  },
  {
    key: '#/blog/mental-models',
    title: '心智模型：做出明智决定的最佳方式',
    date: '2022-08-18',
    component: 'MentalModels',
  },
];

export const PostByYear: IPostYear[] = [{ year: '2022', posts: Post_2022 }];

export const AllPost: IPostItem[] = [...Post_2022];

export default PostByYear;
