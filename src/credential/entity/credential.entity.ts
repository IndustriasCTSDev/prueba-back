import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({
    name: 'credentials_v1'
})
export class Credentials {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        length: 500
    })
    email: string

    @Column({
        type: 'boolean'
    })
    email_verified: boolean

    @Column({ length: 500 })
    password: string

    // Campo que almacena la fecha de creación automáticamente
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    // Campo que almacena la fecha de actualización automáticamente
    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}