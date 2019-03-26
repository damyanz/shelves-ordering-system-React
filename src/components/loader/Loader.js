import React from "react";
import "./loader.scss";
const Loader = () => {
  return (
    <div className="rollerBg">
      <div className="rollerRow">
        <div className="lds-roller">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    </div>
  );
};

export default Loader;
