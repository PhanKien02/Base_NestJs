export interface IUser {
    id: number;
    email: string;
    phone: string;
    password: string;
    fullName: string;
    isActive: boolean;
    activeKey: string;
    resetKey: string;
    citizenIdentificationNumber: string;
    citizenIDFrontUrl: string;
    citizenIDFrontBack: string
    role: string;
    avatarUrl?: string;
    created_at?: Date;
    updated_at?: Date;
    created_by?: number;
    deletedBy?: number;
    deleted_at?: Date;
}
