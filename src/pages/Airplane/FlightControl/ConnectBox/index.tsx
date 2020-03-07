import React, { Component, RefObject } from 'react';
import { connect } from 'dva';
import { Button, Col, Form, Input, notification, Row } from 'antd';
import { ConnectBoxProps, ConnectBoxState } from '@/pages/Airplane/FlightControl/ConnectBox/data';
import { FormInstance } from 'antd/lib/form';
import SockJS from 'sockjs-client';
// import Stomp from 'stomp-client';
import { CompatClient, IFrame } from '@stomp/stompjs';

class ConnectBox extends Component<ConnectBoxProps, ConnectBoxState> {
  formRef: RefObject<FormInstance> = React.createRef();

  constructor(props: ConnectBoxProps) {
    super(props);
    this.state = {
      prefix: `${document.location.protocol}//`,
      // value: `${document.location.host}/raspberry-pi/airplane`,
      value: `192.168.199.24:8080/raspberry-pi/airplane`,
      loading: false,
      client: null,
    };
  }

  connect = () => {
    this.setState({ loading: true });
    const { prefix, value } = this.state;
    const url = prefix + value;
    const client = new CompatClient(() => new SockJS(url));
    client.debug = () => {};
    client.connect(
      {},
      (frame: IFrame) => {
        console.log('连接成功', frame);
        notification.info({ message: '连接成功', description: '已与系统建立连接！' });
        this.setState({ loading: false, client });
        this.props.onConnect(client);
      },
      (error: IFrame) => {
        console.log('错误回调', error);
      },
      (event: CloseEvent) => {
        console.log('关闭事件', event);
        if (event.code !== 1000) {
          notification.error({ message: '连接失败', description: '连接被意外关闭！' });
        } else {
          notification.info({ message: '连接关闭', description: '主动关闭连接成功！' });
        }
        this.setState({ loading: false, client: null });
        this.props.onDisconnect();
      },
    );
    // client.connect()
  };

  disconnect = () => {
    const { client } = this.state;
    if (client != null) {
      client.disconnect(() => {
        this.setState({ client: null });
        this.props.onDisconnect();
      });
    }
  };

  onFormChange = (values: any) => {
    this.setState({ value: values.url });
  };

  render() {
    const { prefix, value, loading, client } = this.state;
    return (
      <Form ref={this.formRef} onValuesChange={this.onFormChange}>
        <Row gutter={8}>
          <Col xs={20}>
            <Form.Item name="url">
              <Input addonBefore={prefix} defaultValue={value} />
            </Form.Item>
          </Col>
          {client == null && (
            <Col xs={2}>
              <Button type="primary" onClick={this.connect} loading={loading}>
                连接服务器
              </Button>
            </Col>
          )}
          {client != null && (
            <Col xs={2}>
              <Button type="danger" onClick={this.disconnect}>
                断开连接
              </Button>
            </Col>
          )}
        </Row>
      </Form>
    );
  }
}

export default connect(() => ({}))(ConnectBox);
