export interface Data {
  name: string;
  current: {
    temp: number;
    humidity: number;
    weather: { description: string; icon: number }[];
  };
  error_message?: string;
}
