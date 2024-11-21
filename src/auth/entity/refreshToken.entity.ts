import { Users } from "src/users/entity/users.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: 'refresh_token_v1'
})
export class RefreshToken {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    jwt: string

    @OneToOne(() => Users)
    @JoinColumn({ name: 'user_id' })
    user: Users

    @Column({
        type: 'timestamp'
    })
    exp: Date

    // Campo que almacena la fecha de creación automáticamente
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    // Campo que almacena la fecha de actualización automáticamente
    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}