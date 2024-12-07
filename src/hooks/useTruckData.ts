import { useState, useEffect } from 'react';
import { truckDataService } from '../services/truckDataService';
import { TruckData } from '../types/truck';

export const useTruckData = () => {
  const [truckData, setTruckData] = useState<TruckData | null>(null);

  useEffect(() => {
    const handleUpdate = (data: TruckData) => {
      setTruckData(data);
    };

    truckDataService.subscribe(handleUpdate);
    truckDataService.startUpdates();

    return () => {
      truckDataService.unsubscribe(handleUpdate);
      truckDataService.stopUpdates();
    };
  }, []);

  return truckData;
};
