import React, {useState, FC} from 'react';
import { Box, Typography, Checkbox, Menu, FormGroup,
	FormControlLabel, Button} from '@mui/material'
import getDate from '../functions/getDate';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import postApi from '../functions/postApi';

interface AvailableDatesProps {
	hostData: any;
	status: boolean;
	setStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const AvailableDates: FC<AvailableDatesProps> = ({ hostData, status, setStatus }) => {
	const [checkedItems, setCheckedItems] = useState<string[]>([]);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [addDate, setAddDate] = useState('');
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
			event_id: string;
			action: string;
		} = {
			date: '',
			event_id: hostData.event_id,
			action: action
		};
		
		if (action === 'delete') {
			dateData.date = checkedItems;
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
                setSuccess("Successfully updated dates");
                setError('');
				setCheckedItems([]);
			} else {
				const errorData = await response.json();
				const message = errorData.error
                setSuccess('');
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
            setSuccess('');
		}
	}
	return (
		<div className="horizontal-center" style={{width: '10rem'}}>
			<Typography variant='h6' sx={{marginBottom: 1}}>
				Available Dates
			</Typography>
			<Typography variant='subtitle2'>THESE ARE VOTING OPTIONS</Typography>
			<Box className='scrollable-box' sx={{height:'7rem', width: '100%', alignContent: 'center'}}>
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
            {error && <Typography sx={{color: 'red', fontWeight: 'bold'}}>{error}</Typography>}
			{success && <Typography sx={{color: 'green', fontWeight: 'bold'}}>{success}</Typography>}
			<Box sx={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker
						label="New Date"
						sx={{"& input": {
							height: '20px ',
							padding: 2
						}}}
						onChange={(value) => handleDate(value)}
					/>
				</LocalizationProvider>
				<Button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleEdit(e, 'add')}>Add Date</Button>
			</Box>
		</div>
	);
}

export default AvailableDates;
