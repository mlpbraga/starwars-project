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
  list: async (distance: number, page = '1') => {
    const response = await api.get(`/starships?page=${page}&limit=15`);

    const nextPage = response.data.next;
    const previousPage = response.data.previous;
    const starshipsList = response.data.results;
    const idsList = starshipsList.map((item: StarshipListData) => item.uid);
    const starshipsData = await Promise.all(
      idsList.map((id: string) => Starships.get(id)),
    );
    if (!_.isEmpty(starshipsData)) {
      const formattedStarship = starshipsData.map((item: any) => {
        return {
          uid: item.id,
      name: item.name,
          stops: Math.ceil(distance / Number(item.MGLT)),
        };
      });

    return {
      next: nextPage,
      previous: previousPage,
        starships: formattedStarship,
    };
    }
    return {};
  },
  get: async (id: string): Promise<StarshipDetailsData> => {
    const response = await api.get(`/starships/${id}`);

    return { id, ...response.data.result.properties };
  },
};

export default Starships;
