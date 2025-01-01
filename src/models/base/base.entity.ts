import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ nullable: true, type: 'bigint' })
    created_by?: number;
    @CreateDateColumn({ nullable: true })
    created_at?: Date;
    @UpdateDateColumn({ nullable: true })
    updated_at?: Date;
    @Column({ nullable: true })
    deleted_at?: Date;
    @Column({ nullable: true, type: 'bigint' })
    deleted_by?: number;
}
