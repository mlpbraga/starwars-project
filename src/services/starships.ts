import api from './api';

import { APIStartshipData, ProxyStarshipData } from './types';

const convertToHours = (consumables: string): number => {
  const daysMapper: { [key: string]: number } = {
    years: 360 * 24,
    year: 360 * 24,
    months: 30 * 24,
    month: 30 * 24,
    week: 7 * 24,
    weeks: 7 * 24,
    day: 24,
    days: 24,
  };
  try {
    const [amount, measure] = consumables.split(' ');
    return Number(amount) * daysMapper[measure];
  } catch (error) {
    return 0;
  }
};

const Starships = {
  list: async (distance: number, page = '1'): Promise<ProxyStarshipData> => {
    try {
      const response = await api.get(`/starships?page=${page}&limit=15`);
      const starshipsList = response.data as APIStartshipData;
      return {
        total: starshipsList.count,
        next: starshipsList.next,
        previous: starshipsList.previous,
        starships: starshipsList.results.map(starship => {
          let stops;
          if (starship.MGLT !== 'unknown') {
            console.log(starship.name);
            console.log(starship.consumables);
            console.log('------------------------');
            stops =
              distance /
              convertToHours(starship.consumables) /
              Number(starship.MGLT);
            stops = String(Math.floor(stops));
          } else {
            stops = starship.MGLT;
          }
          return {
            name: starship.name,
            stops,
          };
        }),
      };
    } catch (error) {
      throw new Error(`[API Error] ${error.message}`);
    }
  },
};

export default Starships;
