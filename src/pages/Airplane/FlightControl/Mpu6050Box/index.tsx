import React, { Component } from 'react';
import { connect } from 'dva';
import { Col, Divider, Row, Statistic } from 'antd';
import { Mpu6050BoxProps, Mpu6050BoxState } from '@/pages/Airplane/FlightControl/Mpu6050Box/data';
import {
  Acceleration,
  AngularResult,
  Gyro,
  Temperature,
} from '@/pages/Airplane/FlightControl/data';

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
const AccelerationBox = ({ item, span }: { item: Acceleration; span: number }) => (
  <Row style={{ marginBottom: 20 }}>
    <Col span={24}>
      <h1>重力加速度计</h1>
    </Col>
    <Col span={span}>
      <Statistic title="传感器实际值-X" value={item.divLbsX} suffix="" precision={3} />
    </Col>
    <Col span={span}>
      <Statistic title="传感器实际值-Y" value={item.divLbsY} suffix="g" precision={3} />
    </Col>
    <Col span={span}>
      <Statistic title="传感器实际值-Z" value={item.divLbsZ} suffix="g" precision={3} />
    </Col>
    <Col span={span}>
      <Statistic title="绝对角度-X" value={item.absoluteRotationX} suffix="" precision={3} />
    </Col>
    <Col span={span}>
      <Statistic title="绝对角度-Y" value={item.absoluteRotationY} suffix="" precision={3} />
    </Col>
    <Col span={span}>
      <Statistic title="相对角度-X" value={item.relativelyRotationX} suffix="" precision={3} />
    </Col>
    <Col span={span}>
      <Statistic title="相对角度-Y" value={item.relativelyRotationY} suffix="" precision={3} />
    </Col>
  </Row>
);
const GyroBox = ({ item, span }: { item: Gyro; span: number }) => (
  <Row style={{ marginBottom: 20 }}>
    <Col span={24}>
      <h1>陀螺仪角速度计</h1>
    </Col>
    <Col span={span}>
      <Statistic title="传感器实际值-X" value={item.divLbsX} suffix="" precision={3} />
    </Col>
    <Col span={span}>
      <Statistic title="传感器实际值-Y" value={item.divLbsY} suffix="" precision={3} />
    </Col>
    <Col span={span}>
      <Statistic title="传感器实际值-Z" value={item.divLbsZ} suffix="" precision={3} />
    </Col>
    <Col span={span}>
      <Statistic title="传感器相对角速度-X" value={item.angularSpeedX} suffix="" precision={3} />
    </Col>
    <Col span={span}>
      <Statistic title="传感器相对角速度-Y" value={item.angularSpeedY} suffix="" precision={3} />
    </Col>
    <Col span={span}>
      <Statistic title="传感器相对角速度-Z" value={item.angularSpeedZ} suffix="" precision={3} />
    </Col>
    <Col span={span}>
      <Statistic title="角速度计算结果-X" value={item.resultX} suffix="" precision={3} />
    </Col>
    <Col span={span}>
      <Statistic title="角速度计算结果-Y" value={item.resultY} suffix="" precision={3} />
    </Col>
    <Col span={span}>
      <Statistic title="角速度计算结果-Z" value={item.resultZ} suffix="" precision={3} />
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
      data: { gyro, acceleration, angularResult, temperature },
    } = this.props;
    return (
      <Row gutter={8}>
        <Col span={24}>
          <CalculationBox item={angularResult} span={4} />
        </Col>
        <Divider />
        <Col span={24}>
          <AccelerationBox item={acceleration} span={2} />
        </Col>
        <Divider />
        <Col span={24}>
          <GyroBox item={gyro} span={2} />
        </Col>
        <Divider />
        <Col span={24}>
          <TemperatureBox item={temperature} span={2} />
        </Col>
        <Divider />
      </Row>
    );
  }
}

export default connect(() => ({}))(Mpu6050Box);
