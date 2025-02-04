import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const getByTenant = query({
    args: { tenantId: v.string() },
    handler: async (ctx, args) => {
        const settings = await ctx.db
            .query("notificationSettings")
            .withIndex("by_tenant", (q) => q.eq("tenantId", args.tenantId))
            .first()
        return settings
    },
})

export const update = mutation({
    args: {
        tenantId: v.string(),
        emailNotifications: v.boolean(),
        smsNotifications: v.boolean(),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("notificationSettings")
            .withIndex("by_tenant", (q) => q.eq("tenantId", args.tenantId))
            .first()

        if (existing) {
            await ctx.db.patch(existing._id, {
                emailNotifications: args.emailNotifications,
                smsNotifications: args.smsNotifications,
                updatedAt: Date.now(),
            })
        } else {
            await ctx.db.insert("notificationSettings", {
                ...args,
                tenantId: args.tenantId,
                createdAt: Date.now(),
                updatedAt: Date.now(),})
        }
    },
})

