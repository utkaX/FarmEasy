const otp = require('../models/otp');

exports.postOtp = async (req, res) => {
    const { id } = req.params; // Extract user ID from request params
    const  otpTyped  = req.body.code; // Extract OTP typed by the user from request body

    try {
        // Find the OTP record associated with the user
        const otpRecord = await otp.findOne({ userId: id });
        // console.log(otpRecord.code)
        // console.log(req.body.code)

        if (!otpRecord) {
            return res.status(404).json({ error: 'OTP not found or expired' });
        }

        // Check if the OTP has expired
        if (new Date() > otpRecord.expiresAt) {
            return res.status(400).json({ error: 'OTP has expired' });
        }

        // Check if the OTP matches
        if (otpTyped !== otpRecord.code) {
            return res.status(400).json({ error: 'Invalid OTP' });
        }

        // OTP is valid and matches
        res.status(200).json({ message: 'OTP verified successfully' });

        // Optional: Clean up by deleting the OTP record after verification
        await otp.findByIdAndDelete(otpRecord._id);

    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
