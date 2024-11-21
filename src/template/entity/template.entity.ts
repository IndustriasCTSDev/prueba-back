import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ChildrenDto } from "../dto/template.dto";

@Entity('template_v1')
export class TemplateEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({
        nullable: false
    })
    name: string

    @Column({
        nullable: false,
        type: 'json'
    })
    config: ChildrenDto[]

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date
}