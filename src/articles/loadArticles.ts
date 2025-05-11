export async function loadAllArticles() {
  const modules = import.meta.glob('./ArticleData/*.json', { eager: true });
  const articles = Object.values(modules).map((mod: any) => {
    const content = mod.Content || {};
    const meta = mod.Metadata || {};
    const system = mod.system || {};
    return {
      id: system.article.replace('/article/', ''),
      articleUrl: system.article,
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