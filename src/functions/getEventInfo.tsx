import React from 'react';
import getApi from './getApi';

const getEventInfo = async (setEventData: React.Dispatch<React.SetStateAction<any>>, event_id: string) => {
  try {
    const response = await getApi(`event/get_info/?event_id=${encodeURIComponent(event_id)}`);
    if (response.ok) {
      const fetchedEventData = await response.json();
      setEventData(fetchedEventData); // Update state with fetched data
      console.log('Query Successful', fetchedEventData);
    } else {
      const errorData = await response.json();
      const errorMessage = errorData.error[0];
      console.error('Failed to Query', errorMessage);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export default getEventInfo;
