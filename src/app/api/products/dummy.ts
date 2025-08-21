import { NextResponse } from "next/server";
const createDummyData = () => {
    const data = [];
    for (let i = 0; i < 50; i++) {
        data.push({
            id: `${50 - i}`,
            name: `Dummy Product ${50 - i}`,
            sku: `SKU-DUMMY-${1050 - i}`,
            price: Math.floor(Math.random() * 200000) + 5000,
            category: "Kesehatan Dummy",
            description: `This is a detailed description for the dummy product number ${50 - i}.`,
            imageUrl: `https://picsum.photos/seed/${50 - i}/400/300`,
            createdAt: new Date(Date.now() - i * 1000 * 60 * 60),
        });
    }
    return data;
};

export async function GET(request: Request) {
    const allDummyProducts = createDummyData();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = 12;
    const skip = (page - 1) * limit;

    try {
        const paginatedProducts = allDummyProducts.slice(skip, skip + limit);
        let nextPage: number | null = null;

        if (skip + paginatedProducts.length < allDummyProducts.length) {
            nextPage = page + 1;
        }

        await new Promise((resolve) => setTimeout(resolve, 500));

        return NextResponse.json({
            data: paginatedProducts,
            nextPage,
        });
    } catch (error) {
        return NextResponse.json({ error: "Gagal memproses dummy data" }, { status: 500 });
    }
}
