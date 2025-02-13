import React, { useState } from 'react';
import axios from 'axios';


const SettingsPage = () => {
  const [accessKey, setAccessKey] = useState('');
  const [secretKey, setSecretsKey] = useState('');
  const [region, setRegion] = useState('');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
 
    setLoading(true);

    const token = localStorage.getItem('token');
    console.log("Token being sent in request:", token); 

    if (!token) {
        console.error('No token found');
        return;
    }


    try {
      const response = await axios.post(
      "http://localhost:3000/api/lambda/credentials",
      {
        accessKey, 
        secretKey, 
        region
      },
      {
        headers: {
          "Content-Type": "application/json", // ✅ Ensure correct content type
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    console.log("Response:", response.data);
      setSaved(true);
      setAccessKey('');
      setSecretsKey('');
      setRegion('');
    } catch (error) {
      console.error('Error saving settings', error);
    } finally {
      setLoading(false); 
    }
  
  };
  const awsRegions = [
    { value: 'us-east-2', label: 'US East (Ohio)' },
    { value: 'us-east-1', label: 'US East (N. Virginia)' },
    { value: 'us-west-1', label: 'US West (N. California)' },
    { value: 'us-west-2', label: 'US West (Oregon)' },
    { value: 'af-south-1', label: 'Africa (Cape Town)' },
    { value: 'ap-east-1', label: 'Asia Pacific (Hong Kong)' },
    { value: 'ap-south-2', label: 'Asia Pacific (Hyderabad)' },
    { value: 'ap-southeast-3', label: 'Asia Pacific (Jakarta)' },
    { value: 'ap-southeast-5', label: 'Asia Pacific (Malaysia)' },
    { value: 'ap-southeast-4', label: 'Asia Pacific (Melbourne)' },
    { value: 'ap-south-1', label: 'Asia Pacific (Mumbai)' },
    { value: 'ap-northeast-3', label: 'Asia Pacific (Osaka)' },
    { value: 'ap-northeast-2', label: 'Asia Pacific (Seoul)' },
    { value: 'ap-southeast-1', label: 'Asia Pacific (Singapore)' },
    { value: 'ap-southeast-2', label: 'Asia Pacific (Sydney)' },
    { value: 'ap-southeast-7', label: 'Asia Pacific (Thailand)' },
    { value: 'ap-northeast-1', label: 'Asia Pacific (Tokyo)' },
    { value: 'ca-central-1', label: 'Canada (Central)' },
    { value: 'ca-west-1', label: 'Canada West (Calgary)' },
    { value: 'eu-central-1', label: 'Europe (Frankfurt)' },
    { value: 'eu-west-1', label: 'Europe (Ireland)' },
    { value: 'eu-west-2', label: 'Europe (London)' },
    { value: 'eu-south-1', label: 'Europe (Milan)' },
    { value: 'eu-west-3', label: 'Europe (Paris)' },
    { value: 'eu-south-2', label: 'Europe (Spain)' },
    { value: 'eu-north-1', label: 'Europe (Stockholm)' },
    { value: 'eu-central-2', label: 'Europe (Zurich)' },
    { value: 'il-central-1', label: 'Israel (Tel Aviv)' },
    { value: 'mx-central-1', label: 'Mexico (Central)' },
    { value: 'me-south-1', label: 'Middle East (Bahrain)' },
    { value: 'me-central-1', label: 'Middle East (UAE)' },
    { value: 'sa-east-1', label: 'South America (São Paulo)' },
    { value: 'us-gov-east-1', label: 'AWS GovCloud (US-East)' },
    { value: 'us-gov-west-1', label: 'AWS GovCloud (US-West)' },
  ];

  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-sm'>
        <h1 className='text-2xl font-bold text-center mb-4'>Settings</h1>
        <p className='text-center text-gray-700 mb-6'> Input AWS credentials</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Region:
            </label>
           
            <select
              id='region'
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
              required
            >
              <option value='' disabled>
                Select a Region
              </option>
              {awsRegions.map((region) => (
                <option key={region.value} value={region.value}>
                  {region.label}
                </option>
              ))}
            </select>
          </div>
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
            disabled={loading} // Disable the button while loading
          >
            {loading ? 'Saving...' : 'Save Changes'}
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
