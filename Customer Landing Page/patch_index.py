import re

with open("index.html", "r") as f:
    content = f.read()

script = """
    <script>
      window.addEventListener('error', (event) => {
        const div = document.createElement('div');
        div.style.position = 'fixed';
        div.style.top = '0';
        div.style.left = '0';
        div.style.width = '100vw';
        div.style.height = '100vh';
        div.style.background = 'rgba(255,0,0,0.9)';
        div.style.color = 'white';
        div.style.zIndex = '999999';
        div.style.padding = '20px';
        div.style.fontSize = '20px';
        div.style.whiteSpace = 'pre-wrap';
        div.textContent = 'ERROR: ' + event.error?.message + '\\n\\n' + event.error?.stack;
        document.body.appendChild(div);
      });
      window.addEventListener('unhandledrejection', (event) => {
        const div = document.createElement('div');
        div.style.position = 'fixed';
        div.style.top = '0';
        div.style.left = '0';
        div.style.width = '100vw';
        div.style.height = '100vh';
        div.style.background = 'rgba(255,0,0,0.9)';
        div.style.color = 'white';
        div.style.zIndex = '999999';
        div.style.padding = '20px';
        div.style.fontSize = '20px';
        div.style.whiteSpace = 'pre-wrap';
        div.textContent = 'PROMISE REJECTION: ' + event.reason?.message + '\\n\\n' + event.reason?.stack;
        document.body.appendChild(div);
      });
    </script>
"""

if "window.addEventListener('error'" not in content:
    content = content.replace("</head>", script + "</head>")
    with open("index.html", "w") as f:
        f.write(content)
