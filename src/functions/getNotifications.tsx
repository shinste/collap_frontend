import React, { useState, useContext, useEffect } from 'react';

const getNotifications = async (setEventData: React.Dispatch<React.SetStateAction<any>>, setErrorMessage: React.Dispatch<React.SetStateAction<string>>, storedUsername: string, missed?: React.Dispatch<React.SetStateAction<string>>, action?: React.Dispatch<React.SetStateAction<string>>) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/notification/?username=${encodeURIComponent(storedUsername)}`);
        if (response.ok) {
            const eventData = await response.json();
            setEventData(eventData); // Update state with fetched data
            if (missed) {
                for (const key in eventData) {
                    if (!eventData[key].notification.includes("You have been invited") && !eventData[key].notification.includes("You must vote")) {
                        missed(key);
                        break
                    }
                }
            }
            if (action) {
                for (const key in eventData) {
                    if (eventData[key].notification.includes("You have been invited") || eventData[key].notification.includes("You must vote")) {
                        action(key);
                        console.log(key);
                        break
                    }
                }
            }

            console.log('Query Successful', eventData);
        } else {
            const errorData = await response.json();
            const errorMessage = errorData.error[0];
            setErrorMessage(errorMessage); // Update state with error message
            console.error('Failed to Query', errorMessage);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

export default getNotifications