import { BusinessUnit } from "src/business_unit/entity/businessUnit.entity";
import { VisitBusinessUnit } from "src/business_unit/entity/visitBusinessUnit.entity";
import { Credentials } from "src/credential/entity/credential.entity";
import { Roles } from "src/roles/entity/roles.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: 'users_v1'
})
export class Users {
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 500})
    name: string

    @OneToOne(() => Credentials)
    @JoinColumn({name: 'credential_id'})
    credential?: Credentials

    @OneToOne(() => Roles)
    @JoinColumn({name: 'rol_id'})
    rol?: Roles

    @OneToOne(() => BusinessUnit, businessUnit => businessUnit.admin)
    business_unit?: BusinessUnit

    @OneToMany(() => VisitBusinessUnit, visitBusinessUnit => visitBusinessUnit.user)
    history?: VisitBusinessUnit[]

    // Campo que almacena la fecha de creación automáticamente
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    // Campo que almacena la fecha de actualización automáticamente
    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}