import React from "react";
const Select = ({ minAmount, maxAmount, onChange }) => {
  let options = [];
  for (let i = minAmount; i <= maxAmount; i++) {
    options.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }
  return (
    <select className="select" onChange={onChange}>
      {options}
    </select>
  );
};

export default Select;
