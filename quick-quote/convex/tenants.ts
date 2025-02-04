import { ConvexError, v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const createTenant = mutation({
    args: { name: v.string() },
    handler: async (ctx, args) => {
        const tenantId = await ctx.db.insert("tenants", {
            name: args.name,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        })
        return tenantId
    },
})

export const getTenant = query({
    args: { tenantId: v.id("tenants") },
    handler: async (ctx, args) => {
        const tenant = await ctx.db.get(args.tenantId)
        if (!tenant) {
            throw new ConvexError("Tenant not found")
        }
        return tenant
    },
})

export const getTenants = query({
    args: {},
    handler: async (ctx) => {
        const tenants = await ctx.db.query("tenants").collect()
        return tenants
    },
})
