import { z } from "zod";



export const loginSchema = z.object({
    email: z.string().email("Invalid Email."),
    password: z.string().min(8, "Password must be at least 8 characters long."),
});

export const registerSchema = z.object({
    email: z.string().email("Invalid Email."),
    password: z.string().min(8, "Password must be at least 8 characters long."),
    confirmPassword: z.string(),
    name: z.string().min(3, "Name must be at least 3 characters long."),
    avatar: z.custom<FileList>((val) => {
        if (typeof FileList === 'undefined') return true;
        return val instanceof FileList;
    }).optional(),
    // phone: z.string().min(11, "Phone number must be at least 11 characters long.").optional(),
    // address: z.string().min(10, "Address must be at least 10 characters long."),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
});

export const profileSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long."),
    email: z.string().email("Invalid Email."),
    avatar: z.custom<FileList>((val) => {
        if (typeof FileList === 'undefined') return true;
        return val instanceof FileList;
    }).optional(),
    password: z.string().min(8, "Password must be at least 8 characters long.").optional()
        .or(z.literal("")),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
