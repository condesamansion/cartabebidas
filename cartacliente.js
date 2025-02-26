document.addEventListener("DOMContentLoaded", function () {
  const listaProductos = document.getElementById("listaProductos");
  const loading = document.getElementById("loading");
  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzGQLiLp14T9RKC2b4HxRFfzA81H5p1sA40Ew68yUzzezOUuvDcw4m_j4t42lQwsSTI/exec";

  // Función para cargar los productos desde la base de datos
  function cargarProductos() {
    fetch(`${SCRIPT_URL}?action=getProductos`)
      .then((response) => response.json())
      .then((data) => {
        // Ocultar el mensaje de carga
        loading.style.display = "none";

        // Filtrar productos que tienen al menos un precio
        const productosConPrecio = data.productos.filter(
          (producto) =>
            producto.vaso ||
            producto.jarra ||
            producto.combo ||
            producto.lata ||
            producto.botellaCh ||
            producto.botella
        );

        // Mostrar los productos en la lista
        if (productosConPrecio.length > 0) {
          productosConPrecio.forEach((producto) => {
            const productoDiv = document.createElement("div");
            productoDiv.className = "producto"; // Usar la clase "producto"

            // Nombre del producto
            const nombreProducto = document.createElement("h2");
            nombreProducto.textContent = producto.producto.toUpperCase(); // Convertir a mayúsculas
            productoDiv.appendChild(nombreProducto);

            // Precios (solo si tienen valor)
            if (producto.vaso) {
              const precioVaso = document.createElement("p");
              precioVaso.textContent = `Vaso: $${producto.vaso}`;
              productoDiv.appendChild(precioVaso);
            }
            if (producto.jarra) {
              const precioJarra = document.createElement("p");
              precioJarra.textContent = `Jarra: $${producto.jarra}`;
              productoDiv.appendChild(precioJarra);
            }
            if (producto.combo) {
              const precioCombo = document.createElement("p");
              precioCombo.textContent = `Combo: $${producto.combo}`;
              productoDiv.appendChild(precioCombo);
            }
            if (producto.lata) {
              const precioLata = document.createElement("p");
              precioLata.textContent = `Lata: $${producto.lata}`;
              productoDiv.appendChild(precioLata);
            }
            if (producto.botellaCh) {
              const precioBotellaCh = document.createElement("p");
              precioBotellaCh.textContent = `Botella Chica: $${producto.botellaCh}`;
              productoDiv.appendChild(precioBotellaCh);
            }
            if (producto.botella) {
              const precioBotella = document.createElement("p");
              precioBotella.textContent = `Botella: $${producto.botella}`;
              productoDiv.appendChild(precioBotella);
            }

            listaProductos.appendChild(productoDiv);
          });
        } else {
          // Mostrar mensaje si no hay productos con precios
          const mensaje = document.createElement("p");
          mensaje.textContent = "No hay productos disponibles.";
          listaProductos.appendChild(mensaje);
        }
      })
      .catch((error) => {
        console.error("Error al cargar los productos:", error);
        loading.textContent = "Error al cargar los productos. Inténtalo de nuevo.";
      });
  }

  // Cargar productos al iniciar la página
  cargarProductos();
});
