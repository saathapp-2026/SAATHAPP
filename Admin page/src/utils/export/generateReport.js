import { generateCSV } from "./exportCSV.js";
import { generateExcel } from "./exportExcel.js";
import { generatePDF } from "./exportPDF.js";
import { formatDate } from "./downloadHelper.js";

const buildFilename = ({ reportId, format }) => {
  const date = formatDate(new Date());
  const normalized = reportId.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  const extension = format === "excel" ? "xlsx" : format;
  return `${normalized}-${date}.${extension}`;
};

export const generateReport = async ({ reportId, title, headers, rows, summary, format }) => {
  const filename = buildFilename({ reportId, format });
  if (format === "csv") {
    generateCSV({ headers, rows, filename });
    return;
  }
  if (format === "excel") {
    generateExcel({ headers, rows, filename, sheetName: title || reportId });
    return;
  }
  if (format === "pdf") {
    generatePDF({ title: title || reportId, summary, headers, rows, filename });
    return;
  }
  throw new Error(`Unsupported format: ${format}`);
};
