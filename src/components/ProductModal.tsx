"use client";

import { Modal, Form, Input, InputNumber, Button, Upload } from "antd";
import type { UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Product } from "@/types";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface ProductModalProps {
    open: boolean;
    onCancel: () => void;
    onFinish: (values: Omit<Product, "id">) => void;
    initialData?: Product | null;
    confirmLoading: boolean;
}

const ProductModal = ({ open, onCancel, onFinish, initialData, confirmLoading }: ProductModalProps) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (initialData) {
            form.setFieldsValue(initialData);
        } else {
            form.resetFields();
        }
    }, [initialData, form, open]);

    const handleOk = () => {
        form.validateFields().then((values) => {
            onFinish(values);
        });
    };

    const handleUpload: UploadProps["customRequest"] = async (options) => {
        const { file, onSuccess, onError } = options;

        if (!(file instanceof File)) {
            onError?.(new Error("File tidak valid."));
            return;
        }

        const fileName = `${Date.now()}-${file.name}`;
        const filePath = `public/${fileName}`;

        try {
            const { error: uploadError } = await supabase.storage.from("product-images").upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage.from("product-images").getPublicUrl(filePath);

            const publicUrl = data.publicUrl;

            form.setFieldsValue({ imageUrl: publicUrl });
            onSuccess?.(publicUrl);
        } catch (error: any) {
            console.log(error)
            console.error("Upload error:", error);
            onError?.(error);
        }
    };

    return (
        <Modal
            title={initialData ? "Edit Produk" : "Tambah Produk Baru"}
            open={open}
            onCancel={onCancel}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            destroyOnHidden
        >
            <Form form={form} layout="vertical" name="product_form">
                <Form.Item name="name" label="Nama Produk" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="sku" label="SKU" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="price" label="Harga" rules={[{ required: true, type: "number" }]}>
                    <InputNumber<number>
                        min={0}
                        style={{ width: "100%" }}
                        formatter={(value) => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        parser={(value) => Number(value!.replace(/Rp\s?|(,*)/g, ""))}
                    />
                </Form.Item>
                <Form.Item name="category" label="Kategori" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Gambar Produk" required>
                    <Upload customRequest={handleUpload} maxCount={1} listType="picture">
                        <Button icon={<UploadOutlined />}>Pilih Gambar</Button>
                    </Upload>
                </Form.Item>
                <Form.Item name="imageUrl" hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Deskripsi (Opsional)">
                    <Input.TextArea rows={4} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ProductModal;
