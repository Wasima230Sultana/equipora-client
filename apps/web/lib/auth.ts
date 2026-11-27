import { betterAuth } from "better-auth"
import { mongodbAdapter } from "@better-auth/mongo-adapter"
import { MongoClient } from "mongodb"

const client = new MongoClient(process.env.MONGODB_URL as string)
const db = client.db("equipora")


export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL, 
      account: {
  accountLinking: {
    enabled: true,
    trustedProviders: ["google"],
  },
},
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  user: {
    additionalFields: {
      role: {
        type: ["admin", "owner", "customer"],
        input: true,
        defaultValue: "customer",
      },
    },
  },
  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },

  database: mongodbAdapter(db, {
    client,
  }),
})
