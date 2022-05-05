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
      name: string;
      MGLT: string;
    };
  };
}

const Starships = {
  list: async (distance: any) => {
    const response = await api.get('/starships');

    const nextPage = response.data.next;
    const previousPage = response.data.previous;
    const starshipsList = response.data.results;
    const idsList = starshipsList.map((item: StarshipListData) => item.uid);
    const starshipsData = await Promise.all(
      idsList.map((id: number) => Starships.get(id)),
    );
    if (!_.isEmpty(starshipsData)) {
      const formattedStarship = starshipsData.map((item: any) => {
        return {
          uid: item.result.properties.uid,
          name: item.result.properties.name,
          stops: Math.ceil(distance / Number(item.result.properties.MGLT)),
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
  get: async (id: number): Promise<StarshipDetailsData> => {
    const response = await api.get(`/starships/${id}`);

    return response.data;
  },
};

export default Starships;
