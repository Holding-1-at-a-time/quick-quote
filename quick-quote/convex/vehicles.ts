import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { ConvexError } from "convex/values"

export const createVehicle = mutation({
    args: {
        clientId: v.id("clients"),
        make: v.string(),
        model: v.string(),
        year: v.number(),
        imageUrl: v.string(),
    },
    handler: async (ctx, args) => {
        const client = await ctx.db.get(args.clientId)
        if (!client) {
            throw new ConvexError("Client not found")
        }

        const vehicleId = await ctx.db.insert("vehicles", {
            clientId: args.clientId,
            make: args.make,
            model: args.model,
            year: args.year,
            imageUrl: args.imageUrl,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        })
        return vehicleId
    },
})

export const getVehiclesByClient = query({
    args: { clientId: v.id("clients") },
    handler: async (ctx, args) => {
        const vehicles = await ctx.db
            .query("vehicles")
            .withIndex("by_client", (q) => q.eq("clientId", args.clientId))
            .collect()
        return vehicles
    },
})

