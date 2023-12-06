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
      <Box>
        <FormControl>
          <form onSubmit={handleOnSubmit}>
            <TextField
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
  const [tags, setTags] = useState<Item[]>([]);
  const [dates, setDates] = useState<Item[]>([]);
  const [name, setName] = useState('');
  const [primary, setPrimary] = useState('');

  const handleEventName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePrimary = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrimary(e.target.value);
  }; 

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({tags},{dates})
  }

  return (
    <div>
        <div>
            <h3>Event Name</h3>
            <TextField size='small' onChange={handleEventName} placeholder='Name of Event'/>      
        </div>
        <div className='justify-content-center"'>
            <div>
                <h3>Primary Date</h3>
            </div>
            <div>
                <Typography onChange={handlePrimary} variant='subtitle2'>Your event will be hosted on this day until you (the host) update it</Typography>
            </div>
        </div>
        <TextField size='small' placeholder='Primary Date'/>   

        <div className='justify-content-center"'>
            <div>
                <h3>Invite Others</h3>
            </div>
            <div>
                <Typography variant='subtitle2'>These users will be invited once the event is created | You may invite users later if needed</Typography>
            </div>
        </div>      
        <DynamicInput data={tags} setData={setTags} inputType="Invite Users" />

        <div className='justify-content-center"'>
            <div>
                <h3>Availability</h3>
            </div>
            <div>
                <Typography variant='subtitle2'>List Available times near the Primary Date so you can figure out what works best among users</Typography>
            </div>
        </div>  
        <DynamicInput data={dates} setData={setDates} inputType="Select Date" />

        <div>
            <FormControl>
            <form onSubmit={handleCreate}>
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
