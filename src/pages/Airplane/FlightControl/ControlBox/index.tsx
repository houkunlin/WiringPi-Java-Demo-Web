import React, { Component, RefObject } from 'react';
import { connect } from 'dva';
import '@ant-design/compatible/assets/index.css';
import { Button, Card, Col, Form, Row, Slider, Tag } from 'antd';
import { ControlBoxProps, ControlBoxState } from '@/pages/Airplane/FlightControl/ControlBox/data';
import numeral from 'numeral';
import nipplejs, {
  EventData,
  JoystickManager,
  JoystickManagerOptions,
  JoystickOutputData,
} from 'nipplejs';
import { FormInstance } from 'antd/lib/form';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons/lib';

class ControlBox extends Component<ControlBoxProps, ControlBoxState> {
  nippleBox: RefObject<any> = React.createRef();

  formRef: RefObject<FormInstance> = React.createRef();

  nipple: JoystickManager | undefined;

  genObj = (name: string, max: number, min: number, step: number) => ({
    name,
    max,
    min,
    step,
    maxFun: () => {
      const obj = {};
      obj[name] = max;
      this.setFieldsValue(obj);
    },
    midFun: () => {
      const obj = {};
      obj[name] = (max + min) / 2.0;
      this.setFieldsValue(obj);
    },
    minFun: () => {
      const obj = {};
      obj[name] = min;
      this.setFieldsValue(obj);
    },
    stepPreFun: () => {
      this.stepFun(name, -step);
    },
    stepNextFun: () => {
      this.stepFun(name, step);
    },
  });

  vertical = this.genObj('vertical', 1, 0, 0.001);

  horizontal = this.genObj('horizontal', 20, -20, 0.5);

  forwardBackward = this.genObj('forwardBackward', 20, -20, 0.5);

  rotate = this.genObj('rotate', 0.5, -0.5, 0.001);

  constructor(props: ControlBoxProps) {
    super(props);
    this.state = {
      nippleData: {
        identifier: 0, // 触发它的触摸/鼠标的标识符
        position: {
          // 中心的绝对位置(以像素为单位)
          x: 125,
          y: 95,
        },
        force: 0.2, // 强度 in %
        distance: 25.4, // 到中心的距离(以像素为单位)
        pressure: 0.1, // 触摸产生的压力
        angle: {
          radian: 1.5707963268, // 角的弧度
          degree: 90,
        },
        vector: {
          // 力的单位向量
          x: 0.508,
          y: 3.110602869834277e-17,
        },
        raw: {
          // 注意:角度是一样的，超过了50像素的限制
          distance: 25.4, // 持续超过50像素限制的距离
          position: {
            // 手指/鼠标的位置(以像素为单位)，超出了操纵杆的限制
            x: 125,
            y: 95,
          },
        },
        direction: {
          x: '',
          y: '',
          angle: '',
        },
      },
    };
  }

  onKeyboardEvent = (key: KeyboardEvent) => {
    switch (key.code) {
      case 'KeyW':
        this.vertical.stepNextFun();
        break;
      case 'KeyS':
        this.vertical.stepPreFun();
        break;
      case 'Numpad4':
        this.horizontal.stepPreFun();
        break;
      case 'Numpad6':
        this.horizontal.stepNextFun();
        break;
      case 'Numpad8':
        this.forwardBackward.stepNextFun();
        break;
      case 'Numpad2':
        this.forwardBackward.stepPreFun();
        break;
      default:
        return;
    }
    console.log(key, key.code, key.keyCode);
  };

  componentDidMount(): void {
    console.log(this.props);
    this.props.bindRef(this);
    const options: JoystickManagerOptions = {
      zone: this.nippleBox.current,
      mode: 'static',
      position: {
        left: '50%',
        top: '50%',
      },
    };
    // this.refs
    this.nipple = nipplejs.create(options);

    // {
    //   identifier: 0,              // 触发它的触摸/鼠标的标识符
    //   position: {                 // 中心的绝对位置(以像素为单位)
    //       x: 125,
    //       y: 95
    //   },
    //   force: 0.2,                 // 强度 in %
    //   distance: 25.4,             // 到中心的距离(以像素为单位)
    //   pressure: 0.1,              // 触摸产生的压力
    //   angle: {
    //       radian: 1.5707963268,   // 角的弧度
    //       degree: 90
    //   },
    //   vector: {                   // 力的单位向量
    //     x: 0.508,
    //     y: 3.110602869834277e-17
    //   },
    //   raw: {                      // 注意:角度是一样的，超过了50像素的限制
    //       distance: 25.4,         // 持续超过50像素限制的距离
    //       position: {             // 手指/鼠标的位置(以像素为单位)，超出了操纵杆的限制
    //           x: 125,
    //           y: 95
    //       }
    //   },
    //   instance: Nipple            // 触发事件的乳头实例
    // }

    this.nipple.on('start', (evt: EventData, data: JoystickOutputData) => {
      console.log(evt, data);
    });
    this.nipple.on('end', (evt: EventData, data: JoystickOutputData) => {
      console.log(evt, data);
    });
    this.nipple.on('move', (evt: EventData, data: JoystickOutputData) => {
      // console.log(evt, data);
      const {
        identifier,
        position,
        force,
        distance,
        pressure,
        angle,
        vector,
        raw,
        direction,
      } = data;
      this.setState({
        nippleData: {
          identifier,
          position,
          force,
          distance,
          pressure,
          angle,
          vector,
          raw,
          direction,
        },
      });
    });
  }

  onFormChange = (values: any, allValues: any) => {
    console.log(values, allValues);
    this.props.onChange(allValues);
  };

  setFieldsValue = (values: any) => {
    if (this.formRef.current) {
      this.formRef.current.setFieldsValue(values);
      this.onFormChange(values, this.formRef.current.getFieldsValue());
    }
  };

  stepFun = (field: string, step: number) => {
    if (this.formRef.current) {
      const values = {};
      const value: any = this.formRef.current.getFieldValue(field) * 1 + step;
      values[field] = value.toFixed(3) * 1.0;
      this.setFieldsValue(values);
    }
  };

  render() {
    // const {setFieldsValue} = this.formRef.current;
    const { vertical, horizontal, forwardBackward, rotate } = this;

    // const {setFieldsValue} = this.props.form;
    const { direction } = this.props;
    const { nippleData } = this.state;
    const formatNumber = (value: number) => numeral(value).format('0.0%');
    return (
      <Form
        ref={this.formRef}
        layout="horizontal"
        // form={form}
        style={{ width: '100%' }}
        initialValues={{
          rotate: direction.rotate,
          horizontal: direction.horizontal,
          forwardBackward: direction.forwardBackward,
          vertical: direction.vertical,
        }}
        onValuesChange={this.onFormChange}
      >
        <Row gutter={20} style={{ marginBottom: 20 }}>
          <Col xs={6}>
            <Card title="油门">
              <Row>
                <Col xs={12}>
                  <Form.Item name={vertical.name}>
                    <Slider
                      vertical
                      max={vertical.max}
                      min={vertical.min}
                      step={vertical.step}
                      tooltipVisible
                      style={{ height: 200 }}
                      tooltipPlacement="top"
                      tipFormatter={formatNumber}
                    />
                  </Form.Item>
                </Col>
                <Col xs={12}>
                  <Row align="bottom" justify="center">
                    <Col span={24}>
                      <Button
                        type="primary"
                        block
                        style={{ marginBottom: 10 }}
                        onClick={vertical.maxFun}
                      >
                        最大
                      </Button>
                    </Col>
                    <Col span={24}>
                      <Button
                        type="dashed"
                        block
                        style={{ marginBottom: 10 }}
                        onClick={vertical.midFun}
                      >
                        中间
                      </Button>
                    </Col>
                    <Col span={24}>
                      <Button
                        type="primary"
                        block
                        style={{ marginBottom: 10 }}
                        onClick={vertical.minFun}
                      >
                        最小
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Button onClick={vertical.stepNextFun}>
                        <PlusOutlined />
                      </Button>
                    </Col>
                    <Col span={12}>
                      <Button onClick={vertical.stepPreFun}>
                        <MinusOutlined />
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={6}>
            <Card title="前进/后退">
              <Row>
                <Col xs={12}>
                  <Form.Item name={forwardBackward.name}>
                    <Slider
                      vertical
                      max={forwardBackward.max}
                      min={forwardBackward.min}
                      step={forwardBackward.step}
                      tooltipVisible
                      style={{ height: 200 }}
                      tooltipPlacement="top"
                      tipFormatter={value => formatNumber(value / 100.0)}
                    />
                  </Form.Item>
                </Col>
                <Col xs={12}>
                  <Row>
                    <Col span={24}>
                      <Button
                        type="primary"
                        block
                        style={{ marginBottom: 10 }}
                        onClick={forwardBackward.maxFun}
                      >
                        最大
                      </Button>
                      <Button
                        type="dashed"
                        block
                        style={{ marginBottom: 10 }}
                        onClick={forwardBackward.midFun}
                      >
                        中间
                      </Button>
                      <Button
                        type="primary"
                        block
                        style={{ marginBottom: 10 }}
                        onClick={forwardBackward.minFun}
                      >
                        最小
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Button onClick={forwardBackward.stepNextFun}>
                        <PlusOutlined />
                      </Button>
                    </Col>
                    <Col span={12}>
                      <Button onClick={forwardBackward.stepPreFun}>
                        <MinusOutlined />
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={6}>
            <Card title="向左/向右">
              <Row>
                <Col xs={24}>
                  <Form.Item name={horizontal.name}>
                    <Slider
                      max={horizontal.max}
                      min={horizontal.min}
                      step={horizontal.step}
                      tooltipVisible
                      tooltipPlacement="top"
                      tipFormatter={value => formatNumber(value / 100.0)}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Row>
                    <Col span={24}>
                      <Button
                        type="primary"
                        block
                        style={{ marginBottom: 10 }}
                        onClick={horizontal.maxFun}
                      >
                        最大
                      </Button>
                      <Button
                        type="dashed"
                        block
                        style={{ marginBottom: 10 }}
                        onClick={horizontal.midFun}
                      >
                        中间
                      </Button>
                      <Button
                        type="primary"
                        block
                        style={{ marginBottom: 10 }}
                        onClick={horizontal.minFun}
                      >
                        最小
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Button onClick={horizontal.stepNextFun}>
                        <PlusOutlined />
                      </Button>
                    </Col>
                    <Col span={12}>
                      <Button onClick={horizontal.stepPreFun}>
                        <MinusOutlined />
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={6}>
            <Card title="原地旋转">
              <Row>
                <Col xs={24}>
                  <Form.Item name={rotate.name}>
                    <Slider
                      max={rotate.max}
                      min={rotate.min}
                      step={rotate.step}
                      tooltipVisible
                      tooltipPlacement="top"
                      tipFormatter={formatNumber}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Row>
                    <Col span={24}>
                      <Button
                        type="primary"
                        block
                        style={{ marginBottom: 10 }}
                        onClick={rotate.maxFun}
                      >
                        最大
                      </Button>
                      <Button
                        type="dashed"
                        block
                        style={{ marginBottom: 10 }}
                        onClick={rotate.midFun}
                      >
                        中间
                      </Button>
                      <Button
                        type="primary"
                        block
                        style={{ marginBottom: 10 }}
                        onClick={rotate.minFun}
                      >
                        最小
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Button onClick={rotate.stepNextFun}>
                        <PlusOutlined />
                      </Button>
                    </Col>
                    <Col span={12}>
                      <Button onClick={rotate.stepPreFun}>
                        <MinusOutlined />
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row gutter={8} style={{ height: 200 }}>
          <Col span={24}>
            <div
              ref={this.nippleBox}
              style={{ width: '100%', height: 200, background: '#c6c9ee' }}
            />
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={8}>
            <p>{JSON.stringify(direction)}</p>
            <p>
              <Tag>nippleData?.position.x</Tag>: {nippleData?.position.x}
            </p>
            <p>
              <Tag>nippleData?.position.y</Tag>: {nippleData?.position.y}
            </p>
            <p>
              <Tag>nippleData?.force</Tag>: {nippleData?.force}
            </p>
            <p>
              <Tag>nippleData?.distance</Tag>: {nippleData?.distance}
            </p>
            <p>
              <Tag>nippleData?.pressure</Tag>: {nippleData?.pressure}
            </p>
          </Col>
          <Col span={8}>
            <p>
              <Tag>nippleData?.angle.radian</Tag>: {nippleData?.angle.radian}
            </p>
            <p>
              <Tag>nippleData?.angle.degree</Tag>: {nippleData?.angle.degree}
            </p>
            <p>
              <Tag>nippleData?.vector.x</Tag>: {nippleData?.vector.x}
            </p>
            <p>
              <Tag>nippleData?.vector.y</Tag>: {nippleData?.vector.y}
            </p>
          </Col>
          <Col span={8}>
            <p>
              <Tag>nippleData?.raw.distance</Tag>: {nippleData?.raw.distance}
            </p>
            <p>
              <Tag>nippleData?.raw.position.y</Tag>: {JSON.stringify(nippleData?.raw.position)}
            </p>
            <p>
              <Tag>nippleData?.direction.y</Tag>: {JSON.stringify(nippleData?.direction)}
            </p>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default connect(() => ({}))(ControlBox);
