// app/layout.js
"use client"; // Ensure this is at the top of the file

import { SessionProvider } from 'next-auth/react';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <SessionProvider>{children}</SessionProvider>
            </body>
        </html>
    );
}
