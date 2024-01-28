import * as React from 'react';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import postApi from '../functions/postApi';
import getDate from '../functions/getDate';

function not<T>(a: readonly T[], b: readonly T[]): T[] {
    return a.filter((value) => b.indexOf(value) === -1);
  }
  
  function intersection<T>(a: readonly T[], b: readonly T[]): T[] {
    return a.filter((value) => b.indexOf(value) !== -1);
  }
  
  function union<T>(a: readonly T[], b: readonly T[]): T[] {
    return [...a, ...not(b, a)];
  }

interface JoinProps {
  key: number;
  status: React.Dispatch<React.SetStateAction<string>>;
  dates: string[]; 
  event_id: string
}

const VotePanel = ({ key, status, dates, event_id }: JoinProps) => {
  const [checked, setChecked] = useState<readonly number[]>([]);
  const [left, setLeft] = useState<readonly number[]>(Array.from({ length: dates.length }, (_, index) => index));
  const [right, setRight] = useState<readonly number[]>([]);
  const [error, setError] = useState('');
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items: readonly number[]) =>
    intersection(checked, items).length;

  const handleToggleAll = (items: readonly number[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const voteDates = async () => {
    const selectedDates = right.map((index) => dates[index]);
    const voteData = {
      username: localStorage.getItem('username'),
      event_id: event_id,
      dates: selectedDates
    }
    console.log('Selected Dates:', selectedDates);
    try {
      const response = await postApi('vote/', voteData);
      if (response.ok) {
        const data = await response.json();
        console.log('Vote Recorded:', data);
        status('Voted Successfully');
      //   setSuccess(true)
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
          console.error('Failed to create event:', message);
          console.log(voteData)
      }
    } catch (errors) {
      console.error('Error:', errors);
      // setSuccess(false)
      setError('You have already voted for this date!');
    }
  };

  const customList = (title: React.ReactNode, items: readonly number[]) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={
              numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: 200,
          height: 230,
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value: number) => {
          const labelId = `transfer-list-all-item-${value}-label`;
          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={getDate(dates[value])} />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  return (
    <div className='center' style={{height: "100%"}}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>{customList('Choices', left)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={voteDates}
              disabled={right.length === 0}
              aria-label="gather selected dates"
            >
              Vote Dates
            </Button>
          </Grid>
        </Grid>
        <Grid item>{customList('Voted Dates', right)}</Grid>
      </Grid>
      {error && <Typography variant="body1" sx={{ color: 'red' }}>{error}</Typography>}
    </div>
  );
}

// Helper functions: not, intersection, union (to be defined)

export default VotePanel;
