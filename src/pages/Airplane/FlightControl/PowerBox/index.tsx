import React, { Component } from 'react';
import { connect } from 'dva';
import '@ant-design/compatible/assets/index.css';
import { DatePicker, Form, Switch } from 'antd';
import moment from 'moment';
import { PowerBoxProps, PowerBoxState } from './data';

class Power extends Component<PowerBoxProps, PowerBoxState> {
  constructor(props: PowerBoxProps) {
    super(props);
    this.state = {};
  }

  onFormChange = (values: any, allValues: any) => {
    console.log(values, allValues);
    if (values.open !== undefined) {
      this.props.onChange(values.open);
    }
  };

  render() {
    const { data } = this.props;
    return (
      <Form
        layout="inline"
        initialValues={{
          open: data.open,
          startTime: data.startTime == null ? null : moment(data.startTime),
          endTime: data.endTime == null ? null : moment(data.endTime),
        }}
        onValuesChange={this.onFormChange}
      >
        <Form.Item label="电源状态" name="open">
          <Switch defaultChecked={data.open} checkedChildren="已开启" unCheckedChildren="已关闭" />
        </Form.Item>
        <Form.Item label="开启时间" name="startTime">
          <DatePicker format="YYYY-MM-DD HH:mm:ss" disabled placeholder="电源未开始运行" />
        </Form.Item>
        <Form.Item label="关闭时间" name="endTime">
          <DatePicker format="YYYY-MM-DD HH:mm:ss" disabled placeholder="电源未结束运行" />
        </Form.Item>
      </Form>
    );
  }
}

export default connect(() => ({}))(Power);
