import React, { Component } from 'react';
import { connect } from 'dva';
import { Form } from '@ant-design/compatible';
import { GpsBoxProps, GpsBoxState } from '@/pages/Airplane/FlightControl/GpsBox/data';
import { Col, Row, Statistic } from 'antd';

class GpsBox extends Component<GpsBoxProps, GpsBoxState> {
  constructor(props: GpsBoxProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props;
    return (
      <Row gutter={8}>
        <Col xs={6}>
          <Statistic title="经度" value={data.lng} suffix="" precision={6} />
        </Col>
        <Col xs={6}>
          <Statistic title="纬度" value={data.lat} suffix="" precision={6} />
        </Col>
        <Col xs={6}>
          <Statistic title="高度" value={data.height} suffix="m" precision={3} />
        </Col>
        <Col xs={6}>
          <Statistic title="速度" value={data.speed} suffix="m/s" precision={3} />
        </Col>
      </Row>
    );
  }
}

export default connect(() => ({}))(Form.create<GpsBoxProps>()(GpsBox));
