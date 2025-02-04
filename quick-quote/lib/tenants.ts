import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'

interface TenantInfo {
  id: string
  name: string
}

export function setTenantCookie(tenantInfo: TenantInfo) {
  // Set tenant ID in a secure, HTTP-only cookie
  cookies().set('tenant-id', tenantInfo.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7 // 1 week
  })
}

export function getTenantId(): string {
  // Retrieve tenant ID from cookie or fallback
  const tenantId = cookies().get('tenant-id')?.value
  
  if (tenantId) return tenantId

  // Optional: Extract from JWT if you're using authentication tokens
  const authToken = cookies().get('auth-token')?.value
  if (authToken) {
    try {
      const decoded = jwtDecode<{ tenantId?: string }>(authToken)
      return decoded.tenantId || 'default-tenant'
    } catch {
      // Token decoding failed
      return 'default-tenant'
    }
  }

  return 'default-tenant'
}

export function clearTenantCookie() {
  // Method to clear tenant cookie during logout
  cookies().delete('tenant-id')
}