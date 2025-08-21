"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Card, Typography, Alert, App, Tooltip } from "antd";
import { MailOutlined, LockOutlined, InfoCircleOutlined } from "@ant-design/icons";

const { Title } = Typography;

type LoginFormValues = {
    email: string;
    password: string;
};

const LoginHint = (
    <div>
        <p style={{ margin: 0 }}>Gunakan kredensial di bawah ini:</p>
        <p style={{ margin: 0 }}>
            <strong>Email:</strong> admin@gmail.com
        </p>
        <p style={{ margin: 0 }}>
            <strong>Password:</strong> admin
        </p>
    </div>
);

export default function LoginPage() {
    const router = useRouter();
    const { notification } = App.useApp();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: LoginFormValues) => {
        setLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email: values.email,
                password: values.password,
            });

            setLoading(false);

            if (result?.ok) {
                notification.success({ message: "Login Berhasil!" });
                router.replace("/");
            } else {
                const errorMessage = "Email atau password salah. Silakan coba lagi.";
                setError(errorMessage);
                notification.error({
                    message: "Login Gagal",
                    description: errorMessage,
                });
            }
        } catch (e) {
            setLoading(false);
            const errorMessage = "Tidak dapat terhubung ke server. Periksa koneksi Anda.";
            setError(errorMessage);
            notification.error({
                message: "Error",
                description: errorMessage,
            });
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md">
                <Card>
                    <div className="text-center mb-6">
                        <Tooltip title={LoginHint}>
                            <Title level={2} className="!mb-0 inline-block">
                                Healthshop Login
                            </Title>
                            <InfoCircleOutlined className="ml-2 text-gray-400" />
                        </Tooltip>
                    </div>

                    <Form
                        name="login"
                        onFinish={onFinish}
                        autoComplete="off"
                        initialValues={{
                            email: "admin@gmail.com",
                            password: "admin",
                        }}
                    >
                        {error && <Alert message={error} type="error" showIcon className="mb-6" />}

                        <Form.Item
                            name="email"
                            rules={[{ required: true, type: "email", message: "Masukkan email yang valid!" }]}
                        >
                            <Input prefix={<MailOutlined />} placeholder="Email" />
                        </Form.Item>

                        <Form.Item name="password" rules={[{ required: true, message: "Masukkan password Anda!" }]}>
                            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block loading={loading}>
                                Masuk
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    );
}
