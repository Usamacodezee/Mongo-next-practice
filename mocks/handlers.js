import { rest } from 'msw';

export const handlers = [
  rest.get('/api/products', (req, res, ctx) => {
    return res(ctx.json([{
      _id: 0,
      name: "Product 1",
      description: "Description 1",
      category: "Category 1",
      price: 100,
      discountPercentage: 10,
      rating: 4.5,
      stock: 100,
      tags: ["tag 1", "tag 2"],
      brand: "Brand 1",
      sku: "RCH45Q1A",
      weight: 2,
      warrantyInformation: "3 years",
      shippingInformation: "10 days",
      availabilityStatus: "in stock",
      returnPolicy: "7 days return",
      orderQuantity: 0,
      reviews: [],
      meta: {
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9hPmDBJK2cPU-FuJeGBBeqnK6pL8TwpuL2Q&s",
    }]));
  }),
  rest.post('/api/products', (req, res, ctx) => {
    return res(ctx.json({}));
  }),
];
