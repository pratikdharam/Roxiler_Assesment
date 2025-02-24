import React from 'react';

const MonthSelector = ({ selectedMonth, onChange }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="mb-6">
      <label htmlFor="month-select" className="block text-sm font-medium text-gray-700 mb-1">
        Select Month
      </label>
      <select
        id="month-select"
        value={selectedMonth}
        onChange={(e) => onChange(e.target.value)}
        className="select-field"
      >
        {months.map(month => (
          <option key={month} value={month.toLowerCase()}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthSelector;