import React, { useState, useEffect, useRef } from 'react';
import PageTitle from '../../../components/dashboard/PageTitle'
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBranches } from '../../../features/branchSlice';
import CustomDropdown from '../../../components/form/CustomDropdown ';
import ProgressBar from 'react-bootstrap/ProgressBar';


const months = [
    { id: "January", name: "January", days: 31 },
    { id: "February", name: "February", days: 28 },
    { id: "March", name: "March", days: 31 },
    { id: "April", name: "April", days: 30 },
    { id: "May", name: "May", days: 31 },
    { id: "June", name: "June", days: 30 },
    { id: "July", name: "July", days: 31 },
    { id: "August", name: "August", days: 31 },
    { id: "September", name: "September", days: 30 },
    { id: "October", name: "October", days: 31 },
    { id: "November", name: "November", days: 30 },
    { id: "December", name: "December", days: 31 },
  ];

const Import = () => {
    const { branches } = useSelector((store) => store.branch);
    const dispatch = useDispatch();
    const [selectedBranch, setSelectedBranch] = useState('');
    const [selectedMonth, setSelectedMonth] = useState("January");
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const currentYear = new Date().getFullYear();
    // const [uploadProgress, setUploadProgress] = useState(0);
    // const [uploadStatus, setUploadStatus] = useState('');

    useEffect(() => {
        dispatch(fetchBranches());
    }, []);

    const handleBranchChange = (e) => {
        const branchId = e.target.value;
        setSelectedBranch(branchId);
    }

    const handleMonthChange = (e) => {
        const month = e.target.value;
        setSelectedMonth(month);
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file.name);
        }
    };

    const handleSelectFileClick = () => {
        fileInputRef.current.click();
    };

    // USE THIS FOR UPLOAD
    // const handleUpload = async () => {
    //     if (!selectedFile || !selectedBranch) {
    //         return;
    //     }

    //     const formData = new FormData();
    //     formData.append('file', selectedFile);
    //     formData.append('branch_id', selectedBranch);
    //     formData.append('month', selectedMonth);
    //     formData.append('year', currentYear);

    //     try {
    //         const response = await axiosInstance.post('', formData, {
    //             headers: {'Content-Type': 'multipart/form-data',},
    //             onUploadProgress: (progressEvent) => {
    //                 const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    //                 setUploadProgress(percentCompleted);
    //             },
    //         });
    //         if (response.status === 200) {
    //             setUploadStatus('Upload successful!');
    //             setSelectedFile(null);
    //             setUploadProgress(0);
    //         } else {
    //             setUploadStatus('Upload failed.');
    //         }
    //     } catch (error) {
    //         console.error('Error uploading file:', error);
    //         setUploadStatus('Upload failed.');
    //     }
    // };

    return (
        <div className="mt-4">
            <PageTitle
                title="Attendance Import"
                iname="bi bi-briefcase-fill"
            />
            <br />

            <div className="row">
                <div className="col-md-9">
                    <Alert variant="warning">
                        <Alert.Heading>Important Notice</Alert.Heading>
                        <p>
                            Please verify the <strong>branch</strong> and the <strong>selected month</strong> before proceeding.  
                            Ensure that the <strong>table format</strong> below is correct and matches your attendance sheet.
                        </p>
                        <Table bordered responsive>
                            <thead>
                                <tr>
                                    <th>Employee ID</th>
                                    <th>Name</th>
                                    <th>Branch</th>
                                    <th>Month</th>
                                    <th>Attendance</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderColor: 'lightgray' }}>
                                    <td>12345</td>
                                    <td>John Doe</td>
                                    <td>New York</td>
                                    <td>January</td>
                                    <td>25</td>
                                </tr>
                            </tbody>
                        </Table>
                        <small style={{ color: "red" }}>
                            Format will be different based on individual punching machines. The above table is for presentation purposes.
                        </small>
                    </Alert>
                </div>

                <div className="col-md-3 p-4" style={{ border: "1px solid lightgray" }}>
                    <div className="row">
                        <div className="col">
                            <CustomDropdown
                                label="Branch"
                                name="branch_id"
                                options={branches}
                                value={selectedBranch}
                                onChange={handleBranchChange}
                            />
                        </div>
                        <div className="col">
                            <CustomDropdown
                                label={`Year (${currentYear})`}
                                name="month"
                                options={months}
                                value={selectedMonth}
                                onChange={handleMonthChange}
                            />
                        </div>
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <button
                        className="btn btn-success mt-2 w-100"
                        onClick={handleSelectFileClick}
                    >
                        Select File
                    </button>

                    {selectedFile && (
                        <div className="w-100 mt-2">
                            <div 
                                style={{ 
                                    whiteSpace: "nowrap", 
                                    overflow: "hidden", 
                                    textOverflow: "ellipsis",
                                    maxWidth: "100%" 
                                }}
                                className="text-center"
                            >
                                <strong>{selectedFile}</strong>
                            </div>
                        </div>
                    )}
                    

                    <div className="row">
                        <div className='col-lg-6 col-sm-12 pt-3' >
                            <ProgressBar  variant="success" now={40} />
                        </div>
                        <div className='col-lg-4 col-sm-12'>
                            <button className="btn btn-primary">
                                <i className="bx bx-upload" style={{ color: 'white' }}></i> Upload
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Import