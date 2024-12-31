import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, CreateDateColumn, UpdateDateColumn, AfterLoad, BeforeUpdate } from 'typeorm';
import { hashSync } from 'bcrypt';
import { IUser } from 'src/interface/iuser.interface';
import { RoleType } from 'src/security';
import { BaseEntity } from './base/base.entity';

@Entity()
export class User extends BaseEntity implements IUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        nullable: true
    })
    email: string;

    @Column()
    password: string;

    @Column()
    fullName: string;

    @Column({ default: false })
    isActive: boolean;

    @Column({
        type: "char",
        length: 10,
        nullable: false,
        unique: true
    })
    phone: string;

    @Column({ nullable: true })
    avatarUrl?: string;

    @Column({
        type: "char",
        length: 12,
        nullable: true
    })
    citizenIdentificationNumber: string;

    @Column({ nullable: true })
    citizenIDFrontUrl: string;

    @Column({ nullable: true })
    citizenIDFrontBack: string;

    @Column({
        nullable: true,
        default: null
    })
    resetKey: string;

    @Column({ nullable: false, update: false })
    activeKey: string;

    @Column({
        enum: RoleType,
        default: RoleType.USER,
        update: false,
        type: 'enum',

    })
    role: string;

}
