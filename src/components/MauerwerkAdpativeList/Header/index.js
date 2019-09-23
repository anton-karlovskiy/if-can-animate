
import React, { Fragment } from 'react';
import { 
  Button, 
  Icon, 
  Input, 
  Dropdown, 
  Menu,
  Typography,
  Row,
  Col,
  Statistic,
  Divider
  } from 'antd';

import { useMemoryStatus } from '../../../utils/hooks';

import './header.css';

import Toggle from '../../../components/Toggle';
import ToggleCheckbox from '../../../components/Checkbox';

const MemoryStatus = () => {
  const memoryStatus = useMemoryStatus();
  if (!memoryStatus) return <Fragment>Loading...</Fragment>;

  const {
    totalJSHeapSize,
    usedJSHeapSize,
    jsHeapSizeLimit,
    deviceMemory,
    overLoaded,
    unsupportMessage
  } = memoryStatus;

  const { Text } = Typography;

  return (    
    <Row
        type='flex'
        justify='space-between'
        align='middle'
        className='controls'
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      { unsupportMessage ? (
        <Text>{unsupportMessage}</Text>
      ) : (
        
        <Fragment>
          <Divider>MemoryHeapSize</Divider>
          <Col className='status' md={12} lg={4}>
            <Statistic title="Total(Byte)" value={totalJSHeapSize} />
          </Col>
          <Col className='status' md={12} lg={4}>
            <Statistic title="UsedByte)" value={usedJSHeapSize} />
          </Col>
          <Col className='status' md={12} lg={4}>
            <Statistic title="Limit(Byte)" value={jsHeapSizeLimit} />
          </Col>
          <Col className='status' md={12} lg={4}>
            <Statistic title="DeviceMemory(GByte)" value={deviceMemory}  precision={2}/>
          </Col>
          <Col className='status' md={12} lg={4}>
            <Statistic title="Is Memory overLoaded?" value={overLoaded ? 'Yes' : 'No'} />
          </Col>

        </Fragment>
      ) }
    </Row>
  );
};

const Header = ({
  shuffle,
  search,
  setColumns,
  setMargin,
  setHeight,
  columns,
  margin,
  manualAnimationTest,
  checkManualAnimationTest,
  toggleManualAnimationTest
}) => {
  return (
    <div className='header'>
      <Row
        type='flex'
        justify='space-between'
        align='middle'
        className='control'
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className='control' md={12} lg={4}>          
          <Button type='primary' onClick={shuffle} block>
            Shuffle
          </Button>
        </Col>
        <Col className='control' md={12} lg={4}>
          <Input
            suffix={<Icon type='search' style={{color: 'rgba(0,0,0,.25)'}} />}
            placeholder='input search text'
            onChange={search} />
        </Col>
        <Col className='control' md={12} lg={4}>
          <Dropdown
            trigger={['click']}
            overlay={
              <Menu onClick={setColumns}>
                { [1, 2, 3, 4, 5, 6].map(element => (<Menu.Item key={element}>{element}</Menu.Item>)) }
              </Menu>
            }>
            <Button block>
              {columns} Columns <Icon type='down' />
            </Button>
          </Dropdown>
        </Col>
        <Col className='control' md={12} lg={4}>
          <Dropdown
            trigger={['click']}
            overlay={
              <Menu onClick={setMargin}>
                { [0, 20, 40, 70].map(element => (<Menu.Item key={element}>{element}</Menu.Item>)) }
              </Menu>
            }>
            <Button block>
              {margin} px margin <Icon type='down' />
            </Button>
          </Dropdown>
        </Col>
        <Col className='control' md={12} lg={4}>
          <Toggle label='Cell Height' defaultChecked onChange={setHeight} />
        </Col>
      </Row>
      <div className='animation-setting'>
        <fieldset className='scheduler-border'>
          <legend className='scheduler-border'>Manual Animation Test</legend>
          <div className='control-group'>
              <div className='controls bootstrap-timepicker'>
                  <Toggle label='Animation/Simple' disabled={!manualAnimationTest} defaultChecked onChange={toggleManualAnimationTest} />
                  <ToggleCheckbox label='On/Off' toggle={checkManualAnimationTest} />
              </div>
          </div>
        </fieldset>
      </div>
      <MemoryStatus />
    </div>
  )
};

export default Header;