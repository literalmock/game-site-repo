const {z} = require("zod")

const profileEditSchema = z.object({
    name: z.string().min(1, "Name cannot be empty").optional(),
    phoneno: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid phone number").optional(),
    skills: z.array(z.string()).optional(),
    age: z.number().min(18, "Age must be at least 18").max(100, "Age must be at most 100").optional(),
    gender: z.enum(["male", "female", "non-binary", "other"]).optional(),
    email: z.string().email("Enter a valid email").optional(),
    password: z.string().min(6, "Password must be at least 6 characters long").optional(),
    about: z.string().max(300, "About section cannot exceed 300 characters").optional(),
    photoURL: z.string().url("Enter a valid URL").optional()
});

module.exports = {
    profileEditSchema
}