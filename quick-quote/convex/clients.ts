import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const listByTenant = query({
    args: { tenantId: v.string() },
    handler: async (ctx, args) => {
        const clients = await ctx.db
            .query("clients")
            .withIndex("by_tenant", (q) => q.eq("tenantId", args.tenantId))
            .order("desc")
            .take(100)
        return clients
    },
})

export const create = mutation({
    args: {
        tenantId: v.string(),
        name: v.string(),
        email: v.string(),
    },
    handler: async (ctx, args) => {
        const clientId = await ctx.db.insert("clients", {
            ...args,
            createdAt: Date.now(),
        })
        return clientId
    },
})

export const get = query({
    args: { id: v.id("clients") },
    handler: async (ctx, args) => {
        const client = await ctx.db.get(args.id)
        return client
    },
})

