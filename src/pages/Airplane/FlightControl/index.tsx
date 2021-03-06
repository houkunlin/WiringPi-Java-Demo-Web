import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
import { Form } from '@ant-design/compatible';
import { connect } from 'dva';
import GpsBox from '@/pages/Airplane/FlightControl/GpsBox';
import MotorBox from '@/pages/Airplane/FlightControl/MotorBox';
import ConnectBox from '@/pages/Airplane/FlightControl/ConnectBox';
import ControlBox from '@/pages/Airplane/FlightControl/ControlBox';
import { CompatClient } from '@stomp/stompjs/esm5/compatibility/compat-client';
import PowerBox from './PowerBox';
import { FlightControlProps, FlightControlState } from './data';
import styles from './index.less';
import Mpu6050Box from '@/pages/Airplane/FlightControl/Mpu6050Box';

class FlightControl extends Component<FlightControlProps, FlightControlState> {
  box: any | undefined;

  constructor(props: FlightControlProps) {
    super(props);

    onkeyup = key => {
      switch (key.code) {
        case 'Escape':
        case 'Numpad5':
        case 'Numpad0':
        case 'NumpadEnter':
          this.powerChange(false);
          break;
        default:
          if (this.box.onKeyboardEvent) {
            this.box.onKeyboardEvent(key);
          }
          return;
      }
      console.log(key, key.code, key.keyCode, this.box);
    };
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
        posture: [],
        mpu6050: {
          gyro: {},
          acceleration: {},
          angularResult: {},
          temperature: {},
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

  onRef = (box: any) => {
    this.box = box;
  };

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
      airplane: { direction, gps, motor, mpu6050, posture },
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
          <Col xs={24}>
            <Card title="姿态数据2" style={{ marginTop: 20 }}>
              <Mpu6050Box data={mpu6050} />
            </Card>
          </Col>
        </Row>
        <MotorBox motor={motor} />
        <Row>
          <Col span={24}>补偿数据: {posture}</Col>
        </Row>
        <ControlBox bindRef={this.onRef} direction={direction} onChange={this.directionChange} />
      </PageHeaderWrapper>
    );
  }
}

export default connect(() => ({}))(Form.create<FlightControlProps>()(FlightControl));
