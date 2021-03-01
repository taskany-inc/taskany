import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
    const [session, loading] = useSession();

    return (
        <header>
            <div>
                <p>
                    {!session && (
                        <>
                            <span>You are not signed in</span>
                            <a
                                href="/api/auth/signin"
                                onClick={(e) => {
                                    e.preventDefault();
                                    signIn();
                                }}
                            >
                                Sign in
                            </a>
                        </>
                    )}
                    {session && (
                        <>
                            {session.user.image && <span style={{ backgroundImage: `url(${session.user.image})` }} />}
                            <span>
                                <small>Signed in as</small>
                                <br />
                                <strong>{session.user.email || session.user.name}</strong>
                            </span>
                            <a
                                href="/api/auth/signout"
                                onClick={(e) => {
                                    e.preventDefault();
                                    signOut();
                                }}
                            >
                                Sign out
                            </a>
                        </>
                    )}
                </p>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/protected">
                            <a>Protected</a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
