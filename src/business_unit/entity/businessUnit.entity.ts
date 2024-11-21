import { Bucket } from "src/recursos/entity/bucket.entity";
import { Users } from "src/users/entity/users.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { VisitBusinessUnit } from "./visitBusinessUnit.entity";

@Entity({
    name: 'business_unit_v1'
})
export class BusinessUnit {

    @PrimaryGeneratedColumn('uuid')
    id?: string

    @Column()
    name: string

    @OneToOne(() => Users, users => users.business_unit)
    @JoinColumn({ name: 'admin_id' }) // Asegúrate de que 'admin_id' es la clave foránea en tu base de datos
    admin?: Users;

    @OneToMany(() => Bucket, bucket => bucket.business_unit)
    buckets?: Bucket[];

    @OneToMany(() => VisitBusinessUnit, visitBusinessUnit => visitBusinessUnit.business_unit)
    history?: VisitBusinessUnit[]

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at?: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at?: Date;

    
}