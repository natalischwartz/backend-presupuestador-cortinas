import User from '../models/User.model.js';
import { userRepository } from '../middlewares/user-repository.js';
import { SECRET_JWT_KEY } from '../config/config.js';
import jwt from 'jsonwebtoken';


export const logIn = async (req,res) =>{
    try {
        /*el usuario nos da en el login un email y password.vamos a buscar si el email existe en nuestra bbdd. el findOne me va a devolver un objeto. 
    */
        const {email,password} = req.body
        // Busca al usuario por su email

         // Validaciones básicas
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email y contraseña son requeridos' 
            });
        }

        const user = await userRepository.login({email,password})
        // res.send({user})

        //vamos a crear un TOKEN para la sesion de usuario

        const token = jwt.sign(
            {_id: user._id,
            email: user.email},
            SECRET_JWT_KEY,{
            expiresIn:'1h'})

        res
            .cookie('access-token',token,{
                httpOnly: true, //la cookie solo se puede acceder en el server
                secure: process.env.NODE_ENV === 'production', //la cookie solo se puede acceder en https
                sameSite: 'strict', //la cookie solo se puede acceder en el mismo dominio
                maxAge: 1000*60*60 // la cookie tiene validez por 1 hora
            })

            res.json({
            success: true,
            message: 'Login exitoso',
            user: {
                id: user._id,
                email: user.email
            },
            token // Por si el frontend también lo quiere almacenar
        });
    
}catch (error) {
     console.error('Error en login:', error);
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
}



export const logOut = (req,res) =>{
    res
        .clearCookie('access-token')
        
         .json({ 
           success: true, 
           message: 'Logout exitoso' 
       });
}

// ✅ Endpoint para verificar sesión activa
export const checkAuth = (req, res) => {
    res.json({
        success: true,
        user: req.session.user
    });
}