# Vegetable product images

Home for the verified vegetable catalogue imagery. This mirrors the project's
existing `public/img/` structure (`hero/`, `farming/`).

## How images are used

The desktop vegetable section reads `src/data/products.ts` and renders the
`Product[]` entries whose `category` contains "vegetable". Each entry's
`image` field should reference a path under this folder, e.g.:

```ts
{
  id: 'uziza-leaf',
  name: 'Uziza Leaf',
  category: 'vegetables',
  description: 'Verified description only.',
  unit: 'bunch',
  availability: 'in-stock',
  price: 3.5, // optional, USD major units → $3.50
  image: '/img/vegetable/uziza-leaf.webp',
}
```

## Requirements

- No image is ever downloaded from the internet; only owner-supplied
  photography goes here.
- Solid background, well-lit product-only shot, at least 800px on the longest
  side.
- Preferred format: WebP (`.webp`); PNG/JPG accepted.
- Cards render with `object-fit: contain` inside a fixed 4:3 frame, so no crop
  is ever applied — keep the full product in frame when composing.

## Do not

- Add decorative/fake render shots — nothing here is presented as a real
  product unless the corresponding `products.ts` entry is verified.