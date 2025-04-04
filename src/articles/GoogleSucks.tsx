import React from 'react';
import { useParams } from 'react-router-dom';

const NewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>New Page: {id}</h1>
      <p>This is a new page with the ID: {id}</p>
    </div>
  );
};

export default NewPage;
