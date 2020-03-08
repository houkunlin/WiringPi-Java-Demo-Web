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

export interface Mpu6050 {
  /**
   * 陀螺旋转角传感器值
   */
  gyroAngularSpeedX: number;
  /**
   * 陀螺旋转角传感器值
   */
  gyroAngularSpeedY: number;
  /**
   * 陀螺旋转角传感器值
   */
  gyroAngularSpeedZ: number;

  /**
   * 陀螺仪角速度偏移，对象初始化时会初始化该参数
   */
  gyroAngularSpeedOffsetX: number;
  /**
   * 陀螺仪角速度偏移，对象初始化时会初始化该参数
   */
  gyroAngularSpeedOffsetY: number;
  /**
   * 陀螺仪角速度偏移，对象初始化时会初始化该参数
   */
  gyroAngularSpeedOffsetZ: number;

  /**
   * 过滤角度，绝对角度，旋转角度计算结果
   */
  filteredAngleX: number;
  /**
   * 过滤角度，绝对角度，旋转角度计算结果
   */
  filteredAngleY: number;
  /**
   * 过滤角度，绝对角度，旋转角度计算结果
   */
  filteredAngleZ: number;

  /**
   * 加速度传感器值
   */
  accelAccelerationX: number;
  /**
   * 加速度传感器值
   */
  accelAccelerationY: number;
  /**
   * 加速度传感器值
   */
  accelAccelerationZ: number;
  /**
   * 加速度计算结果
   */
  accelAngleX: number;
  /**
   * 加速度计算结果
   */
  accelAngleY: number;
  /**
   * 加速度计算结果
   */
  accelAngleZ: number;
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
    mpu6050: Mpu6050;
    motor: Motor;
  };
  power: Power;
  client: CompatClient | null;
}
