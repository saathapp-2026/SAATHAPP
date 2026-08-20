import re

with open("src/services/authService.js", "r") as f:
    content = f.read()

config_error_block = """export class AuthConfigurationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthConfigurationError';
  }
}"""

dev_mock_block = """export class AuthConfigurationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthConfigurationError';
  }
}

const isDevMockEnabled = import.meta.env.VITE_ENABLE_DEV_MOCK_LOGIN === 'true';"""

content = content.replace(config_error_block, dev_mock_block)

request_otp_old = """export async function requestRealOtp(phone) {
  const apiUrl = getAuthApiUrl();"""

request_otp_new = """export async function requestRealOtp(phone) {
  if (isDevMockEnabled) {
    console.warn("DEV MOCK MODE: Faking OTP request for", phone);
    return new Promise(resolve => setTimeout(() => resolve({ success: true }), 1000));
  }
  const apiUrl = getAuthApiUrl();"""

content = content.replace(request_otp_old, request_otp_new)

verify_otp_old = """export async function verifyRealOtp(phone, otp) {
  const apiUrl = getAuthApiUrl();"""

verify_otp_new = """export async function verifyRealOtp(phone, otp) {
  if (isDevMockEnabled) {
    console.warn("DEV MOCK MODE: Faking OTP verification");
    return new Promise(resolve => setTimeout(() => resolve({
      user: { id: 'dev-user-1', name: 'Developer User', phone, role: 'customer' },
      token: 'mock-jwt-token-123'
    }), 1500));
  }
  const apiUrl = getAuthApiUrl();"""

content = content.replace(verify_otp_old, verify_otp_new)

google_old = """export async function authenticateWithGoogle(googleCredential) {
  const apiUrl = getAuthApiUrl();"""

google_new = """export async function authenticateWithGoogle(googleCredential) {
  if (isDevMockEnabled) {
    console.warn("DEV MOCK MODE: Faking Google Auth");
    return new Promise(resolve => setTimeout(() => resolve({
      user: { id: 'dev-google-1', name: 'Google Dev User', email: 'dev@example.com', role: 'customer' },
      token: 'mock-google-jwt-123'
    }), 1500));
  }
  const apiUrl = getAuthApiUrl();"""

content = content.replace(google_old, google_new)

with open("src/services/authService.js", "w") as f:
    f.write(content)

