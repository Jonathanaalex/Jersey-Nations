// productos.js
document.addEventListener('DOMContentLoaded', () => {
  const productos = {
    atm: { 
      nombre: "Atlético Madrid Visita", 
      precio: 499,
      precioOriginal: 999,
      imagen: "imagenes/atm.avif",
      categoria: "Deportivas"
    },
    inter: { 
      nombre: "Inter Tercera Equipación", 
      precio: 599,
      precioOriginal: 1199,
      imagen: "imagenes/inter.avif",
      categoria: "Deportivas"
    },
    lfc: { 
      nombre: "Liverpool Local", 
      precio: 799,
      precioOriginal: 1599,
      imagen: "imagenes/lfc.avif",
      categoria: "Deportivas"
    },
    psg: { 
      nombre: "PSG Local", 
      precio: 549,
      precioOriginal: 1099,
      imagen: "imagenes/psg.avif",
      categoria: "Deportivas"
    },
    psg1: { 
      nombre: "PSG Visitante", 
      precio: 649,
      precioOriginal: 1299,
      imagen: "imagenes/psg1.avif",
      categoria: "Deportivas"
    },
    fcb: { 
      nombre: "FC Barcelona Local", 
      precio: 899,
      precioOriginal: 1799,
      imagen: "imagenes/fcb.avif",
      categoria: "Deportivas"
    },
    rmd: { 
      nombre: "Real Madrid Local", 
      precio: 849,
      precioOriginal: 1699,
      imagen: "imagenes/rmd.avif",
      categoria: "Deportivas"
    },
    arsn: { 
      nombre: "Manchester United Local", 
      precio: 749,
      precioOriginal: 1499,
      imagen: "imagenes/arsn.avif",
      categoria: "Deportivas"
    }
  };

  // Función global para agregar al carrito
  window.agregarAlCarrito = function(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const producto = productos[id];
    
    if (!producto) {
      alert('Producto no encontrado');
      return;
    }

    const productoExistente = carrito.find(p => p.id === id);
    
    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      carrito.push({
        id: id,
        nombre: producto.nombre,
        precio: producto.precio,
        precioOriginal: producto.precioOriginal,
        imagen: producto.imagen,
        categoria: producto.categoria,
        cantidad: 1
      });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    // Mostrar notificación bonita
    const notificacion = `
      <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
        <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="toast-header bg-success text-white">
            <strong class="me-auto">¡Producto agregado!</strong>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div class="toast-body">
            <div class="d-flex align-items-center">
              <img src="${producto.imagen}" style="width:50px;height:50px;object-fit:cover" class="me-3">
              <div>
                <p class="mb-1">${producto.nombre}</p>
                <p class="mb-0">$${producto.precio.toFixed(2)} MXN</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Crear y mostrar notificación
    const div = document.createElement('div');
    div.innerHTML = notificacion;
    document.body.appendChild(div);
    
    // Eliminar después de 3 segundos
    setTimeout(() => div.remove(), 3000);
    
    // Actualizar contador del carrito en todas las páginas
    actualizarContadorCarrito();
  };

  // Función para actualizar el contador del carrito
  function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    
    cartCountElements.forEach(el => {
      el.textContent = totalItems;
      el.style.display = totalItems > 0 ? 'inline-block' : 'none';
    });
  }

  // Inicializar contador al cargar la página
  actualizarContadorCarrito();
});