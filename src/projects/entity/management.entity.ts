import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Project } from "./project.entity";

@Entity('management_v1')
export class Management {
    @PrimaryGeneratedColumn('uuid')
    id?: string

    @Column()
    code: string

    @ManyToOne(() => Project, project => project.managements)
    @JoinColumn({name: 'project_id'})
    project: Project

    @Column()
    project_id: string

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date
}