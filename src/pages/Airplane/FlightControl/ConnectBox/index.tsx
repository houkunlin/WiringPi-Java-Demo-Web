import React, { Component, RefObject } from 'react';
import { connect } from 'dva';
import { Button, Col, Form, Input, Row } from 'antd';
import { ConnectBoxProps, ConnectBoxState } from '@/pages/Airplane/FlightControl/ConnectBox/data';
import { FormInstance } from 'antd/lib/form';
import SockJS from 'sockjs-client';
// import Stomp from 'stomp-client';
import { Stomp } from '@stomp/stompjs';

class ConnectBox extends Component<ConnectBoxProps, ConnectBoxState> {
  formRef: RefObject<FormInstance> = React.createRef();

  constructor(props: ConnectBoxProps) {
    super(props);
    this.state = {
      prefix: `${document.location.protocol}//`,
      value: `${document.location.host}/raspberry-pi/airplane`,
      loading: false,
      client: null,
    };
  }

  connect = () => {
    this.setState({ loading: true });
    const { prefix, value } = this.state;
    const url = prefix + value;
    const socket = new SockJS(url);
    const client = Stomp.over(socket);
    client.connect(
      {},
      (frame: any) => {
        console.log(`Connected: ${frame}`);
        this.setState({ loading: false, client });
        this.props.onConnect(client);
      },
      (error: any) => {
        console.log(`错误${error}`);
        this.setState({ loading: false });
      },
    );
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
