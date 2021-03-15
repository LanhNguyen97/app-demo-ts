import React from "react";
import { NextPageContext } from "next";
import { checkToken } from "./utils";

interface Context extends NextPageContext {
    // any modifications to the default context, e.g. query types
}

const withAuth = (WrapperComponent: any) => {
    const wrapper = (props: any) => {
        return <WrapperComponent {...props} />;
    };

    wrapper.getInitialProps = async (ctx: Context) => {
        checkToken(ctx);
        return {};
    };

    return wrapper;
};

export default withAuth;
