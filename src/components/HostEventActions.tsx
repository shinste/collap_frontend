import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, TextField, FormControl, Tooltip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import LeaveEvent from '../functions/leaveEvent';
import HostDates from './HostDates';
import RankDates from './RankDates';
import AvailableDates from './AvailableDates';
import getApi from '../functions/getApi';
import postApi from '../functions/postApi';

const HostEventActions = () => {
    type EventData = {
        event_id: string;
        name: string;
        host_id: number;
        primary_date: string;
        dates: string[];
        participants: string[];
    };

    const [hostedData, setHostedData] = useState<Record<string, EventData>>({});
    const [error, setError] = useState('');
    const storedUsername = localStorage.getItem('username') || '';
    const [status, setStatus] = useState(false);
    const [inviteUser, setInviteUser] = useState('');
    const [success, setSuccess] = useState('');
    const [deleteId, setDeleteId] = useState(0);

    const hostedEvents = async () => {
        try {
            const response = await getApi(`event/hosted/?username=${encodeURIComponent(storedUsername)}`);
            if (response.ok) {
                const fetchedEventData = await response.json();
                setHostedData(fetchedEventData);
                console.log('Query Successful', fetchedEventData);
            } else {
                const errorData = await response.json();
                const errorMessage = errorData.error[0];
                console.error('Failed to Query', errorMessage);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Start of Participants subpanel code
    const handleInvite = async (e: React.FormEvent<HTMLFormElement>, event_id: string, name: string) => {
        e.preventDefault();
        const inviteData = {
            username: inviteUser.toLowerCase(),
            event_id: event_id,
            name: name
        };
        try {
            const response = await postApi('event/invite/', inviteData);
            if (response.ok) {
                const data = await response.json();
                console.log('User Invited:', data);
                setStatus(!status);
                setSuccess('invited');
                setError('');
            } else {
                const errorData = await response.json();
                const message = errorData.error;
                if (typeof message != "string") {
                    const message2 = Object.values(message)[0];
                    setError(String(message2));
                } else {
                    setError(message);
                }
                setSuccess('');
            }
        } catch (errors) {
            console.error('Error:', errors);
            if (String(errors) === "SyntaxError: The string did not match the expected pattern.") {
                setError('invite error: This user already has an invite!');
            } else {
                setError(String(errors));
            }
            setSuccess('');
        }
    };

    const handleLeave = (username: string, event_id: string, name: string) => {
        LeaveEvent(event_id, username, name, setError);
        setStatus(!status);
    };

    // End of Participants Subpanel Code
    // Start of Voting Panel

    type EachEvent = {
        total_users: string[];
        dates: string[];
        status: string;
        waiting: string[];
        votes: { data: number[] }[];
    };

    type EventsDictionary = Record<string, EachEvent>;
    const [voteData, setVoteData] = useState<EventsDictionary>({});
    const [deleteName, setDeleteName] = useState('');
    const voteInfo = async () => {
        try {
            const response = await getApi(`event/get_votes/?username=${encodeURIComponent(storedUsername)}`);
            if (response.ok) {
                const fetchedVoteData = await response.json();
                setVoteData(fetchedVoteData);
                console.log('Vote Data Query Successful', fetchedVoteData);
            } else {
                const errorData = await response.json();
                const errorMessage = errorData.error[0];
                console.error('Failed to Query', errorMessage);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handlePushVote = async (event_id: string, name: string) => {
        try {
            const pushData = {
                event_id: event_id
            };
            const response = await postApi('event/push_votes/', pushData);
            if (response.ok) {
                const data = await response.json();
                console.log('Pushed Vote:', data);
                setStatus(!status);
                setSuccess('pushed');
                setError('');
            } else {
                const errorData = await response.json();
                const message = errorData.error;
                if (typeof message != "string") {
                    const message2 = Object.values(message)[0];
                    setError(String(message2));
                } else {
                    setError(message);
                }
                setSuccess('');
            }
        } catch (errors) {
            console.error('Error:', errors);
            setError(String(errors));
            setSuccess('');
        }
    };

    // End of Voting Panel
    // Start of Dates Panel
    // End of Dates Panel

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (event_id: number) => {
        setOpen(true);
        setDeleteId(event_id);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async (event_id: string, name: string) => {
        try {
            const pushData = {
                username: storedUsername,
                event_id: event_id
            };
            const response = await postApi('event/delete/', pushData);
            if (response.ok) {
                const data = await response.json();
                console.log('Pushed Vote:', data);
                setStatus(!status);
                setSuccess('deleted');
                setError('');
                setDeleteName(name);
            } else {
                const errorData = await response.json();
                const message = errorData.error;
                if (typeof message != "string") {
                    const message2 = Object.values(message)[0];
                    setError(String(message2));
                } else {
                    setError(message);
                }
                setSuccess('');
            }
        } catch (errors) {
            console.error('Error:', errors);
            setError(String(errors));
            setSuccess('');
        }
        setOpen(false);
    };

    useEffect(() => {
        hostedEvents();
        console.log(hostedData);
        voteInfo();
    }, [status]);

    return (
        <div className='scrollable-box' style={{ width: "100%", height: "100vh", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ textAlign: 'center', width: '60%', marginTop: 10 }}>
                <Typography variant='h4'>HOSTED EVENTS</Typography>
            </div>
            <div style={{ width: '80%' }}>
                {Object.entries(hostedData).map(([key, value]) => (
                    <div style={{ width: "100%", height: "60rem", textAlign: 'center', marginBottom: 0 }}>
                        <Box sx={{ background: '#AFC38E', display: 'flex', flexDirection: 'column', borderRadius: '8px', width: '100%', height: '48rem', marginBottom: 2, overflow: 'hidden'}}>
                            <div style={{ marginLeft: 35, marginTop: 20, marginBottom: 0 }}>
                                <Typography variant='h5' style={{ textAlign: 'left', textTransform: 'capitalize' }}>{String(value["name"])}</Typography>
                            </div>
                            <div className="horizontal-center" style={{ display: 'flex', height: '40rem'}}>
                                <div className='vertical-flex Host-date'>
                                    <div className='Host-box' style={{marginBottom: '1rem'}}>
                                        <HostDates hostData={hostedData[key]} status={status} setStatus={setStatus} />
                                    </div>
                                    <div className='Host-box'>
                                        <div className='m-3 flex-container' style={{ justifyContent: 'space-evenly' }}>
                                            <div>
                                                <Typography variant='h6' sx={{ marginBottom: 1 }}>Voting Status</Typography>
                                                {voteData[value["event_id"]] ? (
                                                    <Typography>{voteData[value["event_id"]].status}</Typography>
                                                ) : (
                                                    <Typography>Loading...</Typography>
                                                )}
                                                {voteData[value["event_id"]] && voteData[value["event_id"]].status === "Inactive" && (
                                                    <Button onClick={(e) => {
                                                        e.preventDefault();
                                                        handlePushVote(value["event_id"], value["name"]);
                                                    }}>Start Voting</Button>
                                                )}
                                                {voteData[value["event_id"]] && voteData[value["event_id"]].status === "Active" ? (
                                                    <div>
                                                        <Typography>Voters: {voteData[value["event_id"]].total_users.length - voteData[value["event_id"]].waiting.length} / {voteData[value["event_id"]].total_users.length}</Typography>
                                                        <Button onClick={(e) => {
                                                            e.preventDefault();
                                                            handlePushVote(value["event_id"], value["name"]);
                                                        }
                                                        }>
                                                            Restart Voting
                                                        </Button>
                                                        <Typography sx={{ fontSize: 10, color: 'red' }}>This will delete all the current Votes for this event!</Typography>
                                                        {voteData[value["event_id"]].dates.length > 0 ? (
                                                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                <BarChart
                                                                    layout='vertical'
                                                                    xAxis={[{ scaleType: 'band', data: voteData[value["event_id"]].dates }]}
                                                                    series={voteData[value["event_id"]].votes}
                                                                    width={280}
                                                                    height={200}
                                                                    colors={['#AFC38E']}
                                                                />
                                                            </Box>
                                                        ) : (
                                                            <div>
                                                                <Typography>Once there are votes registered, it will be displayed here!</Typography>
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <Typography>Once there are votes registered, it will be displayed here!</Typography>
                                                    </div>
                                                )}
                                            </div>
                                            <Box sx={{ height: '100%', width: '17rem' }}>
                                                <RankDates event_id={String(hostedData[key].event_id)} />
                                            </Box>
                                            <div style={{width: '17rem'}}>
                                                <AvailableDates hostData={hostedData[key]} status={status} setStatus={setStatus} />
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                <Box sx={{ width: '20%', height: '608.02px', background: '#FFFFFF', margin: "1rem", marginBottom: 0, borderRadius: '15px', marginTop: 2, boxShadow: '1px 1px #777777' }}>
                                    <Box sx={{ margin: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                                        <Box sx={{ marginBottom: 3, textAlign: 'left'}}>
                                            <Typography variant='h6' sx={{ marginBottom: 1 }}>Who's going?</Typography>
                                        </Box>
                                        <Box>
                                            {value["participants"].map((participant, index) => (
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxHeight: '80%' }}>
                                                    <Typography>{participant}</Typography>
                                                    <Box>
                                                        <Button sx={{ textAlign: 'right' }} onClick={() => handleLeave(participant, value["event_id"], value["name"])}> KICK </Button>
                                                    </Box>
                                                </div>
                                            ))}
                                        </Box>
                                        <Box sx={{ marginTop: 'auto', marginBottom: 3 }}>
                                            <div style={{ width: "100%", marginBottom: 2 }}>

                                                <FormControl
                                                    component="form"
                                                    onSubmit={(e) => {
                                                        e.preventDefault();
                                                        handleInvite(e, value["event_id"], value["name"]);
                                                    }}
                                                >
                                                    <Box sx={{ display: 'flex' }}>
                                                        <TextField
                                                            size="small"
                                                            sx={{ width: '80%' }}
                                                            onChange={(e) => setInviteUser(e.target.value)}
                                                        />
                                                        <Button sx={{ width: '20%' }} type="submit">Invite</Button>
                                                    </Box>

                                                </FormControl>

                                            </div>
                                        </Box>
                                    </Box>
                                </Box>
                            </div>
                            <div style={{ textAlign: 'right', margin: 30, marginTop: 15 }}>
                                <Tooltip title='Delete Event'>
                                    <Button sx={{ background: 'white', borderRadius: '12px' }} onClick={() => { handleClickOpen(+key) }}>
                                        <Typography sx={{ textTransform: 'capitalize', color: 'red' }}>Delete Event</Typography>
                                    </Button>
                                </Tooltip>
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        {"Delete the event " + hostedData[deleteId].name}
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Pressing Delete will delete this event forever! Think about this carefully!
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button sx={{ color: 'green' }} onClick={handleClose}>Cancel</Button>
                                        <Button sx={{ color: 'red' }} onClick={() => handleDelete(hostedData[deleteId].event_id, hostedData[deleteId].name)} autoFocus>
                                            Delete
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>

                        </Box>
                    </div>
                ))}
            </div>
            <div style={{ position: 'fixed' }}>
                {success === 'invited' && <Typography sx={{ color: 'green' }}> Successfully Invited {inviteUser}</Typography>}
                {success === 'deleted' && <Typography sx={{ color: 'green' }}> Successfully Deleted {deleteName}</Typography>}
                {error && <Typography sx={{ color: 'red' }}>{error}</Typography>}
            </div>
        </div>

    );
}

export default HostEventActions;
