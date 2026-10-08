# Tractor Spares & Lubricants — GitHub Pages

A simple static catalog website for a tractor spare-parts/lubricants shop.

## Included
- Product catalog
- Category filters
- Search by product/brand/part number
- Product images
- Cart with quantity controls
- WhatsApp order checkout
- Mobile-friendly design
- No database, payment gateway or paid hosting required

## First setup

1. Open `products.js`.
2. Replace `91XXXXXXXXXX` in `script.js` with the shop's WhatsApp number.
3. Replace the demo products in `products.js` with your real products.
4. Put product photos inside the `images` folder and use paths such as:
   `images/swaraj-oil-filter.jpg`
5. Commit/upload all files to a GitHub repository.
6. Enable GitHub Pages for the repository.

## Product example

{
  id: "oil-filter-001",
  name: "Oil Filter",
  category: "Filters",
  brand: "Brand Name",
  partNumber: "ABC123",
  price: 450,
  image: "images/oil-filter-001.jpg",
  description: "Compatible with ..."
}

## Important limitation

GitHub Pages is static hosting. It cannot provide a private server-side admin panel or upload images into the live site by itself.

For version 1, product management is done by editing `products.js` and uploading images to the `images` folder.

If you want, version 2 can add a more convenient product-management workflow. We should decide how you want products maintained before adding a backend/database.
