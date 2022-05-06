import React, { useState, useRef, useCallback, useEffect } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiSearch } from 'react-icons/fi';
import * as Yup from 'yup';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Starships from '../../services/starships';
import { Loading } from '../../styles/global';
import {
  Container,
  PaginationContainer,
  CurrentPageContainer,
  ListItem,
  InputContainer,
  ErrorContainer,
  ResultsContainer,
} from './styles';
import { ProxyStarshipItemData } from '../../services/types';

import { pageText } from './staticText';

interface Errors {
  [key: string]: string;
}
interface InputData {
  distance: number;
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(
    '[Error] Something went wrong',
  );
  const [page, setPage] = useState<number>(1);
  const [starships, setStarships] = useState<Array<ProxyStarshipItemData>>();
  const [hasNext, setHasNext] = useState<boolean>(false);
  const [hasPrevious, setHasPrevious] = useState<boolean>(false);
  const [distance, setDistance] = useState<number>();

  const loadStarshipList = useCallback(
    async (dist: number) => {
      setIsLoading(true);
      setHasError(false);
      setHasNext(false);
      setHasPrevious(false);
      setStarships([]);
      try {
        const response = await Starships.list(dist, String(page));
        setStarships(response.starships);
        setHasNext(!!response.next);
        setHasPrevious(!!response.previous);
      } catch (error) {
        setHasError(true);
        if (error.message === 'Network Error') {
          setErrorMessage(
            '[Network Error] Problems connecting to the Star Wars API server',
          );
        }
      } finally {
        setIsLoading(false);
      }
    },
    [page],
  );

  const handleSubmit = useCallback(
    async (data: InputData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          distance: Yup.number().required('Input some MGLT distance'),
        });
        await schema.validate(data, { abortEarly: false });
        setDistance(data.distance);
        await loadStarshipList(data.distance);
      } catch (error) {
        setHasError(true);
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
        } else if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
        } else {
          console.log(error);
        }
      }
    },
    [loadStarshipList],
  );

  const handlePagination = useCallback(
    (pageToGo: number) => {
      if (pageToGo > page) setPage(page + 1);
      else if (pageToGo < page) setPage(page - 1);
    },
    [page],
  );

  useEffect(() => {
    if (distance) {
      loadStarshipList(distance);
    }
  }, [page, distance, loadStarshipList]);

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>{pageText.title}</h1>
        <p>{pageText.description}</p>
        <InputContainer>
          <Input
            name="distance"
            icon={FiSearch}
            placeholder={pageText.inputPlaceholder}
          />
          <Button type="submit">{pageText.calculateButton}</Button>
        </InputContainer>
      </Form>

      {hasError && (
        <ErrorContainer>
          <p>{errorMessage}</p>
        </ErrorContainer>
      )}

      {isLoading && <Loading />}

      {!hasError && !isLoading && starships && (
        <ResultsContainer>
          <h1>{pageText.resultTitle}</h1>
          <small>
            {pageText.resultsDescription}
            {distance} MGLT
          </small>
          <ul>
            {starships.map(item => (
              <ListItem key={item.name}>
                {item.name} : {item.stops}
              </ListItem>
            ))}
          </ul>
          <PaginationContainer>
            <Button
              disabled={!hasPrevious}
              onClick={() => handlePagination(page - 1)}
            >
              {pageText.previousButton}
            </Button>
            <CurrentPageContainer>
              {pageText.currentPage}: {page}
            </CurrentPageContainer>
            <Button
              disabled={!hasNext}
              onClick={() => handlePagination(page + 1)}
            >
              {pageText.nextButton}
            </Button>
          </PaginationContainer>
        </ResultsContainer>
      )}
    </Container>
  );
};

export default Home;
