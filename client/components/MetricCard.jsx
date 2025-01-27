import React from 'react';

const MetricCard = ({ title, metric, description }) => {
  return (
    <div className='bg-white rounded-lg w-1/5 shadow-xl p-5'>
      <p id='title' className='text-gray-500 text-base pt-4 pb-0 m-1'>
        {title}
      </p>
      <h1 className='text-3xl p-0 m-1'>{metric}</h1>
      <p id='description' className='text-gray-500 text-sm pb-4 m-0'>
        {' '}
        {description}
      </p>
    </div>
  );
};

export default MetricCard;
