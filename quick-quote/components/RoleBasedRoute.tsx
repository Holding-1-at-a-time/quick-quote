import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import type React from "react" // Added import for React

interface RoleBasedRouteProps {
    children: React.ReactNode
    allowedRoles: string[]
}

export default function RoleBasedRoute({ children, allowedRoles }: RoleBasedRouteProps) {
    const { user, isLoaded } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (isLoaded && user) {
            const userRole = user.publicMetadata.role as string
            if (!allowedRoles.includes(userRole)) {
                router.push("/unauthorized")
            }
        }
    }, [isLoaded, user, allowedRoles, router])

    if (!isLoaded || !user) {
        return <div>Loading...</div>
    }

    return <>{children}</>
}

