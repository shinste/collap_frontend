import React, { useState, useEffect } from 'react';
import { Typography, List } from '@mui/material'
import getDate from '../functions/getDate';
import getApi from '../functions/getApi';

interface RankedDateProp {
    event_id: string;
}

const RankDates: React.FunctionComponent<RankedDateProp> = ({event_id}) => {
    const [rankedData, setRankedData] = useState<Record<string, string[]>>({});

    const retrieve = async () => {

        try {
            const response = await getApi(`ranked/?event_id=${encodeURIComponent(event_id)}`);
            if (response.ok) {
            const fetchedRankData = await response.json();
            setRankedData(fetchedRankData); // Update state with fetched data
            } else {
            const errorData = await response.json();
            const errorMessage = errorData.error[0];
            console.error('Failed to Query', errorMessage);
            }
        } catch (error) {
            console.error('Error:', error);
            }
        }
    
        useEffect(() => {
            retrieve();
            
        }, []);
    if (!rankedData) {
        return <Typography>loading</Typography>;
    }
    return (
        <div>
            <Typography variant='h6'>Recommended Dates</Typography>
            <div className='vertical-flex' style={{height: '150px', overflowY:'auto'}}>
            <List>
                {Object.entries(rankedData).map(([key, value]) => (
                    <div className='vertical-flex my-2'>
                        <Typography> {getDate(key)}</Typography>
                        {value.length === 0 ? (<Typography sx={{fontSize:10, color: 'green'}}>All Participants Available</Typography>) : 
                        (<Typography sx={{fontSize:10, color: 'red'}}>Unavailable Users: {value.join(', ')}</Typography>)}
                    </div>
                        
                    ))}
                </List>
            </div>
        </div>
        
    );

}

export default RankDates;