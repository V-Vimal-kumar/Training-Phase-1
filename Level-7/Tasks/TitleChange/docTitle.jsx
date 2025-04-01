import React, { useState } from 'react';
import useDocumentTitle from './useDoc';

const ExampleComponent = () => {
  const [title, setTitle] = useState('Initial Title');

  useDocumentTitle(title);

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={() => setTitle('Updated Title')}>Change Title</button>
    </div>
  );
};

export default ExampleComponent;
