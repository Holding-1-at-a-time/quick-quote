import { auth } from "@clerk/nextjs/server"
import RoleBasedRoute from "../../../components/RoleBasedRoute"
import { ROLES } from "../../../lib/roles"
import PredictiveAnalytics from "../../../components/admin/PredictiveAnalytics"

export default function AnalyticsPage() {
    const { userId } = auth()

    if (!userId) {
        return null
    }

    return (
        <RoleBasedRoute allowedRoles={[ROLES.ADMIN]}>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold">AI Predictive Analytics</h1>
                <PredictiveAnalytics />
            </div>
        </RoleBasedRoute>
    )
}

