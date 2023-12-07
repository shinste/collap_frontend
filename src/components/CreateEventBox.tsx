import Chip from '@mui/material/Chip';
import { Box, FormControl, TextField, Button, Typography } from "@mui/material";
import { useRef, useState } from "react";

interface Item {
  value: string | Date;
}

interface DynamicInputProps {
  data: Item[];
  setData: React.Dispatch<React.SetStateAction<Item[]>>;
  inputType: string;
}

const InputItem = ({ data, setData }: { data: Item, setData: React.Dispatch<React.SetStateAction<Item[]>> }) => {
  const handleDelete = () => {
    setData((prevData) => prevData.filter((item) => item !== data));
  };

  return (
    <Chip
      label={data.value.toString()} // Assuming data.value is convertible to string
      sx={{
        cursor: "pointer",
        margin: "0.5rem 0.5rem 0 0",
      }}
      onDelete={handleDelete}
    />
  );
};

const DynamicInput = ({ data, setData, inputType }: DynamicInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCreate = (item: string | Date) => {
    setData((prevData) => [...prevData, { value: item }]);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current?.value) {
      handleCreate(inputRef.current.value as string | Date);
      inputRef.current.value = "";
    }
  };

  return (
    <div>
      <Box >
        <FormControl>
          <form onSubmit={handleOnSubmit}>
            <TextField
                sx={{width:'100%'}}
              inputRef={inputRef}
              size='small'
              margin='none'
              placeholder={inputType}
            />
          </form>
          <div>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', margin: '0.5rem 0' }}>
                {data.map((item, index) => (
                <InputItem data={item} setData={setData} key={index} />
                ))}
            </Box>
          </div>
            
        </FormControl>
      </Box>
    </div>
  );
};

const TagInput = () => {
  const [users, setUsers] = useState<Item[]>([]);
  const [dates, setDates] = useState<Item[]>([]);
  const [name, setName] = useState('');
  const [primary, setPrimary] = useState('');
  const [error, setError] = useState('');

  const handleEventName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePrimary = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrimary(e.target.value);
  }; 

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const usernames = users.map(users => users.value);
    const availability = dates.map(dates => dates.value)
    const eventData = {
        event: {
            name: name,
            host: localStorage.getItem('username'),
            primary_date: primary
          },
          user: usernames,
          date: availability
    }
    try {
        const response = await fetch('http://127.0.0.1:8000/event/create/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventData),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log('User created:', data);
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
            
            // setError(message)
            console.error('Failed to create user:', message);
        }
      } catch (errors) {
        console.error('Error:', errors);
        // setSuccess(false)
        setError('Invalid Request');
      }
    //   console.log(JSON.stringify(eventData, null, 2));
    };
    


  return (
    <div className='center-content'>
        <div className='m-5'>
            <h1> Create an Event</h1>
        </div>
        
        <div className="mb-3">
            <h3>Event Name</h3>
            <TextField size='small' sx={{width:"30%"}} onChange={handleEventName} placeholder='Name of Event'/>      
        </div>
        <div className='m-3'>
            <div>
                <h3>Primary Date</h3>
            </div>
            <div>
                <Typography variant='subtitle2'>Your event will be hosted on this day until you (the host) update it</Typography>
            </div>
            <TextField sx={{width:"30%"}} onChange={handlePrimary} size='small' placeholder='YYYY-MM-DD'/>
        </div>
           

        <div className='m-3'>
            <div>
                <h3>Invite Others</h3>
            </div>
            <div>
                <Typography variant='subtitle2'>These users will be invited once the event is created You may invite users later if needed (Press Enter)</Typography>
            </div>
            <DynamicInput data={users} setData={setUsers} inputType="Invite Users" />
        </div>      
        

        <div className='m-3'>
            <div>
                <h3>Availability</h3>
            </div>
            <div>
                <Typography variant='subtitle2'>List Available times near the Primary Date so you can figure out what works best among users (Press Enter)</Typography>
            </div>
            <DynamicInput data={dates} setData={setDates} inputType="YYYY-MM-DD" />
        </div>  
        

        <div>
            <FormControl>
            <form onSubmit={handleCreate}>
                    {error && <Typography variant="body1" sx={{ color: 'red' }}>{error}</Typography>}
                    <Button className="center" variant="contained" type="submit" color="primary" style={{backgroundColor: "#87976E"}} sx={{ borderRadius: "15px", mt: 2 }}>
                            Create Event
                    </Button>
                </form>
            </FormControl>
        </div>
    </div>
  );

};

// Example usage for Dates

export default TagInput;
