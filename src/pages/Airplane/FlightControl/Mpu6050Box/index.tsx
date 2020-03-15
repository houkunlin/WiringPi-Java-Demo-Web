import React, { Component } from 'react';
import { connect } from 'dva';
import { Col, Divider, Row, Statistic } from 'antd';
import { Mpu6050BoxProps, Mpu6050BoxState } from '@/pages/Airplane/FlightControl/Mpu6050Box/data';
import { AngularResult, Temperature } from '@/pages/Airplane/FlightControl/data';

const CalculationBox = ({ item, span }: { item: AngularResult; span: number }) => (
  <Row style={{ marginBottom: 20 }}>
    <Col span={24}>
      <h1>互补过滤结果-旋转角度</h1>
    </Col>
    <Col span={span}>
      <Statistic title="绝对角度-X" value={item.absoluteAngleX} suffix="" precision={3} />
    </Col>
    <Col span={span}>
      <Statistic title="绝对角度-Y" value={item.absoluteAngleY} suffix="" precision={3} />
    </Col>
    <Col span={span}>
      <Statistic title="垂直旋转角度-Z" value={item.angleZ} suffix="" precision={3} />
    </Col>
    <Col span={span}>
      <Statistic title="相对角度-X1" value={item.relativelyAngleX} suffix="" precision={3} />
    </Col>
    <Col span={span}>
      <Statistic title="相对角度-Y1" value={item.relativelyAngleY} suffix="" precision={3} />
    </Col>
  </Row>
);
const TemperatureBox = ({ item, span }: { item: Temperature; span: number }) => (
  <Row style={{ marginBottom: 20 }}>
    <Col span={24}>
      <h1>温度传感器</h1>
    </Col>
    <Col span={span}>
      <Statistic title="除LBS结果" value={item.temp} suffix="" precision={1} />
    </Col>
  </Row>
);

class Mpu6050Box extends Component<Mpu6050BoxProps, Mpu6050BoxState> {
  constructor(props: Mpu6050BoxProps) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      data: { angularResult, temperature },
    } = this.props;
    return (
      <Row gutter={8}>
        <Col span={24}>
          <CalculationBox item={angularResult} span={4} />
        </Col>
        <Divider />
        <Col span={24}>
          <TemperatureBox item={temperature} span={2} />
        </Col>
      </Row>
    );
  }
}

export default connect(() => ({}))(Mpu6050Box);
