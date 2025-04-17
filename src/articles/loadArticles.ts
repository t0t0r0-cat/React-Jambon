export async function loadAllArticles() {
  // Import all JSON files in ArticleData folder
  const modules = import.meta.glob('./ArticleData/*.json', { eager: true });
  // Each module is an object with a default export (the JSON)
  const articles = Object.values(modules).map((mod: any) => {
    // Flatten and normalize the structure as needed
    // Example for your Skibidi.json structure:
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