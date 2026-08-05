import * as XLSX from "xlsx";
import { downloadBlob } from "./downloadHelper.js";

export const generateExcel = ({ headers, rows, filename, sheetName = "Report" }) => {
  const data = [headers, ...rows];
  const worksheet = XLSX.utils.aoa_to_sheet(data);

  const columnWidths = headers.map((header, index) => {
    const maxCellLength = data.reduce((max, row) => {
      const cell = row[index] == null ? "" : String(row[index]);
      return Math.max(max, cell.length);
    }, header.length);
    return { wch: Math.min(Math.max(maxCellLength + 2, 12), 32) };
  });

  worksheet["!cols"] = columnWidths;
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([wbout], { type: "application/octet-stream" });
  downloadBlob(blob, filename);
};
