export class Acceso {
public codUsuario: number;
public nombreAcceso: string;
public claveAcceso: string;

  constructor(cod: number, nomA: string, cla: string){
    this.codUsuario = cod;
    this.nombreAcceso = nomA;
    this.claveAcceso = cla;
  }
}

