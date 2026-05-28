import React from 'react';
import CustomTable from '../../components/table/CustomTable';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const DepartmentAbstract = () => {
  const columns = [
    { name: 'Particulars', selector: row => row.particular, sortable: true },
    { name: 'Amount', selector: row => row.amount, sortable: true, right: true },
  ];

  const wageDetails = [
    { particular: 'BASIC', amount: '8706.78' },
    { particular: 'FDA', amount: '1178.58' },
    { particular: 'H R ALLO', amount: '2160.00' },
    { particular: 'INCR AMOUNT', amount: '892.85' },
    { particular: 'BASIC2', amount: '1820.68' },
    { particular: 'VDA', amount: '43891.56' },
    { particular: 'S.WEIGHTAGE', amount: '2103.85' },
    { particular: '*Gross Earning*', amount: '60754.3' },
    { particular: 'ESI Contribution', amount: '144.00' },
    { particular: 'PF Contribution', amount: '7032.00' },
    { particular: 'PTAX', amount: '1800.00' },
    { particular: 'RNDOFF', amount: '-0.70' },
    { particular: 'TKN INTEREST', amount: '-0.70' },
    { particular: 'ROUND', amount: '0.00' },
    { particular: 'Total Deduction', amount: '8975.30' },
    { particular: 'Net Pay', amount: '51779.70' },
  ];

  const printPDF = () => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    doc.setFontSize(14);
    doc.text('KERALA LAKSHMI MILLS', 105, 15, { align: 'center' });

    doc.setFontSize(10);
    doc.text('PULLAZHI, THRISSUR Dist. Phone: ✶', 105, 22, { align: 'center' });
    doc.text('(A Unit of National Textiles Corporation Ltd.)', 105, 28, { align: 'center' });

    doc.setFontSize(12);
    doc.text('Dept Wise Abstract of Wages of February - 2025', 105, 38, { align: 'center' });

    doc.setFontSize(11);
    doc.text('DEPT: 01 MIXING', 14, 48);

    const tableData = wageDetails.map(item => [item.particular, item.amount]);

    autoTable(doc, {
      head: [['Particulars', 'Amount']],
      body: tableData,
      startY: 52,
      theme: 'grid',
      headStyles: { fillColor: [200, 200, 200], textColor: 0, fontSize: 10 },
      bodyStyles: { fontSize: 10 },
      styles: { halign: 'center' },
      columnStyles: {
        0: { halign: 'left' },
        1: { halign: 'right' },
      },
    });

    const finalY = doc.lastAutoTable.finalY + 10;

    doc.setFontSize(11);
    doc.text(`WORKED: ________     EARNED: ________     FESTIVAL: ________     LAYOFF: ________`, 14, finalY);

    // Footer (optional page number if more than one page)
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.getWidth() - 40, doc.internal.pageSize.getHeight() - 10);
    }

    doc.save('Department_Abstract_February_2025.pdf');
  };

  return (
    <div className="container mt-5">
      <h4 className="text-center mb-3">Vishwas Auto Hub</h4>
      <p className="text-center mb-0">Kakanakhakhunu, Trivandrum Dist. Phone: ✶9456789241</p>
      <p className="text-center mb-0">(Car Detailing and Car Spa.)</p>
      <p className="text-center fw-bold mt-3">Dept Wise Abstract of Wages of February - 2025</p>
      <h6 className="text-start mt-4 mb-2">DEPT: 01 MIXING</h6>

      <CustomTable
        columns={columns}
        data={wageDetails}
        showActions={false}
        showSearchBar={false}
      />

      <div className="mt-4">
        <p><strong>WORKED:</strong> ___ &nbsp; <strong>EARNED:</strong> ___ &nbsp; <strong>FESTIVAL:</strong> ___ &nbsp; <strong>LAYOFF:</strong> ___</p>
      </div>

      <div className="text-end mt-3">
        <button type="submit" className="submit-button" onClick={printPDF}>Download PDF</button>
      </div>
    </div>
  );
};

export default DepartmentAbstract;
