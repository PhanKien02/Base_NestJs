export const genKeyActive = () => {
    var digits = '01234567899876543456789098765432123456789876543245678876543';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
};
