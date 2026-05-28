import { format } from 'date-fns';


export const dateFormat = (date) => {
    return format(new Date(date), 'dd-MM-yyyy HH:mm')
}

export const dateFormatFromString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export const datePickerFormat = (dateString) => {
    // Check if the input is falsy or invalid
    if (!dateString || isNaN(new Date(dateString).getTime())) {
        console.warn("Invalid date passed to datePickerFormat:", dateString);
        return ""; // Return an empty string or a default value
    }

    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
};

//Date picker format for Edit Employee Master
export const datePickerFormats = (date) => {
    if (!date) return '';
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) return '';
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  export const parseDate = (dateString) => {
    const parsedDate = new Date(dateString);
    return isNaN(parsedDate) ? '' : parsedDate.toISOString();
  };