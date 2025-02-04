import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const createQuote = mutation({
  args: {
    tenantId: v.id("tenants"),
    clientName: v.string(),
    totalAmount: v.number(),
    condition: v.string(),
    repairCost: v.number(),
    laborHours: v.number(),
    imageId: v.id("images"),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("quotes", {
      tenantId: args.tenantId,
      clientName: args.clientName,
      totalAmount: args.totalAmount,
      condition: args.condition,
      repairCost: args.repairCost,
      laborHours: args.laborHours,
      imageId: args.imageId,
    })
  },
})

export const updateQuote = mutation({
  args: {
    quoteId: v.id("quotes"),
    clientName: v.string(),
    totalAmount: v.number(),
    condition: v.string(),
    repairCost: v.number(),
    laborHours: v.number(),
    imageId: v.id("images"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      clientName: args.clientName,
      totalAmount: args.totalAmount,
      condition: args.condition,
      repairCost: args.repairCost,
      laborHours: args.laborHours,
      imageId: args.imageId,
    })
  },
})

export const listByTenant = query({
  args: { tenantId: v.string() },
  handler: async (ctx, args) => {
    const quotes = await ctx.db
      .query("quotes")
      .withIndex("by_tenant", (q) => q.eq("tenantId", args.tenantId))
      .order("desc")
      .take(100)
    return quotes
  },
})

export const getQuote = query({
  args: { quoteId: v.id("quotes") },
  handler: async (ctx, args) => {
    const quote = await ctx.db.get(args.quoteId)
    return quote
  },
})

export const deleteQuote = mutation({
  args: { quoteId: v.id("quotes") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.quoteId)
  },
})
