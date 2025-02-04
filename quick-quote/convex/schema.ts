import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
    quotes: defineTable({
        tenantId: v.id("tenants"),
        clientName: v.string(),
        totalAmount: v.number(),
        condition: v.string(),
        repairCost: v.number(),
        laborHours: v.number(),
        imageId: v.string(),
        createdAt: v.number(),
    }).index("by_tenant", ["tenantId"]),

    clients: defineTable({
        tenantId: v.id("tenants"),
        name: v.string(),
        email: v.string(),
        createdAt: v.number(),
    }).index("by_tenant", ["tenantId"]),

    pricingRules: defineTable({
        tenantId: v.id("tenants"),
        laborRate: v.number(),
        partMarkup: v.number(),
        materialMarkup: v.number(),
    }).index("by_tenant", ["tenantId"]),

    notificationSettings: defineTable({
        tenantId: v.id("tenants"),
        emailNotifications: v.boolean(),
        smsNotifications: v.boolean(),
        updatedAt: v.number(),
    }).index("by_tenant", ["tenantId"]),

    languageSettings: defineTable({
        tenantId: v.id("tenants"),
        language: v.string(),
        updatedAt: v.number(),
    }).index("by_tenant", ["tenantId"]),

    images: defineTable({
        tenantId: v.id("tenants"),
        name: v.string(),
        author: v.string(),
        storageId: v.id("_storage"),
        url: v.string(),
        image: v.bytes(),
    }).index("by_tenant", ["tenantId"])
        .index("by_name_and_tenant", ["name", "tenantId"]),

    vehicles: defineTable({
        tenantId: v.id("tenants"),
        clientId: v.id("clients"),
        make: v.string(),
        model: v.string(),
        year: v.number(),
        vin: v.string(),
        color: v.string(),
        condition: v.string(),
        bodyType: v.union(
            v.literal("Sedan"),
            v.literal("SUV"),
            v.literal("Truck"),
            v.literal("Van"),
            v.literal("Wagon"),
            v.literal("Coupe"),
            v.literal("Convertible"),
            v.literal("Hatchback"),
            v.literal("Minivan"),
            v.literal("Pickup"),
            v.literal("Sports Car"),
            v.literal("Sports Utility Vehicle"),
            v.literal("Utility Vehicle")
        ),
    }).index("by_tenant", ["tenantId"])
        .index("by_client", ["clientId"]),

    tenants: defineTable({
        businessName: v.string(),
        name: v.string(),
        imageId: v.id("images"),
        email: v.string(),
        address: v.string(),
        phoneNumber: v.string(),
    }).index("by_name", ["name"]),

    Storage: defineTable({
        tenantId: v.id("tenants"),
        author: v.string(),
        image: v.bytes(),
        url: v.string(),
        imageId: v.string(),

    })
})


