import React, { useRef } from 'react';
import { UploadCloud } from 'lucide-react';

export default function UploadSection({ draft, updateDraft }) {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      updateDraft({ mediaFile: file });
    }
  };

  return (
    <div className="space-y-6 pt-4">
      <h2 className="text-xl font-bold text-slate-900 tracking-tight border-t border-slate-200 pt-8">3. Upload Advertisement</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Upload Box */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Upload Banner / Image / Video <span className="text-rose-500">*</span></label>
          <div 
            className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99] w-full h-64 rounded-2xl border-2 border-dashed border-slate-300 hover:border-[#15803D] bg-page flex flex-col items-center justify-center text-center transition-colors cursor-pointer"
            onClick={handleUploadClick}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none hidden" 
              accept="image/*,video/*"
              onChange={handleFileChange}
            />
            <UploadCloud size={40} className="text-slate-400 mb-4" strokeWidth={1.5} />
            <p className="text-sm font-medium text-slate-600 mb-2">Drag & drop your file here</p>
            <p className="text-xs text-slate-400 mb-4">or</p>
            <button className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none px-6 py-2 bg-[#15803D] hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors">
              Choose File
            </button>
            {draft.mediaFile && (
              <p className="text-xs text-[#15803D] font-medium mt-4">{draft.mediaFile.name}</p>
            )}
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Supported: JPG, PNG, WebP | Max Size: 10MB | Recommended Size: 1200x800 px</p>
        </div>

        {/* Links & Details */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Ad Link (URL / Destination)</label>
            <input 
              type="text" 
              placeholder="https://saathapp.in/store/your-store"
              className="transition-colors duration-200 focus:ring-emerald-500/20 focus:border-emerald-500 w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#15803D]/20 focus:border-[#15803D] transition-all bg-white"
              value={draft.adLink || ''}
              onChange={(e) => updateDraft({ adLink: e.target.value })}
            />
            <p className="text-xs text-slate-500 font-medium">Enter landing page URL (optional)</p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Ad Description (Optional)</label>
            <textarea 
              placeholder="Enter ad description"
              rows={4}
              maxLength={200}
              className="transition-colors duration-200 focus:ring-emerald-500/20 focus:border-emerald-500 w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#15803D]/20 focus:border-[#15803D] transition-all bg-white resize-none"
              value={draft.description || ''}
              onChange={(e) => updateDraft({ description: e.target.value })}
            />
            <div className="text-right text-[11px] font-medium text-slate-400">
              {(draft.description || '').length}/200
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
