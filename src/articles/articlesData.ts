interface Article {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  articleUrl: string;
  author: string; // Added author property
  date: string;   // Added date property
}

const articles: Article[] = [
  {
    id: '1',
    title: 'Article 1',
    description: 'This is the first article.',
    imageUrl: '/path/to/image1.jpg',
    articleUrl: '/article/1',
    author: 'Author 1', // Added author value
    date: '2023-04-01', // Added date value
  },
  {
    id: '2',
    title: 'Article 2',
    description: 'This is the second article.',
    imageUrl: '/path/to/image2.jpg',
    articleUrl: '/article/2',
    author: 'Author 2', // Added author value
    date: '2023-04-02', // Added date value
  },
];

export default articles;