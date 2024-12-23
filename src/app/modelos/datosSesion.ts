export class DatosSesion {
  public id: number;
  public correoAcceso: string;
  public nombresUsuario: string;
  public apellidos: string;

  constructor(id: number, correo: string, nombre: string, apellidos: string) {
    this.id = id;
    this.correoAcceso = correo;
    this.nombresUsuario = nombre;
    this.apellidos = apellidos;
  }
}
