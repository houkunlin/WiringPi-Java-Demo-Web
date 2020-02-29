import { ConnectProps } from '@/models/connect';
import { Direction } from '@/pages/Airplane/FlightControl/data';
import { Position } from 'nipplejs';

export interface ControlBoxProps extends ConnectProps {
  direction: Direction;
  onChange: (values: any) => any;
}

export interface ControlBoxState {
  nippleData: {
    angle: {
      degree: number;
      radian: number;
    };
    direction: {
      angle: string;
      x: string;
      y: string;
    };
    vector: {
      x: number;
      y: number;
    };
    raw: {
      distance: number;
      position: Position;
    };
    distance: number;
    force: number;
    identifier: number;
    position: Position;
    pressure: number;
  };
}
