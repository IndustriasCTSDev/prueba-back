import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Bucket } from "./bucket.entity";
import { Attachment } from "./attachments.entity";


@Entity({ name: "folder_v1" })
export class Folder {

    @PrimaryGeneratedColumn('uuid')
    id?: string

    @Column()
    name: string

    @Column()
    description?: string

    @ManyToOne(() => Folder, (folder) => folder.children)
    @JoinColumn({ name: 'parent_folder_id' })
    parent?: Folder;

    @Column()
    parent_folder_id?: string

    @OneToMany(() => Folder, (folder) => folder.parent)
    children?: Folder[];

    @Column()
    sequence?: number

    @Column()
    icon?: string

    @Column()
    color?: string

    @Column()
    bucket_id: string

    @ManyToOne(() => Bucket, (bucket) => bucket.folders, { nullable: true })
    @JoinColumn({ name: 'bucket_id' })
    bucket?: Bucket;


    @OneToMany(() => Attachment, (attachment) => attachment.folder)
    attachments?: Attachment[]

    @CreateDateColumn({ type: 'timestamp' })
    created_at?: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at?: Date
}