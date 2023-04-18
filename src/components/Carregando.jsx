import { useState } from 'react';
import PropagateLoader from 'react-spinners/ClipLoader';

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'white',
};

function Carregando() {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState('#ffffff');

  return (
    <div className="sweet-loading">

      <PropagateLoader
        color={ color }
        loading={ loading }
        cssOverride={ override }
        size={ 100 }
        aria-label="PropagateLoader"
        data-testid="loader"
      />
    </div>
  );
}

export default Carregando;
