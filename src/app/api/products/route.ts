import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = 12;

        const skip = (page - 1) * limit;

        const totalProducts = await prisma.product.count();

        const products = await prisma.product.findMany({
            take: limit,
            skip: skip,
            orderBy: {
                createdAt: "desc",
            },
        });

        let nextPage: number | null = null;
        if (skip + products.length < totalProducts) {
            nextPage = page + 1;
        }

        return NextResponse.json({
            data: products,
            nextPage,
        });
    } catch (error) {
        console.error("Gagal mengambil data produk:", error);
        return NextResponse.json({ error: "Gagal mengambil data produk" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const newProduct = await prisma.product.create({ data });
        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        console.error("Gagal membuat produk:", error);
        return NextResponse.json({ error: "Gagal membuat produk" }, { status: 500 });
    }
}
