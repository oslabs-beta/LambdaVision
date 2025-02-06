import React, { useState } from 'react';

const SettingsPage = () => {
  const [accessKey, setAccessKey] = useState('');
  const [secretKey, setSecretsKey] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    //send it to API
    setSaved(true);
  };
  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-sm'>
        <h1 className='text-2xl font-bold text-center mb-4'>Settings</h1>
        <p className='text-center text-gray-700 mb-6'> Input AWS credentials</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Access Key:
            </label>
            <input
              type='text'
              id='accessKey'
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
              required
            />
          </div>
          <div className=' mb-6'>
            <label className='block text-sm font-medium text-gray-700'>
              Secret Key:
            </label>
            <input
              type='text'
              id='secretKey'
              value={secretKey}
              onChange={(e) => setSecretsKey(e.target.value)}
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-gray-800 text-white p-2 rounded-md hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400'
          >
            Save Changes
          </button>
        </form>

        {saved && (
          <p className='text-center text-green-500 mt-4'>
            Settings have been saved!
          </p>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
