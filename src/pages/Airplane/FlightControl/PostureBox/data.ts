import { ConnectProps } from '@/models/connect';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import { Posture } from '@/pages/Airplane/FlightControl/data';

export interface PostureBoxProps extends ConnectProps, FormComponentProps {
  data: Posture;
}

export interface PostureBoxState {}
