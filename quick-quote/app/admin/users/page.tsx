import { auth } from "@clerk/nextjs/server"
import RoleBasedRoute from "../../../components/RoleBasedRoute"
import { ROLES } from "../../../lib/roles"
import UserManagement from "../../../components/admin/UserManagement"

export default function UserManagementPage() {
    const { userId } = auth()

    if (!userId) {
        return null
    }

    return (
        <RoleBasedRoute allowedRoles={[ROLES.ADMIN]}>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold">User Management</h1>
                <UserManagement />
            </div>
        </RoleBasedRoute>
    )
}

