import React, { useRef } from 'react';
import PDFDownloadButton from './component/PDFDownloadButton';
import ServiceRecordPDF from './component/pdf/ServiceRecordPDF';
import AppointmentLetterPDF from './component/pdf/AppointmentLetterPDF';
import IdentityCardPDF from './component/pdf/IdentityCardPDF';


const PdfTab = (formData) => {
  const pdfRef = useRef(null);

  const emp = {
    appointmentLetter: {
      registrationNo: 'SH080250315555',
      establishmentName: 'IFA HYPERMARKET',
      establishmentAddress: 'IFA TOWER, OPP: ORTHODOX CHURCH\nMARATHENCODE P.O\nKUNNAMKULAM-680604',
      employerName: 'HUSSAIN',
      employeeName: 'MUHAMMED SIYAD P H',
      employeeAddress: 'PUTHAN MALIYEKKAL HOUSE, POOSHAPILLI, MARANTHANKOODE P O',
      employeeAge: '36',
      designation: 'MANAGER',
      joiningDate: '01/04/2019',
      salary: '20000',
      salaryWords: 'TWENTY THOUSAND',
      place: 'OLLUR',
      issueDate: '18/04/2024',
    },
    // You can still have idCard or other sections here
      idCard: {
        establishmentName: 'GreenTech Industries',
        establishmentAddress: '123 Eco Street, Kochi, Kerala - 682001',
        phone: '9876543210',
        email: 'contact@greentech.com',
        registrationNumber: 'REG-123456',
        employeeName: 'Rahul Nair',
        employeeAddress: '456 River View, Alappuzha, Kerala - 688001',
        employeePhone: '9988776655',
        employeeEmail: 'rahul.nair@example.com',
        dob: '1990-06-15',
        bloodGroup: 'O+',
        designation: 'Mechanical Engineer',
        joiningDate: '2022-01-10',
        issueDate: '2025-03-16',
      },
      serviceRecord: {
        establishmentName: "IFA HYGIENE",
        employeeName: "MUHAMMED SIYAD P H",
        fatherOrHusbandName: "HUSSAIN",
        age: "36",
        address: "PUTHAN MALIYEKKAL HOUSE, POOSHAPILLI, MARANTHANKOODE P O",
        sex: "MALE",
        entryDate: "01/04/2019",
        designation: "MANAGER",
        pay: "20000/-",
        retrenchmentDate: "",
        employeeSignature: "",
        employerSignature: "",
        inspectorSignature: "",
      }
  };

  return (
    <div>
      <h4>Download Documents</h4>
      <div className='row mb-4'>
      <div className='col-md-3'>
         <ServiceRecordPDF employeeData={emp.serviceRecord} />
         </div>
        <div className='col-md-3'>
                  <IdentityCardPDF  employeeData={emp.idCard}/>
        </div>
        {/* <div className="col-md-12">
          <button onClick={handleDownload}>Appointment</button>
          
        </div> */}
      <div  className='col-md-3'> 
        <AppointmentLetterPDF employeeData={emp.appointmentLetter} />

        {/* <button onClick={generatePDF} style={{ marginTop: "20px" }}>
        Download PDF
      </button> */}
      </div>
      </div>

      {/* Add more DownloadButton components for other documents */}
    </div>
  );
};

export default PdfTab;
