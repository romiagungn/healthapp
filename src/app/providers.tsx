"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StyleProvider, createCache } from "@ant-design/cssinjs";
import { App as AntdApp } from "antd";
import { SessionProvider } from "next-auth/react";
import { AntdRegistry } from '@ant-design/nextjs-registry';

const queryClient = new QueryClient();
const cache = createCache();

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                <StyleProvider cache={cache}>
                    <AntdRegistry>
                        <AntdApp>{children}</AntdApp>
                    </AntdRegistry>
                </StyleProvider>
            </QueryClientProvider>
        </SessionProvider>
    );
};

export default Providers;
