import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const getByTenant = query({
    args: { tenantId: v.string() },
    handler: async (ctx, args) => {
        const pricingRules = await ctx.db
            .query("pricingRules")
            .withIndex("by_tenant", (q) => q.eq("tenantId", args.tenantId))
            .first()
        return pricingRules
    },
})

export const update = mutation({
    args: {
        tenantId: v.string(),
        laborRate: v.number(),
        partMarkup: v.number(),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("pricingRules")
            .withIndex("by_tenant", (q) => q.eq("tenantId", args.tenantId))
            .first()

        if (existing) {
            await ctx.db.patch(existing._id, {
                laborRate: args.laborRate,
                partMarkup: args.partMarkup,
                updatedAt: Date.now(),
            })
        } else {
            await ctx.db.insert("pricingRules", {
                ...args,
                updatedAt: Date.now(),
            })
        }
    },
})

