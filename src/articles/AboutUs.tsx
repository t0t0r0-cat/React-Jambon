import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="about-us">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1>À propos</h1>
      <p>
        skibidi bop yes yes yes est un projet créé par des élèves de l'école secondaire de l'île.
      </p>
      <h2>Notre histoire</h2>
      <p>
        L’Éco de l’Ile est le journal étudiant de l’école secondaire de l’Île située à Gatineau. Ce projet a été créé en 2021 par Charlie Huguet-Latour, une élève de cinquième secondaire du programme d’éducation intermédiaire (PEI), dans le cadre de son projet personnel de fin de parcours.
        L’objectif principal de ce journal est d’offrir une voix aux jeunes de l’école, promouvoir la diversité des élèves et des opinions, encourager les bons coups des étudiants et de leurs initiatives, pousser les élèves à partager leurs créations et leurs succès, ainsi qu’applaudir l’implication scolaire de tous et chacun.
        Toute l’équipe de rédaction espère que le journal répondra à ces objectifs au fil des années et des générations d’étudiants de l’école secondaire de l’Île.
      </p>
      <h2>Notre nom</h2>
      <p>
        L’Éco de l’Île, d’où provient ce nom ? Eh bien, à l’aide de l’équipe de journalistes, nous nous sommes entendus sur ce nom pour les raisons suivantes :
        Tout d’abord, de nombreux journaux et mensuels ont comme titre « Écho […] », un mot faisant référence à une rubrique journalistique consacrée aux anecdotes du jour (aux articles de « commérage » plus ou moins scandaleux). Ce mot est donc très représentatif d’un journal, permettant donc aux navigateurs de comprendre l’objectif du <u>nouveau</u> site web. Ce nouveau site web est <i>open source</i> <a href="https://github.com/t0t0r0-cat/React-Jambon">disponible ici</a>.
      </p>
      <figure>
        <img src="./public/La-vague-verte.jpg" alt="La vague verte - Canada C3, 2018" />
        <figcaption>La vague verte - Canada C3, 2018</figcaption>
      </figure>
      <p>
        Néanmoins, nous avons choisi de modifier le mot, afin d’y représenter un court jeu de mot. L’orthographe « <u>Éco</u> » à la place de « Écho » a été sélectionné afin de faire note du côté vert et écologique de notre et école, en plus de celui du journal. En effet, le journal sera en mesure de soutenir les mouvements verts de l’école comme la vague verte et bleue et ce en optant pour un journal numérique, favorisant l’environnement au médium papier.
        Finalement, nous voulions absolument représenter l’école et c’est pourquoi, c’est sans surprise que le qualitatif ajouté à la suite de « L’Éco » est « de l’Île », pour l’école secondaire de l’Île.
      </p>
    </div>
  );
};

export default AboutUs;