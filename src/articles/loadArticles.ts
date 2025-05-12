export async function loadAllArticles() {
  const modules = import.meta.glob('./ArticleData/*.json', { eager: true });
  const articles = Object.values(modules).map((mod: any) => {
    const content = mod.Content || {};
    const meta = mod.Metadata || {};
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
      imageUrl: content.imageUrl || meta.imageUrl,
      imageAlt: content.imageAlt || meta.imageAlt,
      date: meta.date,
      author: meta.author,
    };
  });
  return articles;
}