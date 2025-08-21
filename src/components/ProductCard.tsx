'use client';

import { Card, Button, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Product } from '@/types';

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
            cover={<img alt={product.name} src={product.imageUrl} style={{ height: 200, objectFit: 'cover' }} />}
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
                        <div>{`Rp ${product.price.toLocaleString('id-ID')}`}</div>
                        <div style={{ color: 'gray', fontSize: '12px' }}>SKU: {product.sku}</div>
                    </>
                }
            />
        </Card>
    );
};

export default ProductCard;