export const textValidation = (fieldname, value, length) => {
    if(!value.toString().trim()) {
        return [false, `${fieldname} is required`];
    } else if(value.length < length) {
        return [false, `Atleast ${length} characters required`];
    } else {
        return [true, ""];
    }
}

export const emailValidation = (email) => {
    if(!email.trim()) {
        return [false, "Email is required"];
    } else if (! /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email)) {
        return [false, `Invalid email format`];
    } else {
        return [true, ""];
    }
}

export const mobileNumberValidation = (mobileNumber) => {
    if (!mobileNumber.trim()) {
        return [false, "Mobile number is required"];
    } else if (!/^\+?[1-9]\d{1,14}$/.test(mobileNumber)) {
        return [false, "Invalid mobile number format"];
    } else {
        return [true, ""];
    }
};

export const selectFieldValidation = (fieldname, value) => {
    if (parseInt(value) === -1) {
        return [false, `${fieldname} is required`];
    } else {
        return [true, ""];
    }
}

export const pincodeValidation = (pincode) => {
    if (!pincode.trim()) {
        return [false, "Pincode is required"];
    } else if (!/^[1-9][0-9]{5}$/.test(pincode)) {
        return [false, "Invalid pincode format"];
    } else {
        return [true, ""];
    }
};