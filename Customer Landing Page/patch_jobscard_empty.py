import re

with open('src/components/worker/JobsCard.jsx', 'r') as f:
    content = f.read()

empty_state = """        {filteredJobs.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <Briefcase size={32} className="mx-auto mb-2 text-slate-300" />
            <p className="font-semibold text-slate-700">No jobs found</p>
            <p className="text-sm mt-1">Try adjusting your filters or status tabs.</p>
          </div>
        ) : (
          filteredJobs.map(job => (
"""

if "filteredJobs.length === 0" not in content:
    content = content.replace("        {filteredJobs.map(job => (", empty_state)
    content = content.replace("          </div>\n        ))}\n      </div>", "          </div>\n        ))\n        )}\n      </div>")

with open('src/components/worker/JobsCard.jsx', 'w') as f:
    f.write(content)

print("Patched JobsCard.jsx empty state.")
