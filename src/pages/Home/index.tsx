import React, { useEffect, useState, useRef, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiSearch } from 'react-icons/fi';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Starships from '../../services/starships';

interface SpaceshipData {
  uid: string;
  name: string;
  stops: number;
}

const Home: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [distance, setDistance] = useState('');
  const [spaceships, setSpaceships] = useState<Array<any>>();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const handleSubmit = useCallback(async (data: any) => {
    setIsLoading(true);
    try {
      const response = await Starships.list(data.distance);
      setSpaceships(response.starships);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);
  return (
    <div>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="distance" icon={FiSearch} placeholder="10000" />
        <Button type="submit">Calcular</Button>
      </Form>
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
