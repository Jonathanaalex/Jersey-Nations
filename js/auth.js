// auth.js
document.addEventListener('DOMContentLoaded', function() {
  // Lista de páginas que no requieren autenticación
  const paginasPublicas = ['login.html'];
  
  // Si no es una página pública y no está logueado, redirigir a login
  if (!paginasPublicas.includes(window.location.pathname.split('/').pop())) {
    if (!sessionStorage.getItem('usuarioLogueado')) {
      window.location.href = 'login.html';
    }
  }
});