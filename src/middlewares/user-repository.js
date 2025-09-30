import User from '../models/User.model.js'

export class userRepository {
    static async login({ email, password }) {
        // ✅ 1. Validaciones básicas de entrada
        if (!email || !password) {
            throw new Error("Email y contraseña son requeridos");
        }

        // ✅ 2. Buscar usuario (con select explícito si quieres)
        const userFound = await User.findOne({ email: email });
        
        if (!userFound) {
            // ✅ Mismo mensaje por seguridad - no revelar si el email existe
            throw new Error("Credenciales inválidas");
        }

        // ✅ 3. Comparar contraseña
        const matchPassword = await User.comparePassword(password, userFound.password);
        
        if (!matchPassword) {
            // ✅ Mismo mensaje por seguridad
            throw new Error("Credenciales inválidas");
        }

        // ✅ 4. Convertir a objeto plano y eliminar password
        const userObject = userFound.toObject(); // Convierte el documento Mongoose a objeto JS
        delete userObject.password;

        return userObject;
    }
}