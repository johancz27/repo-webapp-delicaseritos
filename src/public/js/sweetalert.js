const Swal = require('sweetalert2');

Swal.fire({
    title: '¿Estás seguro?',
    text: "Una vez eliminado, no hay marcha atrás.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, confirmar'
  }).then((result) => {
    if (result.isConfirmed) {
      
      Swal.fire(
        '/inventario/platos/eliminar',
        '¡Eliminado!',
        'EL item se eliminó correctamente.',
        'success'
      )
    }
  })