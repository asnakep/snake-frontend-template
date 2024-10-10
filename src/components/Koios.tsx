import { useKoios } from './hooks/useKoios';
import { getLatestBlock } from './queries/globalStats';

const Koios = () => {
  const { data: lastBlock, error } = useKoios(getLatestBlock);

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <p>Block num: {lastBlock !== null ? lastBlock : ""}</p>
      )}
    </div>
  );
};

export default Koios;
