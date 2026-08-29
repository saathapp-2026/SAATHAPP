import re

with open('src/components/professional/BookingCard.jsx', 'r') as f:
    content = f.read()

empty_state = """        {filteredBookings.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <Calendar size={32} className="mx-auto mb-2 text-slate-300" />
            <p className="font-semibold text-slate-700">No bookings found</p>
            <p className="text-sm mt-1">Try adjusting your filters or status tabs.</p>
          </div>
        ) : (
          filteredBookings.map((booking) => (
"""

if "filteredBookings.length === 0" not in content:
    content = content.replace("        {filteredBookings.map((booking) => (", empty_state)
    # The end bracket replacement is trickier, let's just use re.sub
    content = re.sub(r'(\n\s*</motion\.div>\n\s*)\)\)}', r'\1))\n        )}', content)
    # let's be more precise
    
with open('src/components/professional/BookingCard.jsx', 'w') as f:
    f.write(content)

print("Patched BookingCard.jsx empty state.")
