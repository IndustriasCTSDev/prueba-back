import { BusinessUnit } from "src/business_unit/entity/businessUnit.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Project } from "../../projects/entity/project.entity";
import { Folder } from "./folder.entity";
import { Attachment } from "./attachments.entity";
import { QrVisit } from "src/visitante/entity/qrVisit.entity";

@Entity({name: 'bucket_v1'})
export class Bucket {

    @PrimaryGeneratedColumn('uuid')
    id?: string

    @Column()
    name: string

    @Column()
    description: string

    @ManyToOne(() => BusinessUnit, businessUnit => businessUnit.buckets)
    @JoinColumn({ name: 'business_unit_id' }) // Especifica que este campo actúa como la clave foránea
    business_unit: BusinessUnit;

    @Column()
    business_unit_id: string

    @ManyToOne(() => Project, project => project.buckets)
    @JoinColumn({ name: 'project_id' }) // Especifica que este campo actúa como la clave foránea
    project: Project;

    @Column({
        nullable: false
    })
    project_id: string

    @OneToMany(() => Folder, (folder) => folder.bucket)
    folders: Folder[];

    @OneToMany(() => Attachment, (attachment) => attachment.bucket)
    attachments: Attachment[]

    @OneToMany(() => QrVisit, (qrVisit) => qrVisit.bucket)
    historyQr: QrVisit[]

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date
}