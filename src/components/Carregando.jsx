import { useState } from 'react';
import DotLoader from 'react-spinners/DotLoader';

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'white',
};

function Carregando() {
  const [loading ] = useState(true);
  const [color ] = useState('#785191');

  return (
    <div className="sweet-loading">
      
      <DotLoader

        color={ color }
        loading={ loading }
        cssOverride={ override }
        size={ 80 }
        margin={ 2 }
        aria-label="DotLoader"
        data-testid="loader"
      />
    </div>
  );
}

export default Carregando;
