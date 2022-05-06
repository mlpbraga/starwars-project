import api from './api';

import { APIStartshipData, ProxyStarshipData } from './types';

const Starships = {
  list: async (distance: number, page = '1'): Promise<ProxyStarshipData> => {
    try {
      const response = await api.get(`/starships?page=${page}&limit=15`);
      const starshipsList = response.data as APIStartshipData;
      return {
        total: starshipsList.count,
        next: starshipsList.next,
        previous: starshipsList.previous,
        starships: starshipsList.results.map(starship => ({
          name: starship.name,
          stops: Math.ceil(distance / Number(starship.MGLT)),
        })),
      };
    } catch (error) {
      throw new Error(`[API Error] ${error.message}`);
    }
  },
};

export default Starships;
