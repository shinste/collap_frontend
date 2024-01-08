import React from 'react';

const getEvents = async (setEventData: React.Dispatch<React.SetStateAction<any>>, storedUsername: string) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/event/view/?username=${encodeURIComponent(storedUsername)}`);
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

export default getEvents;
