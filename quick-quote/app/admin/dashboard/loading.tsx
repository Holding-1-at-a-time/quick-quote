import LoadingSpinner from "../../../components/LoadingSpinner"

export default function AdminDashboardLoading() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <div className="bg-white shadow rounded-lg p-4">
                <LoadingSpinner />
            </div>
        </div>
    )
}

