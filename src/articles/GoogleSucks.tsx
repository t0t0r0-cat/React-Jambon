// GoogleSucks.tsx
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const GoogleSucks: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    console.log('GoogleSucks component mounted or updated');
  }, []);

  return (
    <div>
      <h1>Google Sucks</h1>
      <p>This is the Google Sucks page with ID: {id}</p>
    </div>
  );
};

export default GoogleSucks;
