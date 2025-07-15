import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import jwt from "jsonwebtoken"

export const POST = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const phoneAuthService = req.scope.resolve("phoneAuthService") as any
  const { phone } = req.body as { phone: string }
  
  if (!phone) {
    return res.status(400).json({
      message: "Phone number is required"
    })
  }
  
  try {
    // Generate and send OTP
    const otp = await phoneAuthService.generateOtp(phone)
    
    res.json({
      message: "OTP sent successfully",
      phone: phone
    })
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to send OTP",
      error: error.message
    })
  }
}
