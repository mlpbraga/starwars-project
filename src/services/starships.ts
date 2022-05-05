import _ from 'lodash';
import api from './api';

interface StarshipListData {
  uid: string;
  name: string;
  url: string;
}

interface StarshipDetailsData {
  message: string;
  result: {
    properties: {
      uid: string;
      name: string;
      MGLT: string;
    };
  };
}

const Starships = {
  list: async (page = '1') => {
    const response = await api.get(`/starships?page=${page}&limit=15`);

    const nextPage = response.data.next;
    const previousPage = response.data.previous;
    const starshipsList = response.data.results;
    const idsList = starshipsList.map((item: StarshipListData) => ({
      uid: item.uid,
      name: item.name,
    }));

    return {
      next: nextPage,
      previous: previousPage,
      starships: idsList,
    };
  },
  get: async (id: number): Promise<StarshipDetailsData> => {
    const response = await api.get(`/starships/${id}`);

    return response.data;
  },
};

export default Starships;
