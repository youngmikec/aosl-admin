import { UserType } from "./enums";

export type Step = {
    title: string;
    isActive: boolean;
}

export type User = {
    _id: string;
    id: string;
    userType: UserType;
    code: string;
    resetCode: string;
    canResetPassword: boolean;
    balance: number;
    transactionPin: string;
    firstName: string;
    lastName: string;
    gender: 'MALE' | 'FEMALE'
    address: string;
    password: string;
    profileImage: string;
    email: string;
    phone: string;
    
    isProfileComplete: boolean;
    isVerified: boolean;
    approvedBy: string;
    approvedDate: Date;
    verifiedBy: string;
    verifiedDate: Date;
    disengagedBy: string;
    disengagedDate: Date;
    accessLevel: number;
    emailNotification: boolean;
    smsNotification: boolean;
    notifications: any[];
    createdAt: Date;
    createdBy: User;
    updatedBy: User;
    deleted: number;
    deletedAt: Date;
    deletedBy: User;
}