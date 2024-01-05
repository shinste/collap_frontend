import React, { useState, useContext, useEffect } from 'react';


const formatTimeRange = (startStr: string, endStr: string, select?: string) => {
    const startTime: Date = new Date(`2000-01-01T${startStr}`);
    const endTime: Date = new Date(`2000-01-01T${endStr}`);

    const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit' };
    const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat('en-US', options);

    const formattedStartTime: string = formatter.format(startTime);
    const formattedEndTime: string = formatter.format(endTime);

    if (select === 'start') {
        return formattedStartTime;
    } else if (select === 'end') {
        return formattedEndTime;
    } else {
         const formattedTimeRange: string = `${formattedStartTime} - ${formattedEndTime}`;
        return formattedTimeRange;
    }
   
}



export default formatTimeRange;
