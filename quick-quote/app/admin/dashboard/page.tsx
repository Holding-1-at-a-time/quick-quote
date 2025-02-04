import { auth } from "@clerk/nextjs/server"
import AdminDashboard from "../../../components/admin/AdminDashboard"
import RoleBasedRoute from "../../../components/RoleBasedRoute"
import { ROLES } from "../../../lib/roles"

export default function AdminDashboardPage() {
    const { userId } = auth()

    if (!userId) {
        return null
    }

    return (
        <RoleBasedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminDashboard />
        </RoleBasedRoute>
    )
}

