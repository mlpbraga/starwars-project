export interface APIStartshipItemData {
  name: string;
  MGLT: string;
  consumables: string;
}

export interface APIStartshipData {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<APIStartshipItemData>;
}

export interface ProxyStarshipItemData {
  name: string;
  stops: string;
}

export interface ProxyStarshipData {
  total: number;
  next: string | null;
  previous: string | null;
  starships: Array<ProxyStarshipItemData>;
}
