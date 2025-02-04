import type React from "react"
import { useState } from "react"

interface PaginatedListProps<T> {
    items: T[]
    itemsPerPage: number
    renderItem: (item: T) => React.ReactNode
}

export default function PaginatedList<T>({ items, itemsPerPage, renderItem }: PaginatedListProps<T>) {
    const [currentPage, setCurrentPage] = useState(1)

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem)

    const totalPages = Math.ceil(items.length / itemsPerPage)

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }

    return (
        <div>
            <div className="space-y-4">
                {currentItems.map((item, index) => (
                    <div key={index}>{renderItem(item)}</div>
                ))}
            </div>
            <div className="mt-4 flex justify-center">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`mx-1 px-3 py-1 rounded ${currentPage === pageNumber ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>
        </div>
    )
}

