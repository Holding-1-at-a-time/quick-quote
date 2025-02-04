"use client"

import { useState } from "react"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
export default function QuoteGenerator({ imageId }: { imageId: string }) {
    const [generating, setGenerating] = useState(false)
    const generateQuote = useMutation(api.quotes.generate)
    const quote = useQuery(api.quotes.get, { imageId })

    const handleGenerateQuote = async () => {
        setGenerating(true)
        try {
            await generateQuote({ imageId })
        } catch (error) {
            console.error("Error generating quote:", error)
        }
        setGenerating(false)
    }

    if (!quote) {
        return (
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Generate Quote</h2>
                <button
                    onClick={handleGenerateQuote}
                    disabled={generating}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                >
                    {generating ? "Generating..." : "Generate Quote"}
                </button>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Quote Details</h2>
            <div className="bg-white shadow rounded-lg p-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Vehicle Condition</dt>
                        <dd className="mt-1 text-sm text-gray-900">{quote.condition}</dd>
                    </div>
                    <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Estimated Repair Cost</dt>
                        <dd className="mt-1 text-sm text-gray-900">${quote.repairCost.toFixed(2)}</dd>
                    </div>
                    <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Labor Hours</dt>
                        <dd className="mt-1 text-sm text-gray-900">{quote.laborHours}</dd>
                    </div>
                    <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Total Amount</dt>
                        <dd className="mt-1 text-sm text-gray-900">${quote.totalAmount.toFixed(2)}</dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}

