import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { handleError } from "@/lib/errorHandlers"
import { logger } from "@/lib/logger"
import { getTenantId } from "@/lib/tenants"
import { ConvexHttpClient } from "convex/browser"

async function getQuoteDetails(id: string) {
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

    try {
        const tenantId = getTenantId()

        const quoteDetails = await convex.query(api.quotes.getQuoteDetails, {
            quoteId: id as Id<"quotes">,
            tenantId: tenantId
        })

        return { quoteDetails }
    } catch (error) {
        const appError = handleError(error)
        logger.error(`Failed to fetch quote details: ${appError.message}`, {
            quoteId: id,
            stack: appError.stack,
        })

        return { error: appError.message }
    }
}

export default async function QuoteDetailPage({
    params
}: {
    params: { id: string }
}) {
    const { quoteDetails, error } = await getQuoteDetails(params.id)

    if (error) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold text-red-500">Error</h1>
                <p>{error}</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Quote Details</h1>
            {quoteDetails && (
                <div>
                    <div>
                        <h2 className="text-xl font-semibold">Quote Information</h2>
                        <p>Amount: ${quoteDetails.quote.amount}</p>
                        <p>Status: {quoteDetails.quote.status}</p>
                        <p>Created At: {new Date(quoteDetails.quote.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold">Vehicle Details</h2>
                        <p>Make: {quoteDetails.vehicle.make}</p>
                        <p>Model: {quoteDetails.vehicle.model}</p>
                        <p>Year: {quoteDetails.vehicle.year}</p>
                    </div>
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold">Client Information</h2>
                        <p>Name: {quoteDetails.client.name}</p>
                        <p>Email: {quoteDetails.client.email}</p>
                    </div>
                </div>
            )}
        </div>
    )
}
