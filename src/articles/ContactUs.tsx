import React, { useState } from 'react';
import '../styles/ContactUs.css';
import BottomBar from '../components/bottomBar';

  const ContactUs: React.FC = () => {
    return (
      <div>
    <div className="contact-us">
      <h1>Contactez-nous</h1>
      <p>
Si vous avez des questions, des suggestions, des demandes spéciales ou tout autre type de commentaire, vous pouvez communiquez avec nous à l'aide des informations suivantes :<br></br>
 ✓   Formulaire de commentaires : <a href='https://forms.office.com/Pages/ResponsePage.aspx?id=ie86K3Ta9UabAwA9BpkJ5-pGwQBtt3RAmNmTT5UeaGpURDdPTlIyWVZLNFU4UDg5U0JPRVA2Tlo2VS4u'>Clique ici pour accéder au formulaire</a><br></br><br></br>
📧 Adresse courriel : JOURNAL048@csspo.gouv.qc.ca<br></br><br></br>
🖧  Teams : JOURNAL048<br></br>
                    OU<br></br>
🖧  Teams : JOURNAL ÉTUDIANT 048<br></br>
      </p>
      

    </div>
      <nav>
        <BottomBar />
      </nav>
      </div>
  );
};

export default ContactUs;