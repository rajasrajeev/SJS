import React from 'react';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ServiceRecordPDF = () => {
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text("SERVICE RECORD", 105, 20, { align: "center" });
    doc.setFontSize(11);
    doc.text("(As per Rule 10 (1) a – Form BB)", 105, 27, { align: "center" });

    autoTable(doc, {
      startY: 35,
      head: [["SL No.", "Particulars", "Details"]],
      body: [
        ["1", "Name of the Establishment", "IFA HYGIENE"],
        ["2", "Name of Employee", "MUHAMMED"],
        ["3", "Name of the Father / Husband", "HUSSAIN"],
        ["4", "Age", "36"],
        ["5", "Full Residential Address", "PUTHANVEEDU, POOSHAKADU"],
        ["6", "Sex", "MALE"],
        ["7", "Date of Entry into Service", "01/04/2021"],
        ["8", "Category / Designation", "MANAGER"],
        ["9", "Pay", "₹ 20000/-"],
        [
          "10",
          "Date of Retrenchment / Discharge / Dismissal / Retirement / Resignation",
          "—"
        ],
        ["11", "Signature of the Employee", "___________________________"],
        ["12", "Signature of the Employer", "___________________________"],
        ["13", "Countersignature of the Inspector", "___________________________"]
      ],
      styles: { fontSize: 10 },
      columnStyles: {
        0: { cellWidth: 15 },
        1: { cellWidth: 80 },
        2: { cellWidth: 95 }
      }
    });

    doc.setFontSize(10);
    doc.text(
      "Note: Whenever there is a change in designation and wages, the changes shall be noted in columns 8 and 9 respectively with the date of such changes.",
      15,
      doc.lastAutoTable.finalY + 10,
      { maxWidth: 180 }
    );

    doc.save("Service_Record.pdf");
  };

  return (
    <div className="mt-2">
      <button
        onClick={generatePDF}
        className="submit-button"
      >
        Service Record PDF
      </button>
    </div>
  );
};

export default ServiceRecordPDF;
