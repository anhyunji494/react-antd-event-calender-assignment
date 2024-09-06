import React from 'react';
import { DatePicker } from 'antd';

const DatePickerComponent = ({ onDateChange, value }) => {
  const onChange = (date) => {
    onDateChange(date);
  };

  return (
    <DatePicker
      onChange={onChange}
      value={value}
      defaultValue={value}
      style={{ width: '100%' }}
    />
  );
};

export default DatePickerComponent;
