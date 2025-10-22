'use client'

import { AuthProvider as ReactAuthKitProvider, createStore } from 'react-auth-kit'

interface IUserData {
    id: string
    name: string
    email: string
    uuid?: string
}

const store = createStore<IUserData>({
    authName: '_auth',
    authType: 'cookie',
    cookieDomain: typeof window !== 'undefined' ? window.location.hostname : 'localhost',
    cookieSecure: typeof window !== 'undefined' ? window.location.protocol === 'https:' : false,
})

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    return (
        <ReactAuthKitProvider store={store}>
            {children}
        </ReactAuthKitProvider>
    )
}