import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [isChallengePassed, setIsChallengePassed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isChallengePassed) {
      alert('Veuillez compléter le défi Turnstile avant de soumettre le formulaire.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/contact', formData);
      setResponseMessage(response.data.message);
      setFormData({ name: '', email: '', message: '' }); // Clear the form
      setIsChallengePassed(false); // Reset the challenge state
    } catch (error) {
      console.error('Error submitting the form:', error);
      setResponseMessage('Une erreur s\'est produite. Veuillez réessayer.');
    }
  };

  // Dynamically load the Turnstile script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/proxy/turnstile'; // Load the script from your proxy
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script); // Clean up the script when the component unmounts
    };
  }, []);

  return (
    <div className="contact-us">
      <br />
      <br />
      <br />
      <br />
      <h1>Contactez-nous</h1>
      <p>
        Si vous avez des questions, des suggestions, des demandes spéciales ou tout autre type de commentaire, vous pouvez communiquez avec nous à l'aide des informations suivantes :<br />
        ✓ Formulaire de commentaires :{' '}
        <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=ie86K3Ta9UabAwA9BpkJ5-pGwQBtt3RAmNmTT5UeaGpURDdPTlIyWVZLNFU4UDg5U0JPRVA2Tlo2VS4u">
          Cliquez ici pour accéder au formulaire Ou ci-dessous
        </a>
        <br />
        <br />
        📧 Adresse courriel : JOURNAL048@csspo.gouv.qc.ca<br />
        <br />
        🖧 Teams : JOURNAL048<br />
        OU<br />
        🖧 Teams : JOURNAL ÉTUDIANT 048<br />
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
        <div
          className="cf-turnstile"
          data-sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
          data-callback="handleTurnstileCallback"
        ></div>
        <button type="submit" disabled={!isChallengePassed}>
          Envoyer
        </button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default ContactUs;