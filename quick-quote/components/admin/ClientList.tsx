import Link from "next/link"
import PaginatedList from "../PaginatedList"
import type { Id } from "../../convex/_generated/dataModel"

interface Client {
    _id: Id<"clients">
    name: string
    email: string
}

export default function ClientList({ clients }: { clients: Client[] }) {
    return (
        <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Clients</h2>
            {clients.length === 0 ? (
                <p>No clients yet.</p>
            ) : (
                <PaginatedList
                    items={clients}
                    itemsPerPage={10}
                    renderItem={(client) => (
                        <Link
                            href={`/client/${client._id}`}
                            className="flex justify-between items-center hover:bg-gray-50 p-2 rounded"
                        >
                            <span className="text-sm font-medium text-gray-900">{client.name}</span>
                            <span className="text-sm text-gray-500">{client.email}</span>
                        </Link>
                    )}
                />
            )}
        </div>
    )
}

