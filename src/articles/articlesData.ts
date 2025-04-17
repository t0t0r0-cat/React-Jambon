const articles = [
  {
    id: '1',
    title: 'La variole',
    description: 'Ceci est le contenu de l\'Article 1.',
    content: `
    Il n’y a aucune maladie aussi notoire et perturbante dans l’histoire humaine que la variole (oui cela inclut la peste noire). Elle se trouve dans les momies égyptiennes de l’antiquité, dans les écritures chinoises du IV siècle et dans les histoires de la colonisation des continents américains. Ses symptômes principaux étaient de grandes rougeurs marquantes, une fièvre accablante et des pustules qui s’apparaissaient quelques jours après la contamination de la victime. Son taux de mortalité se situait entre 15-30% et il rendait plein de personnes aveuglées et balafrées pour la vie.

    Maintenant, puisque nous n’entendons plus de nouvelles sur la variole, il est clair que ce n’est plus un problème. La raison pour cela est assez simple : il n’existe plus hors des laboratoires, à cause des vaccins et du développement de la science moderne. En effet, depuis que les humains ont remarqué l’existence de la variole, la variolisation a été le traitement de prévention le plus répandu. C’était un processus où on insérait une petite quantité des pustules de la variole affaiblie sur la peau d’un patient et on espérait que le patient survivrait. Ce processus était plus ou moins fiable et souvent, il entraînait le développement des symptômes graves de la maladie avec une chance de mortalité. Néanmoins, il contribuait à l’avancement des recherches sur la maladie et inspirait éventuellement le tout premier vaccin. Ce vaccin a été créé en 1796 par Edward Jenner, un docteur anglais, après qu’il ait remarqué que les femmes de la campagne qui attrapaient une maladie similaire génétiquement, la maladie des vaches, étaient immunisées à la variole. Malheureusement, dû à sa nouveauté, la vaccination a été exécutée de manière maladroite au début et des résurgences d’épidémies étaient communes. Après 100 ans de l’invention du vaccin, le monde occidental réduit considérablement le nombre de cas de variole et en 1958, l’OMS (Organisation mondiale de la santé) déclencha le commencement de l’éradication complète du virus globalement. Même si cette lutte se déroula durant la guerre froide (1947-1991), des scientifiques soviétiques et américains coopéraient pour développer et envoyer les ressources nécessaires aux pays défavorisés. En 1980, la variole fut officiellement déclarée éradiquée. Aujourd’hui, il reste des échantillons du virus dans deux laboratoires, une à Atlanta aux États-Unis et une au Koltsovo en Russie. Enfin, l’éradication de la variole démontre que quand l’humanité coopère et innove, la science-fiction du passé ou même du présent peut facilement devenir simplement de la science.  

    `,
    imageUrl: '/articles/La Variole.jpg',
    imageAlt: 'Des virus de la variole',
    articleUrl: '/article/1',
    date: '2024-12-23',
    author: 'Jose-Eduardo Munoz Fernandez de Castro',
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