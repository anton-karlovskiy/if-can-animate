import React, { Fragment } from "react";
import { Checkbox } from "antd";

const ToggleCheckbox = ({ label, toggle }) => {
  const toggleHandler = event => {
    toggle(event.target.checked);
  };
  return (
    <Fragment>
      <span className='label'>{label}</span>
      <Checkbox onChange={toggleHandler} />
    </Fragment>
  );
}

export default ToggleCheckbox;