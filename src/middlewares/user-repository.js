import User from '../models/User.model.js'


export class userRepository{
    static async login({email,password}){
        email(email);
        password(password);



        //1. Validar si ese mail existe en la base de datos 

        const userFound = await User.findOne({email:email})
        // console.log(userFound);

        if(!userFound) throw new Error("Email does not exist")
            // return res.redirect('/login')

        //2. si existe el usuario comparar el password. nos devuelve true or false
        const matchPassword = await User.comparePassword(password,userFound.password)

        if(!matchPassword) throw new Error("Password is invalid")

        // le quitamos al objeto userFound la propiedad password, para que no se muestre

        const {password: _, ...publicUser} = userFound


        // y si matchea el password 
        return publicUser;


    }





}