with open('src/services/advertisementsService.js', 'r') as f:
    content = f.read()

# Replace the second description
lines = content.split('\n')
for i, line in enumerate(lines):
    if "description: ''," in line and i > 555:
        lines.pop(i)
        break

with open('src/services/advertisementsService.js', 'w') as f:
    f.write('\n'.join(lines))
