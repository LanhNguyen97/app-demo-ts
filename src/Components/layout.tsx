import React from "react";
import { useDispatch } from "react-redux";
import { authenticateUser } from "@Actions";
import Header from "./Header";
import { LayoutProps } from "./Layout/Layout";

const Layout: React.FC<LayoutProps> = ({ children, home }) => {
    const dispatch = useDispatch();
    dispatch(authenticateUser());

    return (
        <div>
            <Header />
            <main>{children}</main>
        </div>
    );
};

export default Layout;
