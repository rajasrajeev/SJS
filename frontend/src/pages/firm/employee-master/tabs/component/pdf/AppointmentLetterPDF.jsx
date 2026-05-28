import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const AppointmentLetterPDF = ({ employeeData }) => {
  const generatePDF = () => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    // Header Section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('LETTER OF APPOINTMENT', 105, 15, { align: 'center' });

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('FORM BC', 105, 21, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('[See rule 2J (1)]', 105, 26, { align: 'center' });

    // Extracting values from props
    const {
      registrationNo,
      establishmentName,
      establishmentAddress,
      employerName,
      employeeName,
      employeeAddress,
      employeeAge,
      designation,
      joiningDate,
      salary,
      salaryWords,
      place,
      issueDate,
    } = employeeData;

    // Details Table
    autoTable(doc, {
      startY: 35,
      head: [['Sl.No', 'Details', 'Value']],
      body: [
        ['1', 'Registration No of the establishment', registrationNo || ''],
        ['2', 'Name and address of the establishment with pin code, telephone / mobile number and email ID', `${establishmentName}\n${establishmentAddress}`],
        ['3', 'Name of the employer', employerName || ''],
        ['4', 'Name and address of the employee', `${employeeName}\n${employeeAddress}`],
      ],
      styles: {
        fontSize: 10,
        cellPadding: 3,
        valign: 'middle',
      },
      columnStyles: {
        0: { cellWidth: 15 },
        1: { cellWidth: 80 },
        2: { cellWidth: 95 },
      },
    });

    // Appointment Paragraph
    let y = doc.lastAutoTable.finalY + 10;
    const paragraph = `Shri ${employeeName} aged ${employeeAge} years C/O ${employerName} of residing at ${employeeAddress} is appointed ${designation} in this establishment with effect from ${joiningDate}. He is appointed/engaged with a monthly wages/salary of Rs ${salary}/- (Rupees ${salaryWords} only) and is entitled to other allowances and statutory benefits as per the law in force.`;

    const splitText = doc.splitTextToSize(paragraph, 180);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(splitText, 14, y);
    y += splitText.length * 6;

    // Footer Section
    y += 10;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`Place: ${place}`, 14, y);
    doc.text('Signature of employer', 190, y, { align: 'right' });

    y += 8;
    doc.text(`Date: ${issueDate}`, 14, y);
    doc.text('Name and seal of the employer', 190, y, { align: 'right' });

    // Save PDF
    doc.save(`${employeeName}_Appointment_Letter.pdf`);
  };

  return (
    <div>
      <button className="submit-button" onClick={generatePDF}>
        Appointment Letter PDF
      </button>
    </div>
  );
};

export default AppointmentLetterPDF;
