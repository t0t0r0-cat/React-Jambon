import React from 'react';

const EspaceJambon: React.FC = () => {
  return (
    <div className="espace-jambon">
      <h1>Espace Jambon</h1>
      <p>
        Bienvenue dans l'Espace Jambon ! Ici, vous trouverez tout ce qui concerne le jambon : des
        recettes, des faits amusants, et bien plus encore. Explorez et profitez de cet espace
        dédié aux amateurs de jambon !
      </p>
      <section>
        <h2>Ce que vous trouverez ici :</h2>
        <ul>
          <li>Recettes de jambon</li>
          <li>Faits amusants sur le jambon</li>
          <li>Histoire du jambon</li>
          <li>Et bien plus encore...</li>
        </ul>
      </section>
    </div>
  );
};

export default EspaceJambon;