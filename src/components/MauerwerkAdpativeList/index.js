
import React, { useState } from 'react'
import { Grid, Slug, Fade } from 'mauerwerk'
import { Icon } from 'antd'
import 'antd/dist/antd.css'
import lodash from 'lodash'

import data from './data'
import Header from './Header'
import './mauerwerk-adpative-list.css'

const Cell = ({ toggle, name, description, css, maximized }) => (
  <div
    className="cell"
    style={{backgroundImage: css, cursor: !maximized ? 'pointer' : 'auto'}}
    onClick={!maximized ? toggle : undefined}>
    <Fade show={maximized} delay={maximized ? 400 : 0}>
      <div className="details">
        <Slug delay={600}>
          <div className="circle" style={{background: css}} />
          <div className="close">
            <Icon type="close" style={{cursor: 'pointer'}} onClick={toggle} />
          </div>
          <h1>{name}</h1>
          <p>{description}</p>
        </Slug>
      </div>
    </Fade>
    <Fade
      show={!maximized}
      from={{opacity: 0, transform: 'translate3d(0,140px,0)'}}
      enter={{opacity: 1, transform: 'translate3d(0,0px,0)'}}
      leave={{opacity: 0, transform: 'translate3d(0,-50px,0)'}}
      delay={maximized ? 0 : 400}>
      <div className="default">{name}</div>
    </Fade>
  </div>
);

const MauerwerkAdpativeList = () => {
  const [listData, setListData] = useState(data);
  const [columns, setColumns] = useState(2);
  const [margin, setMargin] = useState(70);
  const [filter, setFilter] = useState('');
  const [height, setHeight] = useState(true);

  const searchHandler = event => setFilter(event.target.value);
  const shuffleHandler = () => setListData(lodash.shuffle(listData));
  const changeColumnsHandler = event => setColumns(parseInt(event.key));
  const changeMarginHandler = event => setMargin(parseInt(event.key));
  const changeHeightHandler = event => setHeight(event);

  const filteredListData = listData.filter(
    listItem => listItem.name.toLowerCase().includes(filter)
  );

  return (
    <div className="main">
      <Header
        columns={columns}
        margin={margin}
        search={searchHandler}
        shuffle={shuffleHandler}
        setColumns={changeColumnsHandler}
        setMargin={changeMarginHandler}
        setHeight={changeHeightHandler} />
      <Grid
        className="grid"
        // Arbitrary data, should contain keys, possibly heights, etc.
        data={filteredListData}
        // Key accessor, instructs grid on how to fet individual keys from the data set
        keys={item => item.name}
        // Can be a fixed value or an individual data accessor
        heights={height ? item => item.height : 200}
        // Number of columns
        columns={columns}
        // Space between elements
        margin={margin}
        // Removes the possibility to scroll away from a maximized element
        lockScroll={false}
        // Delay when active elements (blown up) are minimized again
        closeDelay={400}>
        { (data, maximized, toggle) => (
          <Cell {...data} maximized={maximized} toggle={toggle} />
        ) }
      </Grid>
    </div>
  );
};

export default MauerwerkAdpativeList;
