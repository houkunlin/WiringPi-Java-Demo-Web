import { ConnectProps } from '@/models/connect';
import { Power } from '@/pages/Airplane/FlightControl/data';

export interface PowerBoxProps extends ConnectProps {
  data: Power;
  onChange: (status: boolean) => any;
}

export interface PowerBoxState {}
