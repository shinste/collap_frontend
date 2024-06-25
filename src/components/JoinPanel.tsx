import React, { useState, useEffect} from 'react';
import { FormControl, Button, Typography, Divider} from "@mui/material";
import DynamicInput from './DynamicInput';
import getEventInfo from '../functions/getEventInfo';
import formatTimeRange from '../functions/getTimeRange';
import getDate from '../functions/getDate';
import postApi from '../functions/postApi';
import Clock from '../images/Clock.png';
import People from '../images/People.png';
import Date from '../images/Date.png';


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
            <div className='mt-3'>
                <h2>Event Information <span style={{fontWeight: 'bold'}}>[{String(previewData["name"])}]</span></h2>
                <div id="Join-info-div">
                    <Divider />
                    <div className='Join-info'>
                        <img src={Date} height='30px' style={{marginRight: '10px'}} alt=""/>
                        <h4>
                            Current Primary Date: {getDate(String(previewData["primary_date"]))} - {getDate(String(previewData["primary_end"]))}
                        </h4>  
                    </div>
                    <Divider/>
                    <div className='Join-info'>
                        <img src={Clock} height='30px' style={{marginRight: '10px'}} alt=""/>
                        <h4>
                            Current Primary Time: {formatTimeRange(String(previewData["start"]), String(previewData["end"]))}
                        </h4>
                    </div>
                    <Divider/>
                    <div className='Join-info'>
                        <img src={People} height='30px' style={{marginRight: '10px'}} alt=""/>
                        <h4>
                            Participants: {String(previewData["participants"])}
                        </h4>  
                    </div>
                    <Divider/>
                </div>
                
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