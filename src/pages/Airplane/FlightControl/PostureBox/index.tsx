import React, { Component } from 'react';
import { connect } from 'dva';
import { Form } from '@ant-design/compatible';
import { Col, Row, Statistic } from 'antd';
import { PostureBoxProps, PostureBoxState } from '@/pages/Airplane/FlightControl/PostureBox/data';

class PostureBox extends Component<PostureBoxProps, PostureBoxState> {
  constructor(props: PostureBoxProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props;
    return (
      <Row gutter={8}>
        <Col xs={4}>
          <Statistic title="X轴旋转" value={data.x} suffix="" precision={3} />
        </Col>
        <Col xs={4}>
          <Statistic title="Y轴旋转" value={data.y} suffix="" precision={3} />
        </Col>
        <Col xs={4}>
          <Statistic title="Z轴旋转" value={data.z} suffix="" precision={3} />
        </Col>
        <Col xs={4}>
          <Statistic title="X轴加速度" value={data.x} suffix="" precision={3} />
        </Col>
        <Col xs={4}>
          <Statistic title="Y轴加速度" value={data.y} suffix="" precision={3} />
        </Col>
        <Col xs={4}>
          <Statistic title="Z轴加速度" value={data.z} suffix="" precision={3} />
        </Col>
      </Row>
    );
  }
}

export default connect(() => ({}))(Form.create<PostureBoxProps>()(PostureBox));
