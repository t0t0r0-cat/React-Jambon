const articles = [
  {
    id: '1',
    title: 'Article 1',
    description: 'Ceci est le contenu de l\'Article 1.',
    content: `
      # Welcome to Article 1
      This is a **Markdown** example. You can use *italic*, **bold**, or even [links](https://example.com).
      ![Placeholder Image](https://via.placeholder.com/400x200?text=Article+1)
    `,
    imageUrl: 'https://via.placeholder.com/400x200?text=Article+1',
    imageAlt: 'Placeholder image for Article 1',
    articleUrl: '/article/1',
    date: '2025-04-08',
    author: 'John Doe',
  },
  {
    id: '2',
    title: 'Article 2',
    description: 'Ceci est le contenu de l\'Article 2.',
    content: `
      ## Article 2 Highlights
      - Point 1
      - Point 2
      - Point 3
      ![Placeholder Image](https://via.placeholder.com/400x200?text=Article+2)
    `,
    imageUrl: 'https://via.placeholder.com/400x200?text=Article+2',
    imageAlt: 'Placeholder image for Article 2',
    articleUrl: '/article/2',
    date: '2025-04-07',
    author: 'Jane Smith',
  },
  {
    id: '3',
    title: 'skibidi3',
    description: 'Ceci est le contenu du skibidi de l\'Article 3.',
    content: `
      ### Skibidi Article
      This article contains a unique image and some styled text:
      - **Bold text**
      - *Italic text*
      - [Link to more info](https://example.com)
      ![Skibidi Image](https://addons-media.operacdn.com/media/CACHE/images/themes/50/286850/1.0-rev1/images/83fd60840076eb190c4e3fbdeb30b184/5491362f165917e1eb870d2b4429ae0b.jpg)
    `,
    imageUrl: 'https://addons-media.operacdn.com/media/CACHE/images/themes/50/286850/1.0-rev1/images/83fd60840076eb190c4e3fbdeb30b184/5491362f165917e1eb870d2b4429ae0b.jpg',
    imageAlt: 'Skibidi-themed image for Article 3',
    articleUrl: '/article/3',
    date: '2025-04-06',
    author: 'Charlie Huguet-Latour',
  },
];

export default articles;