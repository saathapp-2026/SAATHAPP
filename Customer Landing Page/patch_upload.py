import sys

path = 'src/components/seller/products/ProductMediaUpload.jsx'
with open(path, 'r') as f:
    content = f.read()

catch_block_old = """    } catch (err) {
      console.error('[ImageSlot] upload failed', err);
      toast.error('Upload service unavailable. Please try again later.');
      onReplace(originalItem || null);
    }"""
catch_block_new = """    } catch (err) {
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
      # Do not revoke blobUrl on failure so we can show preview
      blobUrl = '';
    }""".replace('#', '//')

content = content.replace(catch_block_old, catch_block_new)

render_old = """          {reading && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-20">
              <Loader2 size={22} className="text-white animate-spin" />
            </div>
          )}"""

render_new = """          {reading && !item.error && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-20">
              <Loader2 size={22} className="text-white animate-spin" />
            </div>
          )}
          {item.error && (
            <div className="absolute inset-0 bg-red-500/20 flex flex-col items-center justify-center z-20 backdrop-blur-[2px]">
              <span className="text-white bg-red-600 px-2 py-1 rounded text-[10px] font-bold mb-1">Upload Failed</span>
            </div>
          )}"""

content = content.replace(render_old, render_new)

with open(path, 'w') as f:
    f.write(content)
