import { ConnectProps } from '@/models/connect';
import { Mpu6050 } from '@/pages/Airplane/FlightControl/data';

export interface Mpu6050BoxProps extends ConnectProps {
  data: Mpu6050;
}

export interface Mpu6050BoxState {}
