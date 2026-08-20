import os

file_path = "src/services/authService.js"
with open(file_path, "r") as f:
    content = f.read()

new_content = """
// --- Genuine Customer Authentication ---
export class AuthConfigurationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthConfigurationError';
  }
}

function getAuthApiUrl() {
  const url = import.meta.env.VITE_AUTH_API_URL;
  if (!url) {
    throw new AuthConfigurationError('VITE_AUTH_API_URL is missing. Please configure your backend API for authentication.');
  }
  return url;
}

export async function requestRealOtp(phone) {
  const apiUrl = getAuthApiUrl();
  const response = await fetch(`${apiUrl}/api/auth/otp/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone: `+91${phone}` })
  });
  if (!response.ok) {
    throw new Error('Failed to request OTP');
  }
  return response.json();
}

export async function verifyRealOtp(phone, otp) {
  const apiUrl = getAuthApiUrl();
  const response = await fetch(`${apiUrl}/api/auth/otp/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone: `+91${phone}`, otp })
  });
  if (!response.ok) {
    throw new Error('Invalid or expired OTP');
  }
  return response.json(); // Expected to return { user, token }
}

export async function authenticateWithGoogle(googleCredential) {
  const apiUrl = getAuthApiUrl();
  const response = await fetch(`${apiUrl}/api/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ credential: googleCredential })
  });
  if (!response.ok) {
    throw new Error('Google authentication failed');
  }
  return response.json(); // Expected to return { user, token }
}
"""

with open(file_path, "a") as f:
    f.write("\n" + new_content + "\n")
print("Appended genuine auth to authService.js")
