export const ROLES = {
    ADMIN: "admin",
    CLIENT: "client",
    MEMBER: "member",
}

export const isAuthorized = (userRole: string, allowedRoles: string[]): boolean => {
    return allowedRoles.includes(userRole)
}

