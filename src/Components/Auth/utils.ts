/* eslint-disable no-lonely-if */
/* eslint-disable no-empty */
/* eslint-disable radix */
import nextCookie from "next-cookies";
import router from "next/router";
import { verifyToken } from "@Utils/token";
import { NextPageContext } from "next";

interface Context extends NextPageContext {
    // any modifications to the default context, e.g. query types
}

export const checkToken = (ctx: Context) => {
    const { token } = nextCookie(ctx);
    const { pathname } = ctx;
    let isValidToken = false;

    if (token) {
        const decode = verifyToken(token);
        const { userId, exp } = decode;

        if (userId && parseInt(exp) >= Date.now() / 1000) {
            isValidToken = true;
        }
    }

    if (!token || !isValidToken) {
        if (ctx.res) {
            if (pathname.includes("sign-in")) {
            } else {
                ctx.res.writeHead(302, { Location: "/sign-in" });
                ctx.res.end();
            }
        } else {
            if (pathname.includes("sign-in")) {
            } else {
                router.push("/sign-in");
            }
        }
    }

    return { isValidToken };
};
