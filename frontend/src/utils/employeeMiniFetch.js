import axiosInstance from './axios';

const fetchEmployeeList = async (inputValue, callback) => {
    if(inputValue.length > 1) {
        try {
            let response = await axiosInstance.get(`/employee/mini?emp_code=${inputValue}`);
            console.log(response)
            const options = response.data.map(emp => ({
                label: `${emp.pno} (${emp.name})`,
                value: `${emp.id}`
            }));
            return options;
        } catch (err) {
            return [];
        }

    } else {
        return [];
    }
};

export default fetchEmployeeList;