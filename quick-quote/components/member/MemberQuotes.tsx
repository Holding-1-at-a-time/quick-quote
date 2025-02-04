import Link from "next/link"
import PaginatedList from "../PaginatedList"
import type { Id } from "../../convex/_generated/dataModel"

interface Quote {
    _id: Id<"quotes">
    clientName: string
    totalAmount: number
    createdAt: number
}

export default function MemberQuotes({ quotes }: { quotes: Quote[] }) {
    return (
        <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Recent Quotes</h2>
            {quotes.length === 0 ? (
                <p>No quotes yet.</p>
            ) : (
                <PaginatedList
                    items={quotes}
                    itemsPerPage={10}
                    renderItem={(quote) => (
                        <Link
                            href={`/quote/${quote._id}`}
                            className="flex justify-between items-center hover:bg-gray-50 p-2 rounded"
                        >
                            <span className="text-sm font-medium text-gray-900">{quote.clientName}</span>
                            <div className="flex flex-col items-end">
                                <span className="text-sm text-gray-500">${quote.totalAmount.toFixed(2)}</span>
                                <span className="text-xs text-gray-400">{new Date(quote.createdAt).toLocaleDateString()}</span>
                            </div>
                        </Link>
                    )}
                />
            )}
        </div>
    )
}

