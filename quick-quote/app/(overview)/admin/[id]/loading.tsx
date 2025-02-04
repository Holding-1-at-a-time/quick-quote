export default function AdminOverviewLoading() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Admin Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white shadow rounded-lg p-4">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

