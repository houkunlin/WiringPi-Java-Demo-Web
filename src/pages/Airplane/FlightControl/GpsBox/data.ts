import { ConnectProps } from '@/models/connect';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import { Gps } from '@/pages/Airplane/FlightControl/data';

export interface GpsBoxProps extends ConnectProps, FormComponentProps {
  data: Gps;
}

export interface GpsBoxState {}
