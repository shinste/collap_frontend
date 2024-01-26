import React from 'react';
import postApi from './postApi';

const LeaveEvent = async (event_id: String, username: string, name: String, setError: React.Dispatch<React.SetStateAction<any>>) => {
    try {
      const leaveData = {
        username: username,
        event_id: event_id
      }
      const response = await postApi('event/leave/', leaveData);
      if (response.ok) {
        const data = await response.json();
        console.log('Event Left:', data);
      //   setSuccess(true)
        setError('')
      } else {
          const errorData = await response.json();
          const message = errorData.error
          if (typeof message != "string") {
              const message2 = Object.values(message)[0]
              setError(String(message2))
          } else{
              setError(message)
          }
          console.error('Failed to delete user:', message);
      }
    } catch (errors) {
      console.error('Error:', errors);
      setError('Invalid Request');
    }
  };

  export default LeaveEvent;