"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

const SignInWithGoogle = () => {
    return (
        <Button className="w-full" variant={'outline'} onClick={() => signIn("google", { redirect: true, callbackUrl: "/profile" })}> Sign In with Google</Button>
    )
}

export default SignInWithGoogle