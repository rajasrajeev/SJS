import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const IdentityCardPDF = ({ employeeData, logoImage }) => {
  const generateIDCardPDF = () => {
    const doc = new jsPDF();

    // const formData = {
    //   idCard: {
    //     establishmentName: 'GreenTech Industries',
    //     establishmentAddress: '123 Eco Street, Kochi, Kerala - 682001',
    //     phone: '9876543210',
    //     email: 'contact@greentech.com',
    //     registrationNumber: 'REG-123456',
    //     employeeName: 'Rahul Nair',
    //     employeeAddress: '456 River View, Alappuzha, Kerala - 688001',
    //     employeePhone: '9988776655',
    //     employeeEmail: 'rahul.nair@example.com',
    //     dob: '1990-06-15',
    //     bloodGroup: 'O+',
    //     designation: 'Mechanical Engineer',
    //     joiningDate: '2022-01-10',
    //     issueDate: '2025-03-16',
    //   }
    // };

    // Add Logo if available
    if (logoImage) {
      try {
        doc.addImage(logoImage, 'PNG', 15, 10, 30, 30);
      } catch (err) {
        console.warn('Logo could not be added:', err);
      }
    }

    // Header
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('FORM BC', 105, 15, { align: 'center' });

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('[See RULE 2 J (2)]', 105, 21, { align: 'center' });

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('IDENTITY CARD', 105, 30, { align: 'center' });

    // Data table
    const startY = 40;

    const tableData = [
      [
        'Name and full address of the establishment with pincode, telephone/mobile number, email ID',
        `${employeeData.establishmentName}, ${employeeData.establishmentAddress}, Phone: ${employeeData.phone}, Email: ${employeeData.email}`,
      ],
      ['Registration number of the establishment', employeeData.registrationNumber],
      [
        'Name of the employee and his full postal address with pincode, telephone/mobile number, email ID',
        `${employeeData.employeeName}, ${employeeData.employeeAddress}, Phone: ${employeeData.employeePhone}, Email: ${employeeData.employeeEmail}`,
      ],
      ['Age / date of birth', employeeData.dob],
      ['Blood group of the employee', employeeData.bloodGroup],
      ['Designation', employeeData.designation],
      ['Date of joining duty', employeeData.joiningDate],
      ['Date of issue of the card', employeeData.issueDate],
      ['Signature of the employee', '_________________________'],
    ];

    autoTable(doc, {
      startY,
      head: [['Particulars', 'Details']],
      body: tableData,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: {
        fillColor: [52, 152, 219],
        textColor: 255,
        halign: 'center',
      },
      columnStyles: {
        0: { cellWidth: 85 },
        1: { cellWidth: 95 },
      },
    });


// Footer section
const finalY = doc.lastAutoTable?.finalY || 130;
doc.setFontSize(11);
doc.setFont('helvetica', 'bold');
doc.text('Name, Signature & Seal of Employer:', 190, finalY + 20, { align: 'right' });


    doc.save(`${employeeData.employeeName}_Identity_Card.pdf`);
  };

  return (
    <div className="mt-2">
      <button className="submit-button" onClick={generateIDCardPDF}>
        Identity Card PDF
      </button>
    </div>
  );
};

export default IdentityCardPDF;
