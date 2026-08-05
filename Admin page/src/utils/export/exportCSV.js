import { downloadBlob } from "./downloadHelper.js";

export const generateCSV = ({ headers, rows, filename }) => {
  const escaped = rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","));
  const csv = [headers.join(","), ...escaped].join("\r\n");
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
  downloadBlob(blob, filename);
};
