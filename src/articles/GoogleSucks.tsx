// GoogleSucks.tsx
import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const GoogleSucks: React.FC = () => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>(); // Extract the 'id' parameter from the URL

  useEffect(() => {
    // Log whenever the URL or 'id' changes
    console.log('GoogleSucks component reloaded due to URL change:', location.pathname);
    console.log('Page ID:', id);
  }, [location, id]);

  // Define messages based on the 'id'
  const getMessage = () => {
    if (!id) {
      return 'This is the default Google Sucks page.';
    }

    switch (id) {
      case '1':
        return 'Google Sucks because it tracks your data.';
      case '2':
        return 'Google Sucks because it shows too many ads.';
      case '3':
        return 'Google Sucks because it dominates the market.';
      default:
        return `This is the Google Sucks page for ID: ${id}.`;
    }
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1>Google Sucks</h1>
      <p>{getMessage()}</p>
    </div>
  );
};

export default GoogleSucks;

<Route path="/google-sucks/:id?" element={<GoogleSucks />} />
