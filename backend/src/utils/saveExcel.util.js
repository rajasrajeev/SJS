const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

/**
 * Save data to an Excel file at a specific location.
 * @param {Array} data - The data to be saved (array of objects).
 * @param {string} fileName - The name of the Excel file.
 * @param {string} sheetName - The name of the worksheet.
 * @returns {string} The full path of the saved Excel file.
 */
function saveExcel(data, fileName, sheetName = 'Sheet1', folder = "employee") {
    try {
        // Define the directory and ensure it exists
        const dirPath = path.join(process.cwd(), 'uploads', 'excel', folder);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        // Create worksheet and workbook
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

        // Define the file path
        const filePath = path.join(dirPath, `${fileName}.xlsx`);

        // Write workbook to file
        XLSX.writeFile(workbook, filePath);

        const relativePath = `uploads/excel/employee/${fileName}.xlsx`;
        console.log(`Excel file saved to: ${relativePath}`);
        return relativePath;
    } catch (error) {
        console.error('Error saving to Excel:', error);
        throw error;
    }
}

module.exports = saveExcel;
