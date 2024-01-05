import React, { useRef } from 'react';
import Chip from '@mui/material/Chip';
import { Box, FormControl, TextField, Typography } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

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

  const handleCreate = (item: string) => {
    if (inputType != 'Invite Users') {
      const parts = item.split('/');
      const year = parts[2]
      const month = parts[0]
      const day = parts[1]
      setData((prevData) => [...prevData, { value: `${year}-${month}-${day}` }]);
    } else {
      setData((prevData) => [...prevData, { value: item }]);
    }
    
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current?.value) {
      handleCreate(inputRef.current.value as string);
      inputRef.current.value = "";
    }
  };

  if (inputType === "Invite Users") {
    return (
      <div>
        <Box>
          <FormControl>
            <form onSubmit={handleOnSubmit}>
              <TextField
                sx={{ width: '12rem', "& input": {height: '35px'}}}
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
  }

  // Return DatePicker if inputType is not "Invite Users"
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>

      <Box>
        <FormControl>
          <form onSubmit={handleOnSubmit}>
            <DatePicker // Use DatePicker instead of TextField
              sx={{ width: '12rem', size: 'small'}}
              inputRef={inputRef}
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
      </LocalizationProvider>
    </div>
  );
};

export default DynamicInput;
