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
    duration: 60 * 60 * 1000,
};

export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1h")
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
        return null;
    }
}

// helper function for creating a new session
export async function createSession(userId: string) {
    const expires = new Date(Date.now() + 60 * 60 * 1000);
    const session = await encrypt({ userId, expires });

    cookies().set("session", session, {
        httpOnly: true,
        secure: true,
        expires: expires,
        sameSite: "lax",
        path: "/",
    });
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

export async function updateSession() {
    const session = cookies().get("session")?.value;
    const payload = await decrypt(session);

    if (!session || !payload) {
        return null;
    }

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    cookies().set("session", session, {
        httpOnly: true,
        secure: true,
        expires: expires,
        sameSite: "lax",
        path: "/",
    });
}

export async function deleteSession() {
    cookies().delete(cookie.name);
    redirect("/login");
}
