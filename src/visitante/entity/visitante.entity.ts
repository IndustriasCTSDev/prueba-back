import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { QrVisit } from "./qrVisit.entity";


@Entity({
    name: 'visitante_v1'
})
export class Visitante {
    @PrimaryGeneratedColumn('uuid')
    id?: string

    @Column({
        nullable: false,
    })
    email: string

    @Column({
        nullable: false
    })
    name: string

    @Column({
        nullable: true
    })
    empresa: string

    @Column({
        nullable: true
    })
    nit: string

    @Column({
        nullable: true
    })
    telefono: string

    @Column({
        nullable: true
    })
    last_otp?: number

    @Column({
        nullable: true,
        type: 'timestamp'
    })
    last_access?: string

    @OneToMany(() => QrVisit, (qrVisit) => qrVisit.visitante)
    historyQr: QrVisit[]

    @CreateDateColumn({ type: 'timestamp' })
    created_at?: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at?: Date

}