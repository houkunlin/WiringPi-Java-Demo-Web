import React, { Component, useState } from 'react';
import { connect } from 'dva';
import { Form } from '@ant-design/compatible';
import { Card, Col, Drawer, Dropdown, Menu, Row, Statistic, Tag } from 'antd';
import { MotorBoxProps, MotorBoxState } from '@/pages/Airplane/FlightControl/MotorBox/data';
import { Motor, MotorStatus } from '@/pages/Airplane/FlightControl/data';
import { MenuOutlined } from '@ant-design/icons/lib';
import { ClickParam } from 'antd/lib/menu';

const Item = ({ item }: { motor: Motor; item: MotorStatus }) => (
  <div>
    <Row gutter={8} style={{ marginBottom: 20 }}>
      <Col span={24}>
        <Statistic title="高电平时间" value={item.value} suffix=" us" />
      </Col>
    </Row>
  </div>
);
const MotorMenu = ({ item }: { item: MotorStatus }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const menuClick = (result: ClickParam) => {
    console.log(result);
    if (result.key === 'dutyRatio') {
      setVisible(true);
    }
  };

  const menu = (
    <Menu onClick={menuClick}>
      <Menu.Item key="dutyRatio">占空比调试</Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Drawer visible={visible} placement="top" closable={false} onClose={() => setVisible(false)}>
        当前值：{item.value}
      </Drawer>

      <Dropdown overlay={menu}>
        <MenuOutlined />
      </Dropdown>
    </div>
  );
};

class MotorBox extends Component<MotorBoxProps, MotorBoxState> {
  constructor(props: MotorBoxProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { motor } = this.props;
    const { motors, maxValue, minValue } = motor;
    const title = (item: MotorStatus) => {
      const run = item.value <= maxValue && item.value >= minValue + 80;
      return (
        <div>
          <span style={{ marginRight: 20 }}>{item.index + 1}号电机</span>
          {run ? <Tag color="blue">运行中</Tag> : <Tag color="red">停止</Tag>}
        </div>
      );
    };
    return (
      <Row gutter={20} style={{ marginBottom: 20 }}>
        {motors &&
          motors.map(motorItem => (
            <Col xs={24 / motors.length} key={`${motorItem.index}`}>
              <Card title={title(motorItem)} extra={<MotorMenu item={motorItem} />}>
                <Item motor={motor} item={motorItem} />
              </Card>
            </Col>
          ))}
      </Row>
    );
  }
}

export default connect(() => ({}))(Form.create<MotorBoxProps>()(MotorBox));
