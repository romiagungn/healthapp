// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
    console.log(`Start seeding ...`);

    await prisma.user.deleteMany({ where: { email: "admin@gmail.com" } }).catch(() => {});

    const hashedPassword = await bcrypt.hash("admin", 12);
    const adminUser = await prisma.user.create({
        data: {
            email: "admin@gmail.com",
            password: hashedPassword,
        },
    });
    console.log(`Created admin user: ${adminUser.email}`);

    await prisma.product.deleteMany({});
    const products = [];
    for (let i = 0; i < 50; i++) {
        const productName = faker.commerce.productName();
        const product = {
            name: productName,
            sku: faker.string.alphanumeric(10).toUpperCase(),
            price: parseFloat(faker.commerce.price({ min: 10000, max: 500000 })),
            category: faker.commerce.department(),
            description: faker.commerce.productDescription(),
            imageUrl: faker.image.urlLoremFlickr({ category: "medical", width: 640, height: 480 }),
        };
        products.push(product);
    }

    await prisma.product.createMany({
        data: products,
    });

    console.log(`Seeding finished. Created 50 products.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
