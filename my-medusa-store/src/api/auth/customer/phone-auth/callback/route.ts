import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const phoneAuthService = req.scope.resolve("phoneAuthService") as any
  const { phone, otp } = req.query as { phone: string, otp: string }
  
  if (!phone || !otp) {
    return res.status(400).json({
      message: "Phone number and OTP are required"
    })
  }
  
  try {
    // Verify OTP
    const isValid = await phoneAuthService.verifyOtp(phone, otp)
    
    if (isValid) {
      res.json({
        message: "OTP verified successfully",
        phone: phone,
        verified: true
      })
    } else {
      res.status(400).json({
        message: "Invalid or expired OTP",
        verified: false
      })
    }
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to verify OTP",
      error: error.message
    })
  }
}
