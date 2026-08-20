import os

file_path = "src/main.jsx"
with open(file_path, "r") as f:
    content = f.read()

content = content.replace("import App from './App.jsx';", "import App from './App.jsx';\nimport { GoogleOAuthProvider } from '@react-oauth/google';")
content = content.replace("<App />", "<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || 'missing-client-id'}><App /></GoogleOAuthProvider>")

with open(file_path, "w") as f:
    f.write(content)

print("Patched main.jsx")
