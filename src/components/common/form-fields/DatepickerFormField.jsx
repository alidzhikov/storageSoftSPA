import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
 
const DatePickerField = ({ value, name, placeholder, onChange }) => {
  return (
    <DatePicker
      selected={(value && new Date(value)) || null}
      dateFormat="dd.MM.yyyy г."
      onChange={val => {
        onChange(name, val);
      }}
      placeholderText={placeholder}
      className="form-control"
    />
  );
};

export default DatePickerField;