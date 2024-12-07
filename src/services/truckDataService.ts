import { TruckData, StatusUpdate } from '../types/truck';

class TruckDataService {
  private subscribers: ((data: TruckData) => void)[] = [];
  private currentData: TruckData;
  private updateInterval: NodeJS.Timeout | null = null;
  private statusId = 4; // Starting from 4 since we have 3 initial status updates

  constructor() {
    this.currentData = this.generateInitialData();
  }

  private generateInitialData(): TruckData {
    return {
      engineHealth: 85,
      fuelLevel: 92,
      engineTemp: 24.5,
      batteryLevel: 92,
      tirePressure: 65,
      nextService: 12000,
      performance: [
        { name: '00:00', value: 30 },
        { name: '04:00', value: 45 },
        { name: '08:00', value: 65 },
        { name: '12:00', value: 85 },
        { name: '16:00', value: 70 },
        { name: '20:00', value: 55 },
        { name: '24:00', value: 40 },
      ],
      systemHealth: [
        { subject: 'Engine', value: 85, fullMark: 100 },
        { subject: 'Transmission', value: 90, fullMark: 100 },
        { subject: 'Suspension', value: 75, fullMark: 100 },
        { subject: 'Brakes', value: 95, fullMark: 100 },
        { subject: 'Electrical', value: 88, fullMark: 100 },
      ],
      maintenance: [
        { name: 'Oil', value: 85 },
        { name: 'Brakes', value: 65 },
        { name: 'Filters', value: 90 },
        { name: 'Tires', value: 75 },
      ],
      statusUpdates: [
        { id: 1, message: 'All systems operational', type: 'info', timestamp: '13:10' },
        { id: 2, message: 'Tire pressure slightly low', type: 'warning', timestamp: '13:05' },
        { id: 3, message: 'Oil change due in 500 miles', type: 'info', timestamp: '12:55' },
      ],
    };
  }

  private generateRandomValue(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private updateMetrics() {
    // Simulate small random changes in metrics
    this.currentData.engineHealth += this.generateRandomValue(-2, 2);
    this.currentData.engineHealth = Math.max(0, Math.min(100, this.currentData.engineHealth));

    this.currentData.fuelLevel -= 0.1;
    if (this.currentData.fuelLevel < 10) {
      this.addStatusUpdate({
        message: 'Low fuel warning',
        type: 'warning',
      });
    }

    this.currentData.engineTemp += this.generateRandomValue(-0.5, 0.5);
    if (this.currentData.engineTemp > 90) {
      this.addStatusUpdate({
        message: 'Engine temperature critical',
        type: 'error',
      });
    }

    // Update performance history
    const now = new Date();
    const hour = now.getHours().toString().padStart(2, '0') + ':00';
    this.currentData.performance = [
      ...this.currentData.performance.slice(1),
      { name: hour, value: this.generateRandomValue(30, 90) },
    ];

    // Notify subscribers
    this.notifySubscribers();
  }

  private addStatusUpdate({ message, type }: { message: string; type: StatusUpdate['type'] }) {
    const now = new Date();
    const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;

    this.currentData.statusUpdates = [
      {
        id: this.statusId++,
        message,
        type,
        timestamp,
      },
      ...this.currentData.statusUpdates.slice(0, 9), // Keep only last 10 updates
    ];
  }

  private notifySubscribers() {
    this.subscribers.forEach((callback) => callback({ ...this.currentData }));
  }

  subscribe(callback: (data: TruckData) => void) {
    this.subscribers.push(callback);
    // Immediately send current data to new subscriber
    callback({ ...this.currentData });
  }

  unsubscribe(callback: (data: TruckData) => void) {
    this.subscribers = this.subscribers.filter((cb) => cb !== callback);
  }

  startUpdates() {
    if (!this.updateInterval) {
      this.updateInterval = setInterval(() => this.updateMetrics(), 3000); // Update every 3 seconds
    }
  }

  stopUpdates() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }
}

// Create a singleton instance
export const truckDataService = new TruckDataService();
