import { Reclutador } from "./reclutador"
import { Requisito } from "./requisito"

export class Puesto_trabajo{
  id:number =0
  reclutador: Reclutador = new Reclutador()
  requisito: Requisito = new Requisito()
}
