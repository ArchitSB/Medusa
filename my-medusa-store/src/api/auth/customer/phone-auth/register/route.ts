import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const POST = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const phoneAuthService = req.scope.resolve("phoneAuthService") as any
  const { phone, first_name, last_name } = req.body as { 
    phone: string, 
    first_name?: string, 
    last_name?: string 
  }
  
  if (!phone) {
    return res.status(400).json({
      message: "Phone number is required"
    })
  }
  
  try {
    // Register customer with phone number
    const customer = await phoneAuthService.registerCustomer({
      phone,
      first_name,
      last_name
    })
    
    res.json({
      message: "Customer registered successfully",
      customer: {
        id: customer.id,
        phone: customer.phone,
        first_name: customer.first_name,
        last_name: customer.last_name
      }
    })
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to register customer",
      error: error.message
    })
  }
}
