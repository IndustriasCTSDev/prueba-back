import { Bucket } from "src/recursos/entity/bucket.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Visitante } from "./visitante.entity";

@Entity({
    name: 'qr_visit_v1'
})
export class QrVisit {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        name: 'date_consult'
    })
    dateConsult: Date

    @ManyToOne(() => Bucket, bucket => bucket.historyQr)
    @JoinColumn({ name: 'bucket_id' })
    bucket: Bucket

    @Column()
    bucket_id: string

    @ManyToOne(() => Visitante, visitante => visitante.historyQr)
    @JoinColumn({ name: 'visitante_id' })
    visitante: Visitante

    @Column()
    visitante_id: string

    @Column({
        name: 'route_path'
    })
    routePath: string

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 8
    })
    latitud: number

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 8
    })
    longitud: number

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date
}