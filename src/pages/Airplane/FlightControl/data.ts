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

export interface Gyro {
  /**
   * 静止状态下校准得到的偏移平均值
   */
  offsetX: number;
  /**
   * 静止状态下校准得到的偏移平均值
   */
  offsetY: number;
  /**
   * 静止状态下校准得到的偏移平均值
   */
  offsetZ: number;
  /**
   * 除去LBS，得到角速度值，绝对角速度
   */
  divLbsX: number;
  /**
   * 除去LBS，得到角速度值，绝对角速度
   */
  divLbsY: number;
  /**
   * 除去LBS，得到角速度值，绝对角速度
   */
  divLbsZ: number;
  /**
   * 相对角速度，计算实际的角速度，因为角速度有一定波动，需要记录静止状态时的波动数，然后以当前的 - 静止的 = 实际的角速度值
   */
  angularSpeedX: number;
  /**
   * 相对角速度，计算实际的角速度，因为角速度有一定波动，需要记录静止状态时的波动数，然后以当前的 - 静止的 = 实际的角速度值
   */
  angularSpeedY: number;
  /**
   * 相对角速度，计算实际的角速度，因为角速度有一定波动，需要记录静止状态时的波动数，然后以当前的 - 静止的 = 实际的角速度值
   */
  angularSpeedZ: number;
  /**
   * 旋转角度计算结果
   */
  resultX: number;
  /**
   * 旋转角度计算结果
   */
  resultY: number;
  /**
   * 旋转角度计算结果
   */
  resultZ: number;
}

export interface Acceleration {
  /**
   * 静止状态下校准得到的偏移平均值
   */
  offsetX: number;
  /**
   * 静止状态下校准得到的偏移平均值
   */
  offsetY: number;
  /**
   * 除去LBS值，得到该方向的重力加速度，单位g
   */
  divLbsX: number;
  /**
   * 除去LBS值，得到该方向的重力加速度，单位g
   */
  divLbsY: number;
  /**
   * 除去LBS值，得到该方向的重力加速度，单位g
   */
  divLbsZ: number;
  /**
   * 绝对角度，通过重力加速度计算出旋转角度
   */
  absoluteRotationX: number;
  /**
   * 绝对角度，通过重力加速度计算出旋转角度
   */
  absoluteRotationY: number;
  /**
   * 相对角度，通过重力加速度计算出旋转角度
   */
  relativelyRotationX: number;
  /**
   * 相对角度，通过重力加速度计算出旋转角度
   */
  relativelyRotationY: number;
}

export interface AngularResult {
  /**
   * 过滤角度，绝对角度，旋转角度计算结果
   */
  absoluteAngleX: number;
  /**
   * 过滤角度，绝对角度，旋转角度计算结果
   */
  absoluteAngleY: number;
  /**
   * 垂直方向角度旋转
   */
  angleZ: number;

  /**
   * 相对角度
   */
  relativelyAngleX: number;
  /**
   * 相对角度
   */
  relativelyAngleY: number;
}

export interface Temperature {
  temp: number;
}

export interface Mpu6050 {
  gyro: Gyro;
  acceleration: Acceleration;
  angularResult: AngularResult;
  temperature: Temperature;
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
    mpu6050: Mpu6050;
    motor: Motor;
    posture: number[];
  };
  power: Power;
  client: CompatClient | null;
}
