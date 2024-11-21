import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Bucket } from "./bucket.entity";
import { Folder } from "./folder.entity";

@Entity({
    name: 'attachment_v1'
})
export class Attachment {

    @PrimaryGeneratedColumn()
    id?: number

    @Column({
        name: 'file_name',
        nullable: false,
    })
    fileName: string

    @Column({
        name: 'file_path',
    })
    filePath: string

    @Column({
        name: 'file_size',
    })
    fileSize: number

    @Column({
        name: 'file_type',
    })
    fileType: string

    @ManyToOne(() => Bucket, bucket => bucket.attachments)
    @JoinColumn({ name: 'bucket_id' })
    bucket: Bucket

    @Column()
    bucket_id: string

    @ManyToOne(() => Folder, folder => folder.attachments)
    @JoinColumn({ name: 'folder_id' })
    folder: Folder

    @Column()
    folder_id: string

    url?: string

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date
}