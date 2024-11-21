import { Bucket } from "src/recursos/entity/bucket.entity";
import { Visitante } from "./visitante.entity";
export declare class QrVisit {
    id: string;
    dateConsult: Date;
    bucket: Bucket;
    bucket_id: string;
    visitante: Visitante;
    visitante_id: string;
    routePath: string;
    latitud: number;
    longitud: number;
    created_at: Date;
    updated_at: Date;
}
