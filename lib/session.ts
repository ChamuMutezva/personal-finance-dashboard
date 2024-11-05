import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { SessionPayload } from "./definitions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

const cookie = {
    name: "session",
    options: { httpOnly: true, secure: true, sameSite: "lax", path: "/" },
    duration: 24 * 60 * 60 * 1000,
};

export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1d")
        .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (error) {
        console.log("Failed to verify session");
    }
}

// helper function for creating a new session
export async function createSession(userId: string) {
    const expires = new Date(Date.now() + cookie.duration);
    const session = await encrypt({ userId, expires });
    cookies().set(cookie.name, session), { ...cookie.options, expires };
    redirect("/dashboard");
}

// updateSession. Checks user if session is valid
export async function verifySession() {
    const cookie = cookies().get("session")?.value;
    const session = await decrypt(cookie);
    if (!session?.userId) {
        redirect("/login");
    }
    return { userId: session.userId };
}

export async function deleteSession() {
    cookies().delete(cookie.name);
    redirect("/login");
}
