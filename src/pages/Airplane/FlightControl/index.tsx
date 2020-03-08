import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
import { Form } from '@ant-design/compatible';
import { connect } from 'dva';
import GpsBox from '@/pages/Airplane/FlightControl/GpsBox';
import PostureBox from '@/pages/Airplane/FlightControl/PostureBox';
import MotorBox from '@/pages/Airplane/FlightControl/MotorBox';
import ConnectBox from '@/pages/Airplane/FlightControl/ConnectBox';
import ControlBox from '@/pages/Airplane/FlightControl/ControlBox';
import { CompatClient } from '@stomp/stompjs/esm5/compatibility/compat-client';
import PowerBox from './PowerBox';
import { FlightControlProps, FlightControlState } from './data';
import styles from './index.less';
import Mpu6050Box from '@/pages/Airplane/FlightControl/Mpu6050Box';

class FlightControl extends Component<FlightControlProps, FlightControlState> {
  constructor(props: FlightControlProps) {
    super(props);
    this.state = {
      airplane: {
        direction: {
          vertical: 0,
          horizontal: 0,
          forwardBackward: 0,
          rotate: 0,
        },
        gps: {
          lng: 0,
          lat: 0,
          height: 0,
          speed: 0,
        },
        posture: {
          x: 0,
          y: 0,
          z: 0,
        },
        mpu6050: {
          /**
           * 陀螺旋转角传感器值
           */
          gyroAngularSpeedX: 0,
          /**
           * 陀螺旋转角传感器值
           */
          gyroAngularSpeedY: 0,
          /**
           * 陀螺旋转角传感器值
           */
          gyroAngularSpeedZ: 0,

          /**
           * 陀螺仪角速度偏移，对象初始化时会初始化该参数
           */
          gyroAngularSpeedOffsetX: 0,
          /**
           * 陀螺仪角速度偏移，对象初始化时会初始化该参数
           */
          gyroAngularSpeedOffsetY: 0,
          /**
           * 陀螺仪角速度偏移，对象初始化时会初始化该参数
           */
          gyroAngularSpeedOffsetZ: 0,

          /**
           * 过滤角度，绝对角度，旋转角度计算结果
           */
          filteredAngleX: 0,
          /**
           * 过滤角度，绝对角度，旋转角度计算结果
           */
          filteredAngleY: 0,
          /**
           * 过滤角度，绝对角度，旋转角度计算结果
           */
          filteredAngleZ: 0,

          /**
           * 加速度传感器值
           */
          accelAccelerationX: 0,
          /**
           * 加速度传感器值
           */
          accelAccelerationY: 0,
          /**
           * 加速度传感器值
           */
          accelAccelerationZ: 0,
          /**
           * 加速度计算结果
           */
          accelAngleX: 0,
          /**
           * 加速度计算结果
           */
          accelAngleY: 0,
          /**
           * 加速度计算结果
           */
          accelAngleZ: 0,
        },
        motor: {
          motors: [
            {
              index: 0,
              value: 0,
            },
            {
              index: 1,
              value: 0,
            },
            {
              index: 2,
              value: 0,
            },
            {
              index: 3,
              value: 0,
            },
          ],
          maxValue: 0,
          midValue: 0,
          minValue: 0,
        },
      },
      power: {
        gpio: {
          pin: 0,
          physPin: null,
          wiringPiPin: null,
          bcmPin: null,
        },
        open: false,
        startTime: null,
        endTime: null,
      },
      client: null,
    };
  }

  directionChange = (values: any) => {
    const { client } = this.state;
    if (client != null) {
      client.send('/airplane/direction', {}, JSON.stringify(values));
    }
  };

  powerChange = (open: boolean) => {
    console.log('电源状态', open);
    const { client } = this.state;
    if (client != null) {
      client.send('/airplane/power', {}, JSON.stringify({ value: open }));
    }
  };

  onConnect = (client: CompatClient) => {
    this.setState({ client });
    // 订阅飞机状态信息
    client.subscribe('/topic/airplane/status', response => {
      const json = JSON.parse(response.body);
      const { power, airplane } = json;
      this.setState({ power, airplane });
    });
  };

  onDisconnect = () => {
    this.setState({ client: null });
  };

  render() {
    // console.log(this.props);
    // console.log(this.state);
    // console.log(document.location);
    const {
      power,
      airplane: { direction, gps, posture, motor, mpu6050 },
    } = this.state;

    return (
      <PageHeaderWrapper content="树莓派飞机控制台" className={styles.main}>
        <Card style={{ marginBottom: 20 }}>
          <ConnectBox onConnect={this.onConnect} onDisconnect={this.onDisconnect} />
        </Card>
        <Card style={{ marginBottom: 20 }}>
          <PowerBox data={power} onChange={this.powerChange} />
        </Card>
        <Row gutter={20} style={{ marginBottom: 20 }}>
          <Col xs={12}>
            <Card title="GPS数据">
              <GpsBox data={gps} />
            </Card>
          </Col>
          <Col xs={12}>
            <Card title="姿态数据">
              <PostureBox data={posture} />
            </Card>
          </Col>
          <Col xs={24}>
            <Card title="姿态数据2" style={{ marginTop: 20 }}>
              <Mpu6050Box data={mpu6050} />
            </Card>
          </Col>
        </Row>
        <MotorBox motor={motor} />
        <ControlBox direction={direction} onChange={this.directionChange} />
      </PageHeaderWrapper>
    );
  }
}

export default connect(() => ({}))(Form.create<FlightControlProps>()(FlightControl));
