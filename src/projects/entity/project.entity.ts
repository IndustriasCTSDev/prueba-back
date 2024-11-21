import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StatusProject } from "./statusProject.entity";
import { Bucket } from "../../recursos/entity/bucket.entity";
import { Management } from "./management.entity";

@Entity({
    name: 'project_v1'
})
export class Project {

    @PrimaryGeneratedColumn('uuid')
    id?: string

    @Column()
    name: string

    @Column()
    cliente: string

    @OneToOne(() => StatusProject)
    @JoinColumn({ name: 'status_project_id' })
    status: StatusProject

    @Column({default: 6})
    status_project_id: number

    @Column()
    warranty: string

    @Column()
    description: string

    @OneToMany(() => Management, management => management.project)
    managements: Management[]

    @Column()
    old_ga: string

    @OneToMany(() => Bucket, bucket => bucket.project)
    buckets: Bucket[]

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date

}