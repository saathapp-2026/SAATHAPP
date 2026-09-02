const fs = require('fs');

const path = 'src/components/seller/products/ProductMediaUpload.jsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/catch \(err\) \{\n\s+console.error\('\[ImageSlot\] upload failed', err\);\n\s+toast\.error\('Upload service unavailable\. Please try again later\.'\);\n\s+onReplace\(originalItem \|\| null\);\n\s+\}/, `catch (err) {
      console.error('[ImageSlot] upload failed', err);
      toast.error('Upload service unavailable. Please try again later.');
      onReplace({
        id,
        url: blobUrl,
        name: file.name || 'image.jpg',
        progress: 0,
        error: true,
        mimeType: file.type || 'image/jpeg',
        size: file.size,
      });
      // Do not revoke blobUrl on failure so we can still show the failed preview
      blobUrl = ''; 
    }`);

content = content.replace(/\{reading && \(\n\s+<div className="absolute inset-0 bg-black\/30 flex items-center justify-center z-20">\n\s+<Loader2 size=\{22\} className="text-white animate-spin" \/>\n\s+<\/div>\n\s+\)\}/, `{reading && !item.error && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-20">
              <Loader2 size={22} className="text-white animate-spin" />
            </div>
          )}
          {item.error && (
            <div className="absolute inset-0 bg-red-500/20 flex flex-col items-center justify-center z-20 backdrop-blur-[2px]">
              <span className="text-white bg-red-600 px-2 py-1 rounded text-[10px] font-bold mb-1">Upload Failed</span>
            </div>
          )}`);

fs.writeFileSync(path, content);
