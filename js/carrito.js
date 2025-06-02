// carrito.js
document.addEventListener('DOMContentLoaded', () => {
  // Obtener productos del localStorage o de productos.js
  const productos = JSON.parse(localStorage.getItem('productos')) || {};
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const contenedor = document.getElementById('carrito-contenido');
  const envioGratisMinimo = 1000; // Envío gratis para compras mayores a $1000
  const costoEnvio = 99; // Costo normal de envío

  // Mostrar carrito vacío si no hay productos
  if (carrito.length === 0) {
    contenedor.innerHTML = `
      <div class="text-center py-5">
        <i class="fas fa-shopping-cart fa-5x text-muted mb-4"></i>
        <h3 class="mb-3">Tu carrito está vacío</h3>
        <p class="text-muted mb-4">Agrega productos para comenzar a comprar</p>
        <a href="Productos.html" class="btn btn-primary btn-lg">
          <i class="fas fa-arrow-left me-2"></i> Seguir comprando
        </a>
      </div>
    `;
    actualizarResumen(0, 0, 0);
    return;
  }

  // Renderizar productos del carrito
  let html = '';
  let subtotal = 0;
  let descuentoTotal = 0;
  let totalItems = 0;

  carrito.forEach((item, index) => {
    const producto = productos[item.id] || item;
    const precioActual = producto.precio;
    const precioOriginal = producto.precioOriginal || producto.precio;
    const subtotalItem = precioActual * item.cantidad;
    const descuentoItem = (precioOriginal - precioActual) * item.cantidad;

    subtotal += subtotalItem;
    descuentoTotal += descuentoItem;
    totalItems += item.cantidad;

    html += `
      <div class="card mb-3">
        <div class="card-body">
          <div class="row align-items-center">
            <div class="col-md-2">
              <img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid rounded">
            </div>
            <div class="col-md-4">
              <h5 class="mb-1">${producto.nombre}</h5>
              <p class="text-muted mb-2">${producto.categoria || 'Deportivas'}</p>
              <div class="d-flex align-items-center">
                <span class="text-decoration-line-through text-muted me-2">$${precioOriginal.toFixed(2)}</span>
                <span class="text-danger fw-bold">$${precioActual.toFixed(2)}</span>
              </div>
            </div>
            <div class="col-md-3">
              <div class="input-group">
                <button class="btn btn-outline-secondary" onclick="actualizarCantidad(${index}, 'decrement')">-</button>
                <input type="text" class="form-control text-center" value="${item.cantidad}" readonly>
                <button class="btn btn-outline-secondary" onclick="actualizarCantidad(${index}, 'increment')">+</button>
              </div>
            </div>
            <div class="col-md-3 text-end">
              <h5 class="mb-2">$${subtotalItem.toFixed(2)}</h5>
              <button class="btn btn-sm btn-outline-danger" onclick="eliminarProducto(${index})">
                <i class="fas fa-trash"></i> Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  contenedor.innerHTML = html;

  // Calcular envío y total
  const envio = subtotal >= envioGratisMinimo ? 0 : costoEnvio;
  const total = subtotal + envio;

  // Actualizar resumen
  actualizarResumen(subtotal, envio, descuentoTotal, totalItems);

  // Mostrar/Ocultar envío gratis
  const envioGratisElement = document.getElementById('envio-gratis');
  if (envioGratisElement) {
    envioGratisElement.style.display = subtotal >= envioGratisMinimo ? 'block' : 'none';
  }
});

// Funciones globales para manejar el carrito
window.actualizarCantidad = function(index, action) {
  const carrito = JSON.parse(localStorage.getItem('carrito'));
  
  if (action === 'increment') {
    carrito[index].cantidad += 1;
  } else if (action === 'decrement' && carrito[index].cantidad > 1) {
    carrito[index].cantidad -= 1;
  }
  
  localStorage.setItem('carrito', JSON.stringify(carrito));
  location.reload();
};

window.eliminarProducto = function(index) {
  const carrito = JSON.parse(localStorage.getItem('carrito'));
  carrito.splice(index, 1);
  
  if (carrito.length === 0) {
    localStorage.removeItem('carrito');
  } else {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }
  
  location.reload();
};

window.vaciarCarrito = function() {
  if (confirm('¿Estás seguro de que quieres vaciar tu carrito?')) {
    localStorage.removeItem('carrito');
    location.reload();
  }
};

function actualizarResumen(subtotal, envio, descuento, totalItems) {
  const total = subtotal + envio;
  
  document.getElementById('subtotal-carrito').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('envio-carrito').textContent = envio === 0 ? 'GRATIS' : `$${envio.toFixed(2)}`;
  document.getElementById('descuento-carrito').textContent = `-$${descuento.toFixed(2)}`;
  document.getElementById('total-carrito').textContent = `$${total.toFixed(2)}`;
  document.getElementById('item-count').textContent = totalItems;
}