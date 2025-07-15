import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const phoneAuthService = req.scope.resolve("phoneAuthService") as any
  const twilioSmsService = req.scope.resolve("twilioSmsService") as any
  
  try {
    // Test phone auth service
    const testOtp = await phoneAuthService.generateOtp("+1234567890")
    
    // Test Twilio service (without actually sending SMS)
    const twilioStatus = twilioSmsService ? "Connected" : "Not available"
    
    res.json({
      status: "success",
      message: "Phone auth services are working",
      services: {
        phoneAuth: "Available",
        twilioSms: twilioStatus
      },
      testOtp: testOtp,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: "Phone auth test failed",
      error: error.message
    })
  }
}
