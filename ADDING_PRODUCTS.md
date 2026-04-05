# Como agregar mas productos

Esta wishlist arma los productos desde imagenes locales en `public` y una definicion en `data/wishlist.ts`.

## 1. Agregar imagenes

1. Copia imagenes en formato `.webp` dentro de `public/`.
2. Si un producto tiene varias referencias, usa el mismo nombre base con sufijo numerico:
   - `producto.webp`
   - `producto2.webp`
   - `producto3.webp`
3. No mezcles formatos si quieres que se agrupen automaticamente. El agrupado actual usa solo `webp`.

## 2. Registrar el producto

1. Abre `data/wishlist.ts`.
2. En `productDetails`, agrega una clave nueva cuyo nombre sea el baseName de tus imagenes.
3. Ejemplo:

```ts
camisa: {
  name: "Camisa",
  description: "Referencia de camisa para uso casual.",
  category: "ropa",
  priceRange: "medio",
}
```

## 3. Productos de Steam

Si el producto es un juego de Steam, agrega `isSteam` y `link`:

```ts
miJuego: {
  name: "Mi Juego",
  description: "Juego de Steam. Solo comprar en oferta.",
  category: "juegos",
  priceRange: "medio",
  isSteam: true,
  link: "https://store.steampowered.com/app/ID_DEL_JUEGO/NOMBRE/",
}
```

## 4. Validacion rapida

1. Levanta la app y revisa que el producto aparezca en la grilla.
2. Verifica que se agrupen todas sus variantes de imagen.
3. Haz click en la imagen y confirma que abre el modal completo.
4. Si tiene link, confirma que el boton abre la pagina correcta.
