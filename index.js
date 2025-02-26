document.addEventListener("DOMContentLoaded", function () {
  const productosSelect = document.getElementById("productosSelect");
  const nombreProducto = document.getElementById("nombreProducto");
  const precioVaso = document.getElementById("precioVaso");
  const precioJarra = document.getElementById("precioJarra");
  const precioCombo = document.getElementById("precioCombo");
  const precioLata = document.getElementById("precioLata");
  const precioBotellaCh = document.getElementById("precioBotellaCh");
  const precioBotella = document.getElementById("precioBotella");
  const confirmarBtn = document.getElementById("confirmarBtn");
  const eliminarBtn = document.getElementById("eliminarBtn");
  const mensaje = document.getElementById("mensaje");

  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzGQLiLp14T9RKC2b4HxRFfzA81H5p1sA40Ew68yUzzezOUuvDcw4m_j4t42lQwsSTI/exec";

  // Cargar productos en el select
  function cargarProductos() {
    fetch(`${SCRIPT_URL}?action=getProductos`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos recibidos de getProductos:", data); // Depuración

        productosSelect.innerHTML =
          '<option value="">-- Seleccionar Producto --</option>';
        data.productos.forEach((producto) => {
          const option = document.createElement("option");
          option.value = producto.producto;
          option.textContent = producto.producto;
          productosSelect.appendChild(option);
        });
      })
      .catch((error) => {
        console.error("Error al cargar los productos:", error); // Depuración
        mostrarMensaje("Error al cargar los productos", "error");
      });
  }

  // Mostrar mensajes en la interfaz
  function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = `mensaje ${tipo}`;
    setTimeout(() => {
      mensaje.textContent = "";
      mensaje.className = "mensaje";
    }, 3000);
  }

  // Limpiar el formulario
  function limpiarFormulario() {
    nombreProducto.value = "";
    precioVaso.value = "";
    precioJarra.value = "";
    precioCombo.value = "";
    precioLata.value = "";
    precioBotellaCh.value = "";
    precioBotella.value = "";
  }

  // Manejar la selección de un producto
  productosSelect.addEventListener("change", function () {
    const productoSeleccionado = productosSelect.value;
    if (productoSeleccionado) {
      fetch(`${SCRIPT_URL}?action=getProductos`)
        .then((response) => response.json())
        .then((data) => {
          const producto = data.productos.find(
            (p) => p.producto.toLowerCase() === productoSeleccionado.toLowerCase()
          );
          if (producto) {
            nombreProducto.value = producto.producto;
            precioVaso.value = producto.vaso || "";
            precioJarra.value = producto.jarra || "";
            precioCombo.value = producto.combo || "";
            precioLata.value = producto.lata || "";
            precioBotellaCh.value = producto.botellaCh || "";
            precioBotella.value = producto.botella || "";
          }
        });
    } else {
      limpiarFormulario();
    }
  });

  // Confirmar (agregar o actualizar producto)
  confirmarBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const params = new URLSearchParams({
      action: "actualizarProducto", // Siempre intentar actualizar
      producto: nombreProducto.value,
      vaso: precioVaso.value,
      jarra: precioJarra.value,
      combo: precioCombo.value,
      lata: precioLata.value,
      botellaCh: precioBotellaCh.value,
      botella: precioBotella.value,
    });

    console.log("Parámetros enviados:", params.toString()); // Depuración

    fetch(`${SCRIPT_URL}?${params.toString()}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta recibida:", data); // Depuración

        if (data.success) {
          mostrarMensaje(data.message || "Producto guardado correctamente", "success");
          cargarProductos();
          limpiarFormulario();
        } else {
          mostrarMensaje(data.error || "Error al guardar el producto", "error");
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error); // Depuración
        mostrarMensaje("Error al guardar el producto", "error");
      });
  });

  // Eliminar producto
  eliminarBtn.addEventListener("click", function () {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      const params = new URLSearchParams({
        action: "eliminarProducto",
        producto: nombreProducto.value,
      });

      console.log("Parámetros enviados:", params.toString()); // Depuración

      fetch(`${SCRIPT_URL}?${params.toString()}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Respuesta recibida:", data); // Depuración

          if (data.success) {
            mostrarMensaje(data.message || "Producto eliminado correctamente", "success");
            cargarProductos();
            limpiarFormulario();
          } else {
            mostrarMensaje(data.error || "Error al eliminar el producto", "error");
          }
        })
        .catch((error) => {
          console.error("Error en la solicitud:", error); // Depuración
          mostrarMensaje("Error al eliminar el producto", "error");
        });
    }
  });

  // Cargar productos al iniciar
  cargarProductos();
});
