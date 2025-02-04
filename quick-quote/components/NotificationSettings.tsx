"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

// Define the interface for notification settings
interface NotificationSettingsType {
    emailNotifications?: boolean
    smsNotifications?: boolean
}

export default function NotificationSettings() {
    const { user } = useUser()
    const tenantId = user?.publicMetadata.tenantId as string
    const notificationSettings = useQuery(api.notificationSettings.getByTenant, { tenantId }) || {}
    const updateNotificationSettings = useMutation(api.notificationSettings.update)

    const [settings, setSettings] = useState<NotificationSettingsType>(notificationSettings)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target
        setSettings((prevSettings) => ({ ...prevSettings, [name]: checked }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await updateNotificationSettings({ tenantId, settings })
            alert("Notification settings updated successfully")
        } catch (error) {
            console.error("Error updating notification settings:", error)
            alert("Failed to update notification settings")
        }
    }

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="emailNotifications"
                        name="emailNotifications"
                        checked={settings.emailNotifications || false}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-900">
                        Email Notifications
                    </label>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="smsNotifications"
                        name="smsNotifications"
                        checked={settings.smsNotifications || false}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="smsNotifications" className="ml-2 block text-sm text-gray-900">
                        SMS Notifications
                    </label>
                </div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Update Notification Settings
                </button>
            </form>
        </div>
    )
}
