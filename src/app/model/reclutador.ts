import { Empresa } from "./empresa"
import { Usuario } from "./usuario"

export class Reclutador{
  id:number =0
  descripcion_Reclutador: string =""
  empresa: Empresa = new Empresa()
  usuario: Usuario = new Usuario()
}
