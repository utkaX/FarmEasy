const OTP = require('../models/otp');
const User = require('../models/user'); // Assuming you have a User model

// Endpoint to request OTP
exports.requestOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const otp = new OTP({ email });
        await otp.save();
        res.status(200).json({ message: 'OTP sent to email' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Endpoint to verify OTP
exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const otpRecord = await OTP.findOne({ email, otp, used: false });

        if (!otpRecord) {
            return res.status(400).json({ error: 'Invalid OTP or OTP expired' });
        }

        otpRecord.used = true;
        await otpRecord.save();

        // Optionally, you can now create the user or perform other actions
        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
