import React, {useState, useEffect} from 'react';
import { Box, Typography, MenuItem, Checkbox, Menu, FormGroup,
    FormControlLabel, Button, InputLabel} from '@mui/material'
import getDate from '../functions/getDate';
import getTimeRange from '../functions/getTimeRange'
import Select from '@mui/material/Select';
import { SingleInputTimeRangeField } from '@mui/x-date-pickers-pro/SingleInputTimeRangeField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import postApi from '../functions/postApi';
import dayjs from 'dayjs';
import { start } from 'repl';

  

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
    const [addDate, setAddDate] = useState('');
    const [startTime, setStartTime] = useState(hostData.start);    
    const [endTime, setEndTime] = useState(hostData.end);
    // For Primary Change

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
            primary: primaryDate,
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
            } else {
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
            // setSuccess(false)
            setError('Invalid Request');
          }
    }

    // For Possible Dates
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
            if (checked) {
                setCheckedItems((prevItems) => [...prevItems, value]);
            } else {
                setCheckedItems((prevItems) => prevItems.filter((item) => item !== value));
        }
    }

    const handleDate = (date: any) => {
        setAddDate(date.$y + '-' + String(date.$M + 1) + '-' + date.$D)
    }

    const handleEdit = async (e: React.MouseEvent<HTMLButtonElement>, action: string) => {
        e.preventDefault();
        let dateData: {
            date: string[] | string;
            event_id: string; // Assuming event_id is a string
            action: string;
          } = {
            date: '',
            event_id: hostData.event_id,
            action: action
          };
        
          if (action === 'delete') {
            dateData.date = checkedItems; // Assuming checkedItems is a string[]
          } else {
            dateData.date = addDate;
          }
        console.log('button',addDate);
        try {
            const response = await postApi('event/edit_date/', dateData);
            if (response.ok) {
              const data = await response.json();
              console.log('Edit Made:', data);
              setStatus(!status);
              setCheckedItems([]);
            } else {
                const errorData = await response.json();
                const message = errorData.error
                if (typeof message != "string") {
                    const message2 = Object.values(message)[0]
                    setError(String(message2))
                } else{
                    setError(message)
                }
                console.error('Failed to update:', message);
            }
          } catch (errors) {
            console.error('Error:', errors);
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
                        {error && <Typography color={'red'} style={{width: '15rem', fontSize:'10px'}}>{error}</Typography>}
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
                
                {/* <div className='vertical-flex' style={{height: '5rem'}}>
                    <Typography variant='h6'>
                        Start: 
                    </Typography>
                    <Typography>
                        {getDate(hostData.primary_date)} {getTimeRange(hostData.start, hostData.end, 'start')}
                    </Typography>
                    <Typography variant='h6'>
                        End: 
                    </Typography>
                    <Typography>
                        {getDate(hostData.primary_end)} {getTimeRange(hostData.start, hostData.end, 'end')}
                    </Typography>
                </div> */}
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
                                <MenuItem value={String(value)}>{getDate(String(value))}</MenuItem>
                            ))}
                            </Select>
                        </Box> */}
                        {/* <Typography>Optional Change</Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer
                                sx={{height:'100%'}}
                                components={['SingleInputTimeRangeField', 'DatePicker']}
                            >
                                <Box >
                                    <DatePicker
                                        label="End Date"
                                        sx={{"& input": {
                                            height: '20px ', // Adjust the height as needed
                                            padding: 2
                                          }}}
                                        onChange={(value) => {setPrimaryEnd(value)}} // Handle date change
                                    />
                                </Box>
                                <Box sx={{width: '100%'}}>
                                    <SingleInputTimeRangeField 
                                        sx={{"& input": {
                                            height: '15px ', // Adjust the height as needed
                                            padding: 2
                                          }}}
                                        onChange={(value) => {handleTime(value)}}
                                        size="small"
                                        label="From - To" />
                                </Box>
                            </DemoContainer>
                        </LocalizationProvider> */}
                
            </div>
            <div>
            <Button className='horizontal-center'onClick={handleChange} style={{width: '15rem', color: 'green'}}>Confirm Changes</Button>
            </div>
            
            
                
                
            {/* <Box sx={{width: '35%'}}>
                <Typography variant='h6' sx={{marginBottom: 1}}>
                    Available Dates
                </Typography>
                <Typography variant='subtitle2'>THESE ARE VOTING OPTIONS</Typography>
                <Box className='scrollable-box' sx={{height:'33%', width: '100%', alignContent: 'center'}}>
                    <FormGroup>
                        {Object.entries(hostData.dates).map(([key, value]) => {
                            if (value === hostData.primary_date) {
                                return(<FormControlLabel disabled control={<Checkbox />} value={value} label={getDate(String(value))} sx={{textAlign:'left'}} />)
                            } else {
                                return(<FormControlLabel
                                    control={<Checkbox onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                      handleCheckboxChange(e);
                                    }} />}
                                    value={value}
                                    label={getDate(String(value))}
                                    checked={checkedItems.includes(String(value))}
                                    sx={{textAlign:'left'}}
                                  />)
                            }
                        })}
                    </FormGroup>
                </Box>
                <Button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleEdit(e, 'delete')}>
                    Delete Dates
                </Button>
                <Typography>Add New Dates</Typography>
                
                <Box sx={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="New Date"
                            sx={{"& input": {
                                height: '20px ', // Adjust the height as needed
                                padding: 2
                              }}}
                            onChange={(value) => handleDate(value)} // Handle date change
                        />
                    </LocalizationProvider>
                    <Button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleEdit(e, 'add')}>Add Date</Button>
                </Box>
            </Box>   */}
        </div>
    );
}

export default HostDates;