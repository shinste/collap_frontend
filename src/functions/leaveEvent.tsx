import React from 'react';


const LeaveEvent = async (event_id: String, username: string, name: String, setError: React.Dispatch<React.SetStateAction<any>>) => {
    try {
      const leaveData = {
        username: username,
        event_id: event_id
      }
      const response = await fetch('http://127.0.0.1:8000/event/leave/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leaveData),
      });

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