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
import PowerBox from './PowerBox';
import { FlightControlProps, FlightControlState } from './data';
import styles from './index.less';
import { CompatClient } from '@stomp/stompjs/esm5/compatibility/compat-client';

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
        motors: [
          {
            gpio: {
              pin: 0,
              physPin: null,
              wiringPiPin: null,
              bcmPin: null,
            },
            dutyRatio: 0,
            posture: 0.0,
            run: false,
            debugHighLevelTime: 0,
            runtimeCycle: 0,
            title: '1号电机',
          },
          {
            gpio: {
              pin: 0,
              physPin: null,
              wiringPiPin: null,
              bcmPin: null,
            },
            dutyRatio: 0,
            posture: 0.0,
            run: false,
            debugHighLevelTime: 0,
            runtimeCycle: 0,
            title: '2号电机',
          },
          {
            gpio: {
              pin: 0,
              physPin: null,
              wiringPiPin: null,
              bcmPin: null,
            },
            dutyRatio: 0,
            posture: 0.0,
            run: false,
            debugHighLevelTime: 0,
            runtimeCycle: 0,
            title: '3号电机',
          },
          {
            gpio: {
              pin: 0,
              physPin: null,
              wiringPiPin: null,
              bcmPin: null,
            },
            dutyRatio: 0,
            posture: 0.0,
            run: false,
            debugHighLevelTime: 0,
            runtimeCycle: 0,
            title: '4号电机',
          },
        ],
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
      airplane: { direction, gps, posture, motors },
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
        </Row>
        <MotorBox motors={motors} />
        <ControlBox direction={direction} onChange={this.directionChange} />
      </PageHeaderWrapper>
    );
  }
}

export default connect(() => ({}))(Form.create<FlightControlProps>()(FlightControl));
