import React, { useState, useRef, useCallback, useEffect } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiSearch } from 'react-icons/fi';
import * as Yup from 'yup';
import _ from 'lodash';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Starships from '../../services/starships';
import { Loading } from '../../styles/global';
import { Container, PaginationContainer, CurrentPage } from './styles';

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

const getPage = (item: string): string => {
  if (!_.isEmpty(item)) {
    const urlObject = new URL(item);
    const page = urlObject.searchParams.get('page');
    return page || '';
  }
  return '1';
};

const Home: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [spaceships, setSpaceships] = useState<Array<any>>();
  const [page, setPage] = useState(1);
  const [distance, setDistance] = useState('');
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const loadSpaceshipInfo = useCallback(async (pageNumber: string) => {
    setIsLoading(true);
    setHasError(false);
    setHasNext(false);
    setHasPrevious(false);
    setSpaceships([]);
    try {
      const response = await Starships.list(pageNumber);
      setSpaceships(response.starships);
      setHasNext(!!response.next);
      setHasPrevious(!!response.previous);
    } catch (error) {
      setHasError(true);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSubmit = useCallback(async (data: any) => {
    try {
      console.log('handleSubmit');
    } catch (error) {
      setHasError(true);
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);
      } else {
        console.log(error);
      }
    }
  }, []);

  const handleNext = useCallback(() => {
    setPage(page + 1);
  }, [page]);
  const handlePrevious = useCallback(() => {
    setPage(page - 1);
  }, [page]);

  useEffect(() => {
    const loadInfo = async (): Promise<void> => {
      await loadSpaceshipInfo(String(page));
    };
    loadInfo();
  }, [page, loadSpaceshipInfo]);

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="distance" icon={FiSearch} placeholder="10000" />
        <Button type="submit">Calcular</Button>
      </Form>
      {hasError && <>Erro</>}
      {isLoading && <Loading />}
      {!hasError && !isLoading && spaceships && (
        <div>
          <ul>
            {spaceships.map(item => (
              <li key={item.uid}>{item.name}</li>
            ))}
          </ul>
          <PaginationContainer>
            <Button disabled={!hasPrevious} onClick={() => handlePrevious()}>
              {`<< `} PREVIOUS
            </Button>
            <CurrentPage>CURRENT PAGE: {page}</CurrentPage>
            <Button disabled={!hasNext} onClick={() => handleNext()}>
              NEXT{` >>`}
            </Button>
          </PaginationContainer>
        </div>
      )}
    </Container>
  );
};

export default Home;
