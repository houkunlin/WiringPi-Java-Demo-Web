import React, { Component } from 'react';
import { connect } from 'dva';
import { Col, Row, Statistic } from 'antd';
import { Mpu6050BoxProps, Mpu6050BoxState } from '@/pages/Airplane/FlightControl/Mpu6050Box/data';

class Mpu6050Box extends Component<Mpu6050BoxProps, Mpu6050BoxState> {
  constructor(props: Mpu6050BoxProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props;
    return (
      <Row gutter={8}>
        <Col span={24}>
          <Row style={{ marginBottom: 20 }}>
            <Col span={8}>
              <Statistic
                title="陀螺仪-角速度偏移-X"
                value={data.gyroAngularSpeedOffsetX}
                suffix=""
                precision={3}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="陀螺仪-角速度偏移-Y"
                value={data.gyroAngularSpeedOffsetY}
                suffix=""
                precision={3}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="陀螺仪-角速度偏移-Z"
                value={data.gyroAngularSpeedOffsetZ}
                suffix=""
                precision={3}
              />
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row style={{ marginBottom: 20 }}>
            <Col span={8}>
              <Statistic
                title="陀螺仪-旋转角度-传感器值-X"
                value={data.gyroAngularSpeedX}
                suffix=""
                precision={3}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="陀螺仪-旋转角度-传感器值-Y"
                value={data.gyroAngularSpeedY}
                suffix=""
                precision={3}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="陀螺仪-旋转角度-传感器值-Z"
                value={data.gyroAngularSpeedZ}
                suffix=""
                precision={3}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: 20 }}>
            <Col span={8}>
              <Statistic
                title="陀螺仪-旋转角度-计算结果-X"
                value={data.filteredAngleX}
                suffix=""
                precision={3}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="陀螺仪-旋转角度-计算结果-Y"
                value={data.filteredAngleY}
                suffix=""
                precision={3}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="陀螺仪-旋转角度-计算结果-Z"
                value={data.filteredAngleZ}
                suffix=""
                precision={3}
              />
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={8}>
              <Statistic
                title="陀螺仪-加速度-传感器值-X"
                value={data.accelAccelerationX}
                suffix=""
                precision={3}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="陀螺仪-加速度-传感器值-Y"
                value={data.accelAccelerationY}
                suffix=""
                precision={3}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="陀螺仪-加速度-传感器值-Z"
                value={data.accelAccelerationZ}
                suffix=""
                precision={3}
              />
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Statistic
                title="陀螺仪-加速度-计算结果-X"
                value={data.accelAngleX}
                suffix=""
                precision={3}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="陀螺仪-加速度-计算结果-Y"
                value={data.accelAngleY}
                suffix=""
                precision={3}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="陀螺仪-加速度-计算结果-Z"
                value={data.accelAngleZ}
                suffix=""
                precision={3}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default connect(() => ({}))(Mpu6050Box);
