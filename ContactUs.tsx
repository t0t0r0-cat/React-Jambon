import React, { useState } from 'react';
import axios from 'axios';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/contact', formData);
      setResponseMessage(response.data.message);
      setFormData({ name: '', email: '', message: '' }); // Clear the form
    } catch (error) {
      console.error('Error submitting the form:', error);
      setResponseMessage('Une erreur s\'est produite. Veuillez réessayer.');
    }
  };

  return (
    <div className="contact-us">
      <h1>Contactez-nous</h1>
      <p>
Si vous avez des questions, des suggestions, des demandes spéciales ou tout autre type de commentaire, vous pouvez communiquez avec nous à l'aide des informations suivantes :<br></br>
 ✓   Formulaire de commentaires : <a href='https://forms.office.com/Pages/ResponsePage.aspx?id=ie86K3Ta9UabAwA9BpkJ5-pGwQBtt3RAmNmTT5UeaGpURDdPTlIyWVZLNFU4UDg5U0JPRVA2Tlo2VS4u'>Clique ici pour accéder au formulaire Ou ci-dessous</a><br></br><br></br>
📧 Adresse courriel : JOURNAL048@csspo.gouv.qc.ca<br></br><br></br>
🖧  Teams : JOURNAL048<br></br>
                    OU<br></br>
🖧  Teams : JOURNAL ÉTUDIANT 048<br></br>
      </p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nom :</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Votre nom"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Votre email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message :</label>
          <textarea
            id="message"
            name="message"
            placeholder="Votre message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Envoyer</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default ContactUs;