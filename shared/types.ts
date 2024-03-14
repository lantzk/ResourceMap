export interface ConflictZone {
    id: number;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
  }
  
  export interface GetZonesResponse {
    zones: ConflictZone[];
  }