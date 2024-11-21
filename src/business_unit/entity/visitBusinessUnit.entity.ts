import { Users } from "src/users/entity/users.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BusinessUnit } from "./businessUnit.entity";

@Entity({
    name: 'visit_business_unit_v1'
})
export class VisitBusinessUnit {

    @PrimaryGeneratedColumn('uuid')
    id?: string

    @ManyToOne(() => Users, users => users.history)
    @JoinColumn({ name: 'user_id' })
    user?: Users

    @Column()
    user_id: string

    @ManyToOne(() => BusinessUnit, businessUnit => businessUnit.history)
    @JoinColumn({ name: 'business_unit_id' })
    business_unit?: BusinessUnit

    @Column()
    business_unit_id?: string

    @Column()
    access_date: Date

    @Column({
        nullable: false,
        name: 'route_path'
    })
    routePath: string

    @Column()
    action: string

    @CreateDateColumn({ type: 'timestamp' })
    created_at?: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at?: Date
}