import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronDown,
  Download,
  FileText,
  FileSpreadsheet,
  Table2,
  FileType,
  Presentation,
  Printer,
  Braces,
  Mail,
  Share2,
} from 'lucide-react';
import ExportReportModal from './ExportReportModal';

const ITEMS = [
  { id: 'pdf', label: 'Download as PDF', icon: FileText },
  { id: 'excel', label: 'Download as Excel (.xlsx)', icon: FileSpreadsheet },
  { id: 'csv', label: 'Download as CSV', icon: Table2 },
  { id: 'word', label: 'Download as Word (.docx)', icon: FileType },
  { id: 'ppt', label: 'Download as PowerPoint (.pptx)', icon: Presentation },
  { id: 'json', label: 'Download as JSON', icon: Braces },
  { id: 'print', label: 'Print Report', icon: Printer },
  { id: 'email', label: 'Email Report', icon: Mail },
  { id: 'share', label: 'Share Report', icon: Share2 },
];

export default function ExportReportButton({
  moduleKey = 'customers',
  label = 'Export Report',
  className = '',
  defaultOpen = false,
}) {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [presetFormat, setPresetFormat] = useState('pdf');
  const ref = useRef(null);

  useEffect(() => {
    if (defaultOpen) setOpen(true);
  }, [defaultOpen]);

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  return (
    <div className={`relative ${className}`} ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        <Download className="h-4 w-4" />
        {label}
        <ChevronDown className="h-4 w-4 opacity-70" />
      </button>

      {open ? (
        <div className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl">
          {ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setPresetFormat(item.id === 'email' || item.id === 'share' ? 'pdf' : item.id);
                  setOpen(false);
                  setModalOpen(true);
                }}
                className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <Icon className="h-4 w-4 text-emerald-600" />
                {item.label}
              </button>
            );
          })}
        </div>
      ) : null}

      <ExportReportModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        moduleKey={moduleKey}
        initialFormat={presetFormat}
      />
    </div>
  );
}
