export async function loadAllArticles() {
  const modules = import.meta.glob('/public/ArticleData/*.json', { eager: true });
  const articles = Object.values(modules).map((mod: any) => {
    const content = mod.Content || {};
    const metadata = mod.Metadata || {};
    const system = mod.system || {};
    
    // Get the ID from the article path and ensure it uses /articles/
    const rawId = system.article?.replace(/^\/(article|articles)\//, '') || '';
    const id = rawId;
    const articleUrl = `/articles/${id}`;
    
    return {
      id,
      articleUrl,
      title: content.title,
      description: content.description,
      content: content.content,
      imageUrl: content.imageUrl || metadata.imageUrl,
      imageAlt: content.imageAlt || metadata.imageAlt,
      date: metadata.date,
      author: metadata.author,
    };
  });

  // Sort articles by date in descending order (newest first)
  return articles.sort((a, b) => {
    if (!a.date || !b.date) return 0;
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    
    // Log sorting info for debugging
    console.log('Sorting articles:', {
      articleA: {
        title: a.title,
        date: a.date,
        parsed: dateA
      },
      articleB: {
        title: b.title,
        date: b.date,
        parsed: dateB
      }
    });
    
    return dateB.getTime() - dateA.getTime();
  });
}