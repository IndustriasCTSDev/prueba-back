import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'status_project_v1'})
export class StatusProject {
    
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    name: string
    
    // Campo que almacena la fecha de creación automáticamente
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    // Campo que almacena la fecha de actualización automáticamente
    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}