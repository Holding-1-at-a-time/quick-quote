import { v } from "convex/values"
import { mutation, MutationCtx, query } from "./_generated/server"
import { Id } from "./_generated/dataModel"
export const getByTenant = query({
    /**
     * Gets the pricing rules for a given tenant.
     *
     * @param {Id<"tenants">} tenantId - The tenant ID for the rules to get.
     * @returns {Promise<PricingRules | null>} The pricing rules for the tenant, or null if none exist.
     */
    args: {
        tenantId: v.id("tenants")
    },
    handler: async (ctx, args) => {
        const pricingRules = await ctx.db
            .query("pricingRules")
            .withIndex("by_tenant", (q) => q.eq("tenantId", args.tenantId))
            .first()
        return pricingRules
    },
})

export const update = mutation({
    /**
     * Updates the pricing rules for a given tenant, or creates a new one if none
     * exist.
     *
     * @param {Id<"tenants">} tenantId - The tenant ID for the rules to update.
     * @param {number} laborRate - The labor rate to update.
     * @param {number} partMarkup - The part markup to update.
     * @param {number} materialMarkup - The material markup to update.
     * @returns {Promise<PricingRules | null>} The updated or created pricing rules, or null if creation failed.
     */
    args: { tenantId: v.id("tenants"),
            laborRate: v.number(),
            partMarkup: v.number(),
            materialMarkup: v.number(),
                },
    handler: async (
        ctx: MutationCtx,
        args: {
            tenantId: Id<"tenants">,
            laborRate: number,
            partMarkup: number,
            materialMarkup: number
        }
    ): Promise<pricing | null> => {
        const existing: PricingRules | null = await ctx.db
            .query("pricingRules")
            .withIndex("by_tenant", (q) => q.eq("tenantId", args.tenantId))
            .first()

        if (existing) {
            await ctx.db.patch(existing._id, {
                laborRate: args.laborRate,
                partMarkup: args.partMarkup,
                materialMarkup: args.materialMarkup,
            })
            return existing
        } else {
            const newPricingRulesId: Id<"pricingRules"> = await ctx.db.insert("pricingRules", {
                tenantId: args.tenantId,
                laborRate: args.laborRate,
                partMarkup: args.partMarkup,
                materialMarkup: args.materialMarkup,
            })
            return newPricingRulesId ? await ctx.db.get(newPricingRulesId) : null
        }
    },
})

export const pricing = query({
    /**
     * Gets the pricing rules for a given tenant.
     *
     * @param {Id<"tenants">} tenantId - The tenant ID for the rules to get.
     * @returns {Promise<PricingRules | null>} The pricing rules for the tenant, or null if none exist.
     */
    args: { tenantId: v.id("tenants"),
        },
    handler: async (ctx, args) => {
        const pricingRules = await ctx.db
            .query("pricingRules")
            .withIndex("by_tenant", (q) => q.eq("tenantId", args.tenantId))
            .first()
        return pricingRules
    },
})

