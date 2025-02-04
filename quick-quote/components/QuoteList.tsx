"use client"

import Link from "next/link"

export default function QuoteList({ quotes }: { quotes:unknown[] }) {
    return (
        <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Recent Quotes</h2>
            {quotes.length === 0 ? (
                <p>No quotes yet.</p>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {quotes.map((quote) => (
                        <li key={quote._id} className="py-4">
                            <Link href={`/quote/${quote._id}`} className="flex justify-between items-center hover:bg-gray-50">
                                <span className="text-sm font-medium text-gray-900">{quote.clientName}</span>
                                <span className="text-sm text-gray-500">${quote.totalAmount.toFixed(2)}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

