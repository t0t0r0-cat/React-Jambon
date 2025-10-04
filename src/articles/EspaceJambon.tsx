import React from 'react';
import '../styles/App.css'; // Import CSS for styling
import '../styles/EspaceJambon.css';
import BottomBar from '../components/BottomBar';

const EspaceJambon: React.FC = () => {
  return (
    <div className="espace-jambon">
      <h1>Espace Jambon</h1>
      <p>
        Ici nous publions tout ce qui concerne Jambon et Bean. Ces deux animaux adorables sont les mascottes de notre site et nous adorons partager des informations sur eux.
      </p>
      <div className="jambon-image-grid">
        <div className='jambon-image'>
          <img src="/Jambon/Jambon du nouvel an.jpg" alt="Jambon et Bean au jour de l'an - Janvier 2023" />
          <h2>Jambon et Bean au jour de l'an - Janvier 2023</h2>
        </div>
        <div className='jambon-image'>
          <img src="/Jambon/BD Jambon Soirée du réveillon.jpg" alt="Jambon et Bean au réveillon - Décembre 2023" />
          <h2>Jambon et Bean au réveillon - Décembre 2023</h2>
        </div>
        <div className='jambon-image'>
          <img src="/Jambon/Jambon en entrevue - oct 2023.jpg" alt="Jambon en entrevue - Octobre 2023" />
          <h2>Jambon en entrevue - Octobre 2023</h2>
        </div>
        <div className='jambon-image'>
          <img src="/Jambon/Jambon a l'halwoweenjpg.jpg" alt="Jambon et Bean à l'Halloween - Octobre 2023" />
          <h2>Jambon et Bean à l'Halloween - Octobre 2023</h2>
        </div>
      </div>
      <nav>
        <BottomBar />
      </nav>
    </div>
  );
};

export default EspaceJambon;