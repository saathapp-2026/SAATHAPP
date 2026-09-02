import re

with open('./src/services/authService.js', 'r') as f:
    content = f.read()

# Replace requestRealOtp
content = re.sub(
    r'export async function requestRealOtp.*?return response\.json\(\);\n}',
    """export async function requestRealOtp(phone) {
  // STRICT MOCK FOR STEP 4
  console.warn("MOCK MODE: Faking OTP request for", phone);
  return new Promise(resolve => setTimeout(() => resolve({ success: true }), 500));
}""",
    content,
    flags=re.DOTALL
)

# Replace verifyRealOtp
content = re.sub(
    r'export async function verifyRealOtp.*?return response\.json\(\); // Expected to return \{ user, token \}\n}',
    """export const TEST_OTP = '123456';
export async function verifyRealOtp(phone, otp) {
  // STRICT MOCK FOR STEP 4
  console.warn("MOCK MODE: Faking OTP verification");
  return new Promise((resolve, reject) => setTimeout(() => {
    if (otp !== TEST_OTP) {
      reject(new Error('Invalid OTP. Please enter 123456 for testing.'));
    } else {
      resolve({
        user: { id: 'mock-user-1', name: 'Test User', phone, role: 'customer' },
        token: 'mock-jwt-token-123'
      });
    }
  }, 500));
}""",
    content,
    flags=re.DOTALL
)

with open('./src/services/authService.js', 'w') as f:
    f.write(content)
