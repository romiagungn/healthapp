"use client";

import { useState, useEffect, Fragment } from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useInView } from "react-intersection-observer";
import { signOut, useSession } from "next-auth/react";
import { Product } from "@/types";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import { Spin, Button, Typography, Row, Col, Space, App, Result } from "antd";
import { PlusOutlined, LogoutOutlined } from "@ant-design/icons";

const { Title } = Typography;

interface ProductsPage {
    data: Product[];
    nextCursor: string | null;
    nextPage: number | null;
}

const fetchProducts = async ({ pageParam = 1 }: { pageParam?: number }): Promise<ProductsPage> => {
    const url = `/api/products?page=${pageParam}`;
    const { data } = await axios.get(url);
    return data;
};

const ProductList = () => {
    const { data: session } = useSession();
    const queryClient = useQueryClient();
    const { notification } = App.useApp();
    const { ref, inView } = useInView();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useInfiniteQuery({
        queryKey: ["products"],
        queryFn: ({ pageParam }) => fetchProducts({ pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    });

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            console.info("Fetching next page...");
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    const mutationCallbacks = {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            setIsModalOpen(false);
            setEditingProduct(null);
        },
        onError: (error: AxiosError<{ error?: string }>) => {
            const errorMessage = error.response?.data?.error || "Terjadi kesalahan.";
            notification.error({ message: "Operasi Gagal", description: errorMessage });
        },
    };

    const addMutation = useMutation({
        mutationFn: (newProduct: Omit<Product, "id">) => axios.post("/api/products", newProduct),
        ...mutationCallbacks,
        onSuccess: () => {
            notification.success({ message: "Produk berhasil ditambahkan!" });
            mutationCallbacks.onSuccess();
        },
    });

    const updateMutation = useMutation({
        mutationFn: (updatedProduct: Product) => axios.put(`/api/products/${updatedProduct.id}`, updatedProduct),
        ...mutationCallbacks,
        onSuccess: () => {
            notification.success({ message: "Produk berhasil diperbarui!" });
            mutationCallbacks.onSuccess();
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => axios.delete(`/api/products/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            notification.success({ message: "Produk berhasil dihapus!" });
        },
        onError: mutationCallbacks.onError,
    });

    const handleAdd = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleFinish = (values: Omit<Product, "id">) => {
        if (editingProduct) {
            updateMutation.mutate({ ...values, id: editingProduct.id });
        } else {
            addMutation.mutate(values);
        }
    };

    const isMutating = addMutation.isPending || updateMutation.isPending;
    const isListLoading = isMutating || deleteMutation.isPending;

    if (isLoading)
        return (
            <div className="flex h-screen items-center justify-center">
                <Spin size="large" />
            </div>
        );

    if (isError)
        return (
            <div className="flex h-screen items-center justify-center">
                <Result status="500" title="Error" subTitle="Gagal memuat data produk." />
            </div>
        );

    return (
        <div className="p-6">
            <Row justify="space-between" align="middle" className="mb-6">
                <Col>
                    <Title level={2} className="!m-0">
                        Manajemen Produk Kesehatan
                    </Title>
                    <Typography.Text type="secondary">Selamat datang, {session?.user?.name}</Typography.Text>
                </Col>
                <Col>
                    <Space>
                        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                            Tambah Produk
                        </Button>
                        <Button icon={<LogoutOutlined />} onClick={() => signOut()}>
                            Logout
                        </Button>
                    </Space>
                </Col>
            </Row>

            <Row
                gutter={[16, 16]}
                className={isListLoading ? "opacity-50 transition-opacity duration-300 pointer-events-none" : ""}
            >
                {data?.pages.map((page, i) => (
                    <Fragment key={i}>
                        {page.data.map((product) => (
                            <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                                <ProductCard
                                    product={product}
                                    onEdit={handleEdit}
                                    onDelete={(id) => deleteMutation.mutate(id)}
                                />
                            </Col>
                        ))}
                    </Fragment>
                ))}
            </Row>

            <div ref={ref} className="mt-6 flex justify-center">
                {isFetchingNextPage && <Spin />}
                {!hasNextPage && !isLoading && <p className="text-gray-500">Sudah mencapai akhir daftar.</p>}
            </div>

            {isModalOpen && (
                <ProductModal
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    onFinish={handleFinish}
                    initialData={editingProduct}
                    confirmLoading={isMutating}
                />
            )}
        </div>
    );
};

export default ProductList;
