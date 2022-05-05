import React, { useState, useRef, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiSearch } from 'react-icons/fi';
import * as Yup from 'yup';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Starships from '../../services/starships';
import { Loading } from '../../styles/global';
import { Container } from './styles';

interface Errors {
  [key: string]: string;
}
const getValidationErrors = (errors: Yup.ValidationError): Errors => {
  const validationErrors: Errors = {};
  errors.inner.forEach(error => {
    validationErrors[error.path] = error.message;
  });
  return validationErrors;
};

const Home: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [spaceships, setSpaceships] = useState<Array<any>>();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = useCallback(async (data: any) => {
    setIsLoading(true);
    setHasError(false);
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        distance: Yup.string().required(
          'Must be filled with some MGLT distance.',
        ),
      });
      await schema.validate(data, { abortEarly: false });
      const response = await Starships.list(data.distance);
      setSpaceships(response.starships);
    } catch (error) {
      setHasError(true);
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);
      } else {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="distance" icon={FiSearch} placeholder="10000" />
        <Button type="submit">Calcular</Button>
      </Form>
      {hasError && <>Erro</>}
      {isLoading && <Loading />}
      <ul>
        {!hasError &&
          !isLoading &&
          spaceships &&
          spaceships.map(item => (
            <li key="{item.uid}">
              {item.name}: {item.stops}
            </li>
          ))}
      </ul>
    </Container>
  );
};

export default Home;
