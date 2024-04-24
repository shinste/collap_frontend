import React, {useState} from 'react';
import { Box, Typography, Button} from '@mui/material'
import getDate from '../functions/getDate';
import getTimeRange from '../functions/getTimeRange'
import { SingleInputTimeRangeField } from '@mui/x-date-pickers-pro/SingleInputTimeRangeField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import postApi from '../functions/postApi';
import dayjs from 'dayjs';

  

interface HostDatesProps {
    hostData: any;
    status: boolean;
    setStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const HostDates: React.FunctionComponent<HostDatesProps> = ({ hostData, status, setStatus }) => {

    const [primaryDate, setPrimaryDate] = useState(hostData.primary_date);
    const [primaryEnd, setPrimaryEnd] = useState(hostData.primary_end); 
    const [checkedItems, setCheckedItems] = useState<string[]>([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [addDate, setAddDate] = useState('');
    const [startTime, setStartTime] = useState(hostData.start);    
    const [endTime, setEndTime] = useState(hostData.end);

    const handleTime = (value: any) => {

        if (value[0].$d) {
            setStartTime(String(value[0].$d).split(' ')[4])
        }
        if (value[1]) {
            setEndTime(String(value[1].$d).split(' ')[4])
        }
    }

    const shouldDisableDate = (date: Date | null | dayjs.Dayjs) => {
        const dateString = dayjs(date).format('YYYY-MM-DD');
        if (dateString !== hostData.primary_date && !hostData.dates.includes(dateString)) {
            return true;
        }
        return false
    };

    const handleChange = async () => {
        const changeData = {
            event_id: hostData.event_id,
            start: startTime,
            end: endTime,
            primary: primaryDate.$y + '-' + String(primaryDate.$M + 1) + '-' + primaryDate.$D,
            primary_end: primaryEnd.$y + '-' + String(primaryEnd.$M + 1) + '-' + primaryEnd.$D
        }
        if (!startTime) {
            changeData.start = hostData.start
        }
        if (!endTime) {
            changeData.end = hostData.end
        }
        if (isNaN(primaryEnd.$y) || isNaN(primaryEnd.$M) || isNaN(primaryEnd.$D)) {
            changeData.primary_end = hostData.primary_end
        }

        try {
            const response = await postApi('event/change_primary/', changeData);
            if (response.ok) {
              const data = await response.json();
              console.log('Primary Date Changed', data);
              console.log(changeData);
              setStatus(!status);
              setError('');
              setSuccess('Your event has been successfully changed!');
            } else {
                setSuccess('');
                const errorData = await response.json();
                const message = errorData.error
                if (typeof message != "string") {
                    const message2 = Object.values(message)[0]
                    setError(String(message2))
                } else{
                    setError(message)
                }
            } 
        }   catch (errors) {
            console.error('Error:', errors);
            setSuccess('');
            setError('Invalid Request');
          }
    }

    return (
        <div className="vertical-flex m-3">
            <Typography variant='h5' sx={{marginBottom: 1, textAlign: 'left'}}>
                Primary Date
            </Typography>
                    <Typography style={{fontWeight: 'bold'}}>
                        {getDate(hostData.primary_date)} {getTimeRange(hostData.start, hostData.end, 'start')} - {getDate(hostData.primary_end)} {getTimeRange(hostData.start, hostData.end, 'end')}
                    </Typography>
            <div className='flex-container' style={{justifyContent: 'space-evenly'}}>
                <div className='vertical-flex'>
                <Typography variant='h6'>Start</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                            sx={{height:'100%'}}
                            components={['SingleInputTimeRangeField', 'DatePicker']}
                        >
                            <Box >
                                <DatePicker
                                    label="Start Date"
                                    sx={{"& input": {
                                        height: '20px ',
                                        padding: 2
                                        },
                                        width: '13rem'}}
                                    
                                    value={dayjs(hostData.primary_date)}
                                    onChange={(value) => {
                                                          setSuccess('');
                                                          if (shouldDisableDate(value)) {
                                                            setError('Please only select dates that are chosen for this event. Update chosen dates below');
                                                          } else {
                                                            setError('');
                                                            setPrimaryDate(value);
                                                          }
                                    }}
                                    shouldDisableDate={shouldDisableDate}
                                />
                                {}
                            </Box>
                        </DemoContainer>
                        {error && <Typography color={'red'} style={{position: 'relative', width:'13rem', fontSize:'10px', margin: 0}}>{error}</Typography>}
                    </LocalizationProvider>
                    {/* <Typography>Start</Typography>
                    <Box>
                        <Select
                            sx={{borderRadius: '8px', width: '100%', height: '45px'}}
                            className='mt-1'
                            size='small'
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={primaryDate}
                            onChange={(event) => setPrimaryDate(event.target.value)}
                        >
                            {Object.entries(hostData.dates).map(([key, value]) => (
                                <MenuItem value={String(value)}>{<Typography style={{fontWeight: value === hostData.primary_date ? 'bold' : 'normal'}}>{getDate(String(value))}</Typography>}</MenuItem>
                            ))}
                        </Select>
                    </Box> */}
                </div>
                <div className='vertical-flex'>
                    <Typography variant='h6'>End</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer
                                sx={{height:'100%'}}
                                components={['SingleInputTimeRangeField', 'DatePicker']}
                            >
                                <Box >
                                    <DatePicker
                                        label="End Date"
                                        sx={{"& input": {
                                            height: '20px ',
                                            padding: 2
                                          },
                                          width: '13rem'}}
                                        value={dayjs(hostData.primary_end)}
                                        onChange={(value) => {setPrimaryEnd(value)}}
                                    />
                                </Box>
                            </DemoContainer>
                        </LocalizationProvider>
                </div>
                <div className='vertical-flex'>
                    <Typography variant='h6'>Time</Typography>
                    <div className='mt-2'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <SingleInputTimeRangeField 
                                sx={{"& input": {
                                    height: '20px ',
                                    padding: 2
                                    },
                                    width: '13rem'}}
                                onChange={(value) => handleTime(value)}
                                value={[dayjs(startTime, 'HH:mm:ss'), dayjs(endTime, 'HH:mm:ss')]}
                                size="small"
                                label="From - To" />
                        </LocalizationProvider>
                    </div>
                    
                </div>     
            </div>
            <div>
                {success && <Typography>{success}</Typography>}
                {!error && <Button className='horizontal-center'onClick={handleChange} variant='outlined' color='success' style={{width: '15rem', margin:4}}>Confirm Changes</Button>}
                
            </div>
        </div>
    );
}

export default HostDates;