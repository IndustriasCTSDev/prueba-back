import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: 'ubications_v1'
})
export class UbicationEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    direccion: string

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 8
    })
    latitud: number

    @Column({
        type: 'decimal',
        precision: 11,
        scale: 8
    })
    longitud: number

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date
}