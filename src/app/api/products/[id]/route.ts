import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        const data = await request.json();
        const updatedProduct = await prisma.product.update({
            where: { id: id },
            data,
        });
        return NextResponse.json(updatedProduct);
    } catch (error) {
        return NextResponse.json({ error: "Gagal memperbarui produk" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        await prisma.product.delete({
            where: { id: id },
        });
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return NextResponse.json({ error: "Gagal menghapus produk" }, { status: 500 });
    }
}
