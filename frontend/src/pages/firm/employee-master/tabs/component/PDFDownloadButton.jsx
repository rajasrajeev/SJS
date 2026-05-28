import React, { forwardRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const PDFDownloadButton = forwardRef(({ fileName, label, pdfref }, ref) => {
  const generatePDF = async () => {
    if (pdfref && pdfref.current) {
      const content = pdfref.current;

      try {
        // Generate canvas with higher resolution
        const canvas = await html2canvas(content, {
          scale: 1.5, // Increase scale for better quality
          useCORS: true, // Handle external images
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size in portrait mode

        // A4 page dimensions in mm
        const pdfWidth = 150;
        const pdfHeight = 297;

          // Calculate dimensions to maintain aspect ratio
          //const pdfWidth = pdf.internal.pageSize.getWidth();
          //const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
        // Add image to PDF and stretch it to fill A4 size
        //pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

         // Image dimensions in pixels
         const imgWidth = canvas.width / 10; // Convert pixels to mm (assuming 1px = 0.1mm)
         const imgHeight = canvas.height / 10;
 
         // Calculate centering positions
        //  const xOffset = (pdfWidth - imgWidth) / 2;
        //  const yOffset = (pdfHeight - imgHeight) / 2;
        const xOffset = 0;
        const yOffset = 0;
         // Add image to PDF and center it
         pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight);

  //  // Original content dimensions in pixels
  //  const contentWidth = canvas.width;
  //  const contentHeight = canvas.height;

  //  // Convert content dimensions to mm (assuming 1px = 0.1mm)
  //  const contentWidthMm = contentWidth / 10;
  //  const contentHeightMm = contentHeight / 10;

  //  // Scale content to fit within A4 dimensions
  //  let scaleFactor = Math.min(pdfWidth / contentWidthMm, pdfHeight / contentHeightMm);

  //  // Calculate scaled dimensions
  //  const scaledWidth = contentWidthMm * scaleFactor;
  //  const scaledHeight = contentHeightMm * scaleFactor;

  //  // Center the content on the page
  //  const xOffset = (pdfWidth - scaledWidth) / 2;
  //  const yOffset = (pdfHeight - scaledHeight) / 2;

  //  // Add image to PDF
  //  pdf.addImage(imgData, 'PNG', xOffset, yOffset, scaledWidth, scaledHeight);
         
         pdf.save(fileName);
       
      } catch (error) {
        console.error('Error generating PDF:', error);
      }
    } else {
      console.error('Content is not available for generating PDF.');
    }
  };

  return (
    <button onClick={generatePDF} style={{
      backgroundColor: '#181c2e',
      color: '#f8f8f8',
      borderRadius: '5px',
      padding: '7px',
    }}>
      {label}
    </button>
  );
});

export default PDFDownloadButton;
