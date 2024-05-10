/* eslint-disable prettier/prettier */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
}
export function validateNigerianPhoneNumber(phoneNumber: string): boolean {
  const phoneRegex = /^0[789][01]\d{8}$/;

  return phoneRegex.test(phoneNumber);
}

export function generateOTP(): string {
    let otp = "";
    for (let i = 0; i < 4; i++) {
        otp += Math.floor(Math.random() * 10);
    }
    return otp;
}