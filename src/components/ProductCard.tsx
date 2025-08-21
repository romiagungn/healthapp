"use client";

import { Card, Button, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Product } from "@/types";
import Image from "next/image";

const { Meta } = Card;

interface ProductCardProps {
    product: Product;
    onEdit: (product: Product) => void;
    onDelete: (id: string) => void;
}

const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
    return (
        <Card
            hoverable
            cover={
                <div className="relative h-48 w-full">
                    <Image
                        alt={product.name}
                        src={product.imageUrl}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>
            }
            actions={[
                <Button type="text" icon={<EditOutlined />} key="edit" onClick={() => onEdit(product)} />,
                <Popconfirm
                    key={product.id}
                    title="Hapus produk?"
                    description="Aksi ini tidak dapat dibatalkan."
                    onConfirm={() => onDelete(product.id)}
                    okText="Ya, Hapus"
                    cancelText="Batal"
                >
                    <Button type="text" danger icon={<DeleteOutlined />} key="delete" />
                </Popconfirm>,
            ]}
        >
            <Meta
                title={product.name}
                description={
                    <>
                        <div className="text-base font-semibold">{`Rp ${product.price.toLocaleString("id-ID")}`}</div>
                        <div className="text-sm text-gray-500">SKU: {product.sku}</div>
                    </>
                }
            />
        </Card>
    );
};

export default ProductCard;
