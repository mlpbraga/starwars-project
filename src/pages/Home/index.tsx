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
  CurrentPage,
  ListItem,
  InputContainer,
  ErrorContainer,
} from './styles';

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
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [distance, setDistance] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    '[Error] Something went wrong',
  );
  const loadSpaceshipList = useCallback(
    async (dist: number) => {
      setIsLoading(true);
      setHasError(false);
      setHasNext(false);
      setHasPrevious(false);
      setSpaceships([]);
      try {
        const response = await Starships.list(dist, String(page));
        setSpaceships(response.starships);
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
    async (data: any) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          distance: Yup.string().required('Input some MGLT distance'),
        });
        await schema.validate(data, { abortEarly: false });
        setDistance(data.distance);
        await loadSpaceshipList(data.distance);
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
    [loadSpaceshipList],
  );

  const handleNext = useCallback(async () => {
    setPage(page + 1);
  }, [page]);
  const handlePrevious = useCallback(async () => {
    setPage(page - 1);
  }, [page]);

  useEffect(() => {
    if (distance) {
      loadSpaceshipList(distance);
    }
  }, [page, distance, loadSpaceshipList]);

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Intergalactic Stops Calculator</h1>
        <p>
          The results shows a list of availiable Spaceships and the amount of
          stops they need to archieve this distance.
        </p>
        <InputContainer>
          <Input
            name="distance"
            icon={FiSearch}
            placeholder="Distance to travel in MGLT"
          />
          <Button type="submit">Calculate</Button>
        </InputContainer>
      </Form>
      {hasError && (
        <ErrorContainer>
          <p>{errorMessage}</p>
        </ErrorContainer>
      )}
      {isLoading && <Loading />}
      {!hasError && !isLoading && spaceships && (
        <div>
          <h1>Results</h1>
          <small>
            List of spaceships and the respective amount of stops needed to
            reach the distance of {distance} MGLT
          </small>
          <ul>
            {spaceships.map(item => (
              <ListItem key={item.uid}>
                <li>
                  <p>
                    <b>{item.name}</b> needs <b>{item.stops}</b>{' '}
                    {item.stops > 1 ? 'stops.' : 'stop.'}
                  </p>
                </li>
              </ListItem>
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
