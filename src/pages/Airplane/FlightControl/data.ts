import { ConnectProps } from '@/models/connect';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import { CompatClient } from '@stomp/stompjs/esm5/compatibility/compat-client';

export interface Gpio {
  pin: number;
  physPin?: string | null;
  wiringPiPin?: string | null;
  bcmPin?: string | null;
}

export interface Power {
  gpio: Gpio;
  open: boolean;
  startTime?: string | number | null;
  endTime?: string | number | null;
}

export interface MotorStatus {
  index: number;
  value: number;
}

export interface Motor {
  motors: MotorStatus[];
  maxValue: number;
  midValue: number;
  minValue: number;
}

export interface Posture {
  x: number;
  y: number;
  z: number;
}

export interface Gps {
  lng: number;
  lat: number;
  height: number;
  speed: number;
}

export interface Direction {
  vertical: number;
  horizontal: number;
  forwardBackward: number;
  rotate: number;
}

export interface FlightControlProps extends ConnectProps, FormComponentProps {}

export interface FlightControlState {
  airplane: {
    direction: Direction;
    gps: Gps;
    posture: Posture;
    motor: Motor;
  };
  power: Power;
  client: CompatClient | null;
}
