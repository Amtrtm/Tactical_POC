export interface TruckMetrics {
  engineHealth: number;
  fuelLevel: number;
  engineTemp: number;
  batteryLevel: number;
  tirePressure: number;
  nextService: number;
  performance: Array<{
    name: string;
    value: number;
  }>;
  systemHealth: Array<{
    subject: string;
    value: number;
    fullMark: number;
  }>;
  maintenance: Array<{
    name: string;
    value: number;
  }>;
}

export interface StatusUpdate {
  id: number;
  message: string;
  type: 'info' | 'warning' | 'error';
  timestamp: string;
}

export interface TruckData extends TruckMetrics {
  statusUpdates: StatusUpdate[];
}
