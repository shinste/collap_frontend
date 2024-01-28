import React, { useState, useEffect} from 'react';
import { FormControl, Button, Typography } from "@mui/material";
import DynamicInput from './DynamicInput';
import getEventInfo from '../functions/getEventInfo';
import formatTimeRange from '../functions/getTimeRange';
import getDate from '../functions/getDate';
import postApi from '../functions/postApi';

interface JoinProps {
    key: number;
    eventInfo: any;
    status: React.Dispatch<React.SetStateAction<string>>;
};

const JoinPanel = ({ key, eventInfo, status }: JoinProps) => {

    type MyEvent = {
        end: string;
        event_id: string;
        host_id: string;
        name: string;
        primary_date: string;
        primary_end: string;
        start: string;
        participants: string[];
    };

    interface Item {
        value: string | Date;
    }

    const [previewData, setPreviewData] = useState<Record<string, MyEvent>>({}); // Use the EventData type
    const [dates, setDates] = useState<Item[]>([]);
    const availability = dates.map(dates => dates.value)
    const [error, setError] = useState('');


    const eventData = {
        event_id: eventInfo.event_id_id,
        username: eventInfo.username_id,
        date: availability
    }


    const handleJoin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        status('');
        try {
            const response = await postApi('event/join/', eventData);
            if (response.ok) {
            const data = await response.json();
            console.log('Event Joined:', data);
            setError('');
            status('joined event successfully' + eventInfo.username)
            } else {
                const errorData = await response.json();
                const message = errorData.error
                if (typeof message != "string") {
                    const message2 = Object.values(message)[0]
                    setError(String(message2))
                } else{
                    setError(message)
                }
                
                console.error('Failed to join event:', message);
            }
        } catch (errors) {
            console.error('Error:', errors);
            setError('Invalid Request');
        }
    };
    
    useEffect(() => {
        getEventInfo(setPreviewData, eventInfo.event_id_id);
    }, []);
    console.log(previewData)

    if (!Object.keys(previewData).length) {
        return <div>Loading...</div>;
    }
    return (
        <div style={{height: '60%'}}>
            <div className='mt-5'>
                <h3>Event Information [{String(previewData["name"])}]</h3>
                <Typography variant='h6'>
                    Current Primary Date: {getDate(String(previewData["primary_date"]))} - {getDate(String(previewData["primary_end"]))}
                </Typography>
                <Typography variant='h6'>
                    Current Primary Time: {formatTimeRange(String(previewData["start"]), String(previewData["end"]))}
                </Typography>
                <Typography variant='h6'>
                    Participants: {String(previewData["participants"])}
                </Typography>
            </div>
            <div className='relative-center'>
                <div className='mt-2'>
                    <h3>Availability</h3>
                </div>
                <div>
                    <Typography className="mb-1" variant='subtitle2'>To join this event you must provide available days where you can attend at the TIME provided above (Press Enter)</Typography>
                </div>
                <div>
                    <DynamicInput data={dates} setData={setDates} inputType="YYYY-MM-DD" />
                        <FormControl>
                            <form onSubmit={handleJoin}>
                                {error && <Typography variant="body1" sx={{ color: 'red' }}>{error}</Typography>}
                                <Button className="center" variant="contained" type="submit" color="primary" style={{backgroundColor: "#87976E"}} sx={{ borderRadius: "15px", mt: 2 }}>
                                    Join
                                </Button>
                            </form>
                        </FormControl>
                </div>
            </div>
        </div>
    )
}

export default JoinPanel