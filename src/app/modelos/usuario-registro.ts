export class UsuarioRegistro {
    public nombresUsuario: string;
    public apellidosUsuario: string;
    public nombreAcceso: string;
    public claveAcceso: string;
    public reClaveAcceso?: string;

    constructor(nom: string, ape: string, nomA: string, cla: string){
        this.nombresUsuario = nom;
        this.apellidosUsuario = ape;
        this.nombreAcceso = nomA;
        this.claveAcceso = cla;
    }
}
