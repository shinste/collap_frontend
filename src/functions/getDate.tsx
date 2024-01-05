import React from "react";

const formatDate = (inputDate: string) => {
    const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];

    // Create a new Date object by parsing the input date string
    const date = new Date(inputDate.replace(/-/g, '\/'));

    // Extract day, month, and year from the Date object
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    // Function to add 'st', 'nd', 'rd', or 'th' to the day
    const getDayWithSuffix = (day: number) => {
        if (day >= 11 && day <= 13) {
        return `${day}th`;
        } else {
        const suffixes = ['st', 'nd', 'rd'];
        const suffix = suffixes[day % 10 - 1] || 'th';
        return `${day}${suffix}`;
        }
    };

    // Format the date as "Month Day(th), Year"
    const formattedDate = `${month} ${getDayWithSuffix(day)}, ${year}`;

    return formattedDate;
}

export default formatDate;