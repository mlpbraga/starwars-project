import React, { useEffect, useState } from 'react';
import Starships from '../../services/starships';

interface SpaceshipData {
  uid: string;
  name: string;
  stops: number;
}

const Home: React.FC = () => {
  const [distance, setDistance] = useState('');
  const [spaceships, setSpaceships] = useState<Array<any>>();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const loadInfo = async (): Promise<void> => {
      try {
        const response = await Starships.list(500);
        setSpaceships(response.starships);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadInfo();
  }, []);
  return (
    <div>
      {hasError && <>Erro</>}
      {isLoading && <>Loading</>}
      <ul>
        {!hasError &&
          !isLoading &&
          spaceships &&
          spaceships.map(item => (
            <li key={item.uid}>
              {item.name}: {item.stops}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Home;
