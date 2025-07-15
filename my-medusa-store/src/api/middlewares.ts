import { defineMiddlewares } from "@medusajs/medusa"

export default defineMiddlewares({
  routes: [
    {
      method: "POST",
      matcher: "/admin/customers/:id",
      middlewares: [
        (req, res, next) => {
          // Prevent phone number updates through admin
          if (req.body?.phone) {
            return res.status(400).json({
              message: "Phone number cannot be updated through admin. Use phone auth endpoints.",
            })
          }
          next()
        },
      ],
    },
    {
      method: "POST",
      matcher: "/store/customers/me",
      middlewares: [
        (req, res, next) => {
          // Prevent phone number updates through store
          if (req.body?.phone) {
            return res.status(400).json({
              message: "Phone number cannot be updated through store. Use phone auth endpoints.",
            })
          }
          next()
        },
      ],
    },
  ],
})
