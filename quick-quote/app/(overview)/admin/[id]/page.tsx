import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { api } from "../../../../convex/_generated/api"

export default async function AdminOverviewPage() {
    const { userId } = auth()

    if (!userId) {
        redirect("/sign-in")
    }

    const stats = await api.admin.getOverviewStats()

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Admin Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white shadow rounded-lg p-4">
                    <h2 className="text-lg font-semibold mb-2">Total Users</h2>
                    <p className="text-3xl font-bold">{stats.totalUsers}</p>
                </div>
                <div className="bg-white shadow rounded-lg p-4">
                    <h2 className="text-lg font-semibold mb-2">Total Quotes</h2>
                    <p className="text-3xl font-bold">{stats.totalQuotes}</p>
                </div>
                <div className="bg-white shadow rounded-lg p-4">
                    <h2 className="text-lg font-semibold mb-2">Total Revenue</h2>
                    <p className="text-3xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
                </div>
            </div>
        </div>
    )
}

