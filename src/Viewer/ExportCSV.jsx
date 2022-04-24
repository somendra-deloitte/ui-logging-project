import React from 'react'

import * as FileSaver from 'file-saver';

import * as XLSX from 'xlsx';

import { Button } from '@material-ui/core';
export default function ExportCSV({csvData, fileName}) {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    const fileExtension = '.xlsx';



    const exportToCSV = (csvData, fileName) => {

        const ws = XLSX.utils.json_to_sheet(csvData);

        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };

        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

        const data = new Blob([excelBuffer], {type: fileType});

        FileSaver.saveAs(data, fileName + fileExtension);

    }



    return (
        <>
            <Button variant="contained" color="blue" onClick={(e) => exportToCSV(csvData,fileName)}>Download Audits</Button>
        </>
    )

}
