import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { api } from "../../convex/_generated/api"

export default async function NotificationsPage() {
    const { userId } = auth()

    if (!userId) {
        redirect("/sign-in")
    }

    const notifications = await api.notifications.list({ userId })

    return (
        <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            {notifications.length === 0 ? (
                <p>No new notifications.</p>
            ) : (
                <ul className="space-y-2">
                    {notifications.map((notification) => (
                        <li key={notification._id} className="text-sm text-gray-600">
                            {notification.message}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

