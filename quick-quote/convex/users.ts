import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const createUser = mutation({
    args: { name: v.string(), email: v.string(), tenantId: v.string() },
    handler: async (ctx, args) => {
        try {
            const userId = await ctx.db.insert("users", {
                name: args.name,
                email: args.email,
                tenantId: args.tenantId,
            })
            return { success: true, userId }
        } catch (error) {
            console.error("Error creating user:", error)
            return { success: false, error: "Failed to create user" }
        }
    },
})

export const getUsersByTenant = query({
    args: { tenantId: v.string() },
    handler: async (ctx, args) => {
        try {
            const users = await ctx.db
                .query("users")
                .withIndex("by_tenant", (q) => q.eq("tenantId", args.tenantId))
                .collect()
            return { success: true, users }
        } catch (error) {
            console.error("Error fetching users:", error)
            return { success: false, error: "Failed to fetch users" }
        }
    },
})

