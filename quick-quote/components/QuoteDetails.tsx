import React from "react"
import { useQuery } from "convex/react"
import { api } from "../convex/_generated/api"
import type { Id } from "../convex/_generated/dataModel"
import LoadingSpinner from "./LoadingSpinner"

interface QuoteDetailsProps {
    quoteId: Id<"quotes">
}

export default function QuoteDetails({ quoteId }: QuoteDetailsProps) {
    const quote = useQuery(api.quotes.get, { id: quoteId })

    if (!quote) {
        return <LoadingSpinner />
    }

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Quote Details</h2>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Client Name</dt>
                    <dd className="mt-1 text-sm text-gray-900">{quote.clientName}</dd>
                </div>
                <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Total Amount</dt>
                    <dd className="mt-1 text-sm text-gray-900">${quote.totalAmount.toFixed(2)}</dd>
                </div>
                <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Vehicle Condition</dt>
                    <dd className="mt-1 text-sm text-gray-900">{quote.condition}</dd>
                </div>
                <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Repair Cost</dt>
                    <dd className="mt-1 text-sm text-gray-900">${quote.repairCost.toFixed(2)}</dd>
                </div>
                <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Labor Hours</dt>
                    <dd className="mt-1 text-sm text-gray-900">{quote.laborHours}</dd>
                </div>
                <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Created At</dt>
                    <dd className="mt-1 text-sm text-gray-900">{new Date(quote.createdAt).toLocaleString()}</dd>
                </div>
            </dl>
        </div>
    )
}

