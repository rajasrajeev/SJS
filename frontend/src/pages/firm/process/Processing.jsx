import React, { useState, useEffect } from 'react';
import './processing.scss'

const Processing = () => {
    const [progress, setProgress] = useState(0);
    const [step, setStep] = useState("initial");

    const handleProcessing = (type) => {
        if (type === "process") {
            setProgress(40);
            setStep("processed");
        } else if (type === "reprocess") {
            setProgress(70);
            setStep("reprocessed");
        } else if (type === "final") {
            setProgress(100);
            setStep("final");
        }
    };

    return (
        <div className="payroll-container container mt-5">
            
                <div className="card shadow">
                    <div className="card-body ">
                        <h3 className="card-title text-center mb-4">Payroll Processing</h3>
                        <div className="row mb-3 ">
                            <div className="col-md-6"><strong>Firm Name:</strong></div>
                            <div className="col-md-6">XYZ Pvt Ltd</div>
                            <div className="col-md-6"><strong>Month:</strong> </div>
                            <div className="col-md-6"> January 2025</div>
                            <div className="col-md-6"><strong>Working Days:</strong> </div>
                            <div className="col-md-6"> 26</div>
                            <div className="col-md-6"><strong>DA Rate:</strong> </div>
                            <div className="col-md-6">₹12743.46</div>
                            <div className="col-md-6"><strong>No. of Employees:</strong></div>
                            <div className="col-md-6">230</div>
                            <div className="col-md-6"><strong>Process Type:</strong></div>
                            <div className="col-md-6"> Full / Department</div>
                        </div>

                        <div className="progress mb-4">
                            <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: `${progress}%` }}
                                aria-valuenow={progress}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            >
                                {progress}%
                            </div>
                        </div>

                        <div className="d-flex justify-content-between">
                            <button
                                className="btn btn-primary"
                                onClick={() => handleProcessing("process")}
                                disabled={step !== "initial"}
                            >
                                Process
                            </button>
                            <button
                                className="btn btn-warning"
                                onClick={() => handleProcessing("reprocess")}
                                disabled={step !== "processed"}
                            >
                                Re-Process
                            </button>
                            <button
                                className="btn btn-success"
                                onClick={() => handleProcessing("final")}
                                disabled={step !== "reprocessed"}
                            >
                                Final Process
                            </button>
                        </div>
                    </div>
                </div>
           

        </div>
    );
};

export default Processing;