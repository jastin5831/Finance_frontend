
import * as XLSX from 'xlsx';
// eslint-disable-next-line import/no-extraneous-dependencies
import { saveAs } from 'file-saver';

export const exportToExcel = ({ data, month, fileName, type }) => {
    let headers = [];
    let excelData = [];
    const headerRender = ['AccountID', 'RevenueExpenseID', 'Description'];
    
    if(type === 'forecast') {
        headers = [...headerRender, ...month.flatMap(m => [`${m} Actual`, `${m} Forecast`]), 'Adjustment', 'Forecast'];

        excelData = data.map(item => [
        item.AccountId,
        item.RevenueExpenseId,
        item.Description,
        ...item.data.flatMap(d => [d.actual, d.forecast]),  // Monthly data
        item.userInfo,  // Adjustment column
        item.result     // Forecast column
        ]);
    }

    if(type === 'balancesheet') {
        headers = ['AccountID', ...month];
        
        excelData = data.map(item => [
            item.AccountId, // First column: Account ID
            ...item.data.map(d => d.amount) // Monthly "amount" values
        ]);
    }
    
    // Create worksheet and workbook
    const ws = XLSX.utils.aoa_to_sheet([headers, ...excelData]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Save file
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(dataBlob, `${fileName}.xlsx`);
};