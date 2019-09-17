
import React from 'react';
import { Button, Icon, Input, Dropdown, Menu, Switch } from 'antd';

import './header.css';

const Header = ({
  shuffle,
  search,
  setColumns,
  setMargin,
  setHeight,
  columns,
  margin
}) => {
  return (
    <div className="header">
      <Button type="primary" onClick={shuffle}>
        Shuffle
      </Button>
      <Input
        style={{marginLeft: 15, minWidth: 130, maxWidth: 300}}
        suffix={<Icon type="search" style={{color: 'rgba(0,0,0,.25)'}} />}
        placeholder="input search text"
        onChange={search} />
      <Dropdown
        trigger={['click']}
        overlay={
          <Menu onClick={setColumns}>
            { [1, 2, 3, 4, 5, 6].map(element => (<Menu.Item key={element}>{element}</Menu.Item>)) }
          </Menu>
        }>
        <Button style={{marginLeft: 15, minWidth: 130}}>
          {columns} Columns <Icon type="down" />
        </Button>
      </Dropdown>
      <Dropdown
        trigger={['click']}
        overlay={
          <Menu onClick={setMargin}>
            { [0, 20, 40, 70].map(element => (<Menu.Item key={element}>{element}</Menu.Item>)) }
          </Menu>
        }>
        <Button style={{marginLeft: 15, minWidth: 130}}>
          {margin} px margin <Icon type="down" />
        </Button>
      </Dropdown>
      <span style={{marginLeft: 15}}>Individual height</span>
      <Switch style={{marginLeft: 15}} defaultChecked onChange={setHeight} />
    </div>
  )
};

export default Header;
