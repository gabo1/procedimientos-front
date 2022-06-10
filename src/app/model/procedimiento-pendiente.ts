export class ProcedimientoPendiente {
    public id: number
    public titulo: string
    public comentario: string
    public estatus: number
    public resultado : number
    public fecha: number
    public actualizadoPor: number
    constructor(
        titulo: string,
        id?: number,
        comentario?: string,
        estatus?: number,
        resultado?: number,
        fecha?: number
        ) {
        this.titulo = titulo
        this.id = id ? id : null;
        this.comentario = comentario ? comentario : null;
        this.estatus = estatus ? estatus : null;
        this.resultado = resultado ? resultado : null;
        this.fecha = fecha ? fecha : null;
    }
}