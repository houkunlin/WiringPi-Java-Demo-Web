import React, { Component } from 'react';
import { connect } from 'dva';
import { Form } from '@ant-design/compatible';
import { Card, Col, Row, Statistic, Tag } from 'antd';
import { MotorBoxProps, MotorBoxState } from '@/pages/Airplane/FlightControl/MotorBox/data';
import { Motor } from '@/pages/Airplane/FlightControl/data';

const Item = ({ motor }: { motor: Motor }) => (
  <div>
    <p>运行状态：{motor.run ? <Tag color="blue">运行中</Tag> : <Tag color="red">停止</Tag>}</p>
    <Row gutter={8} style={{ marginBottom: 20 }}>
      <Col span={12}>
        <Statistic title="占空比" value={motor.dutyRatio * 100.0} suffix="%" precision={2} />
      </Col>
      <Col span={12}>
        <Statistic title="姿态调整" value={motor.posture * 100.0} suffix="%" precision={2} />
      </Col>
    </Row>
    <Row gutter={8}>
      <Col span={12}>
        <Statistic title="调试高电平" value={motor.debugHighLevelTime} suffix=" ms" />
      </Col>
      <Col span={12}>
        <Statistic title="运行周期" value={motor.runtimeCycle} suffix=" ns" />
      </Col>
    </Row>
  </div>
);

class MotorBox extends Component<MotorBoxProps, MotorBoxState> {
  constructor(props: MotorBoxProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { motors } = this.props;
    return (
      <Row gutter={20} style={{ marginBottom: 20 }}>
        {motors &&
          motors.map(motor => (
            <Col xs={24 / motors.length} key={`${motor.title}`}>
              <Card title={motor.title}>
                <Item motor={motor} />
              </Card>
            </Col>
          ))}
      </Row>
    );
  }
}

export default connect(() => ({}))(Form.create<MotorBoxProps>()(MotorBox));
