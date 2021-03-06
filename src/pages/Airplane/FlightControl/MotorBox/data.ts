import { ConnectProps } from '@/models/connect';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import { Motor } from '@/pages/Airplane/FlightControl/data';

export interface MotorBoxProps extends ConnectProps, FormComponentProps {
  motor: Motor;
}

export interface MotorBoxState {}
