import Link from "next/link"
import { UserButton, SignInButton, useUser } from "@clerk/nextjs"
import { ROLES } from "../lib/roles"

export default function Header() {
    const { isSignedIn, user } = useUser()

    const userRole = user?.publicMetadata.role as string

    return (
        <header className="bg-white shadow-md">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-blue-600">
                    QuickQuote
                </Link>
                <div className="flex items-center space-x-4">
                    {isSignedIn ? (
                        <>
                            {userRole === ROLES.ADMIN && (
                                <>
                                    <Link href="/admin/dashboard" className="text-gray-600 hover:text-blue-600">
                                        Admin Dashboard
                                    </Link>
                                    <Link href="/admin/users" className="text-gray-600 hover:text-blue-600">
                                        User Management
                                    </Link>
                                    <Link href="/admin/analytics" className="text-gray-600 hover:text-blue-600">
                                        Analytics
                                    </Link>
                                </>
                            )}
                            {userRole === ROLES.CLIENT && (
                                <>
                                    <Link href="/client/dashboard" className="text-gray-600 hover:text-blue-600">
                                        Dashboard
                                    </Link>
                                    <Link href="/client/upload" className="text-gray-600 hover:text-blue-600">
                                        Upload Image
                                    </Link>
                                </>
                            )}
                            {userRole === ROLES.MEMBER && (
                                <Link href="/member/dashboard" className="text-gray-600 hover:text-blue-600">
                                    Dashboard
                                </Link>
                            )}
                            <UserButton afterSignOutUrl="/" />
                        </>
                    ) : (
                        <SignInButton mode="modal">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Sign In</button>
                        </SignInButton>
                    )}
                </div>
            </nav>
        </header>
    )
}

