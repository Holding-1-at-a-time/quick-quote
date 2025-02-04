import { v } from "convex/values"
import { mutation, MutationCtx, query } from "./_generated/server"
import { ConvexHttpClient } from "convex/browser";
import { Id } from "./_generated/dataModel";


export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl()
});

export const sendImage = mutation({
    args: {
        storageId: v.id("_storage"),
        author: v.string(),
        tenantId: v.id("tenants"),
        image: v.string(),
        imageId: v.string(),
    },
    handler: async (
        ctx: MutationCtx,
        args: {
            storageId: Id<"_storage">;
            author: string;
            tenantId: Id<"tenants">;
            image: string;
            imageId: string;
        }): Promise<void> => {
        await ctx.db.insert("images", {
            storageId: args.storageId,
            author: args.author,
            tenantId: args.tenantId,
            url: args.image,
            imageId: args.imageId
        });
    },
            /**
             * Set a new image.
             *
             * @param imageId - The ID of the new image.
             */
     set Id<'images'>(imageId: Id<"images">): void {
    if (this.ImageId !== imageId) {
        this.ImageId = imageId;
    }
}   
    },
});

export const uploadImage = mutation({
    args: {
        tenantId: v.id("tenants"),
        url: v.string(),
        name: v.string(),
        image: v.binary(),
    },
    handler: async (ctx, args) => {
        const client = new ConvexHttpClient(ctx.auth);
        const data = new FormData();
        data.append("tenantId", args.tenantId.toString());
        data.append("url", args.url);
        data.append("name", args.name);
        data.append("image", args.image);

        const response = await client.post("/images", data);
        return response.json();
    },
});

export const get = query({
    args: { id: v.id("images") },
    handler: async (ctx, args) => {
        const image = await ctx.db.get(args.id)
        return image
    },
})

export const deleteImage = mutation({
    args: { id: v.id("images") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id)
    },
})

