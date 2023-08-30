import { Estudiante } from "./estudiante"
import { Reclutador } from "./reclutador"
export class Matchs{
  id:number =0
  codigo_match: number = 0
  confirmacion_match: boolean = false
  reclutador: Reclutador = new Reclutador()
  estudiante: Estudiante = new Estudiante()
}