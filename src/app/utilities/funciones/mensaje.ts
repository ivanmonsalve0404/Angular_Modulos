import { ToastrService } from 'ngx-toastr';
export function crearMensaje(tipo: string, mensaje: string, titulo: string, toastr: ToastrService): void {
  const PARAMETROS = {
    closeButton: true,
    enableHtml: true,
    progressBar: true,
    positionClass: 'toast-top-right',
    timeOut: 20000
  }

  switch (tipo.toLowerCase()) {
    case 'success':
      toastr.success(mensaje, titulo, PARAMETROS);
      break;
    case 'error':
      toastr.error(mensaje, titulo, PARAMETROS);
      break;
    case 'info':
      toastr.info(mensaje, titulo, PARAMETROS);
      break;
    case 'warning':
      toastr.warning(mensaje, titulo, PARAMETROS);
      break;
    default:
      toastr.show(mensaje, titulo, PARAMETROS);
      console.error('Tipo de mensaje inválido');
      break;
  }


}
