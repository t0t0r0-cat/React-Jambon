// GoogleSucks.tsx
import React, { useEffect } from 'react';
import { useLocation, useParams, Route } from 'react-router-dom';

const GoogleSucks: React.FC = () => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>(); // Extract the 'id' parameter from the URL

  useEffect(() => {
    // This will run whenever the URL or 'id' changes
    console.log('GoogleSucks component reloaded due to URL change:', location.pathname);
    console.log('Page ID:', id);
  }, [location, id]);

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1>Google Sucks</h1>
      <p>
        {id
          ? `This is the Google Sucks page for ID: ${id}.`
          : 'This is the default Google Sucks page.'}
      </p>
    </div>
  );
};

export default GoogleSucks;

<Route path="/google-sucks/:id?" element={<GoogleSucks />} />
