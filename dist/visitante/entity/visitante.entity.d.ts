import { QrVisit } from "./qrVisit.entity";
export declare class Visitante {
    id?: string;
    email: string;
    name: string;
    empresa: string;
    nit: string;
    telefono: string;
    last_otp?: number;
    last_access?: string;
    historyQr: QrVisit[];
    created_at?: Date;
    updated_at?: Date;
}
