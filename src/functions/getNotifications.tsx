import React from 'react';
import getApi from './getApi';

const getNotifications = async (setEventData: React.Dispatch<React.SetStateAction<any>>, storedUsername: string, setErrorMessage?: React.Dispatch<React.SetStateAction<string>>, missed?: React.Dispatch<React.SetStateAction<string>>, action?: React.Dispatch<React.SetStateAction<string>>) => {
    try {
        const response = await getApi(`notification/?username=${encodeURIComponent(storedUsername)}`);
        if (response.ok) { 
            const eventData = await response.json();
            setEventData(eventData);
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
            if (setErrorMessage) {
                setErrorMessage(errorMessage);
            }
            console.error('Failed to Query', errorMessage);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

export default getNotifications