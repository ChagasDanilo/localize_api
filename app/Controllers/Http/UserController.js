'use strict'

const User = use('App/Models/User')

class UserController {
    async create({ request, response, auth }) {
        try {
            const erroMessage = {
                'username.required': 'Usuário é obrigatório!',
                'username.unique': 'Esse usuário já existe!',
                'username.min': 'O username deve ter mais que 5 caracteres!',
                
                'email.required': 'Email é obrigatório!',
                'email.unique': 'Esse email já existe!',

                'password.required': 'Senha é obrigatório!',
                'password.min': 'A senha deve ter mais que 6 caracteres!',
            }

            const data = request.only(["username", "email", "password", "telefone1", "telefone2", "instagram",
                "facebook", "path", "cep", "cidade", "estado"])

            const user = await User.create(data)

            return user
        } catch(err) {
            console.log(err);
            return response.status(500).send({ error: 'Erro: ${err.message}'})
        }
    }

    async index ({ request, response, auth }) {
        try {
            const { cod } = request.get();
            
            if(cod == 0){
                const acessos = await User.query()
                .select('*')
                .where('id', auth.user.id)
                .fetch();

                return acessos
            } else {
                const acessos = await User.query()
                .select('*')
                .where('id', cod)
                .fetch();

                return acessos
            }            
        } catch (err) {
            return response.status(500).send({ error: err.message})   
        }
    }

    async show ({ request, response, auth }) {
        try {
            const data = await User.all();

            return data
        } catch (err) {
            return response.status(500).send({ error: err.message})   
        }
    }

    async temEmailCad ({ params, request, response }) {
        try {        
          const { texto } = request.get();
          
          const data = await User.query()
            .select('users.*',)
            .whereRaw('upper(users.email) = ?', [texto.toUpperCase()])
            .fetch();
    
            // console.log(data.rows.length);
          return data.rows.length > 0;
        } catch (error) {
            console.log(error.message);
            return false //response.status(500).send({error: 'Error: '+error.message})
        }    
    }

    async update ({ params, request, response, auth }) {
        try{
            const { id, username, email, password, telefone1, telefone2, instagram, facebook, path } = request.all()

            const data = await User.query()
            .where('id', auth.user.id)
            .first();
        
            if (!data) {
            return response.status(404).send({message: 'Nenhum registro localizado'})
            }

            data.username = username;
            data.email = email;                
            if(password != 0){
                data.password = password;
            }
            data.telefone1 = telefone1;
            data.telefone2 = telefone2;
            data.instagram = instagram;
            data.facebook = facebook;
            data.path = path;
            
            await data.save()

            return data
        }catch(err){
            return err
        }
    }

    async destroy ({ params, request, response }) {
        const { cod } = request.get();
        try{
            const data = await App.query()
            .where('id', cod)
            .first()
        
            if (!data) {
            return response.status(404).send({message: 'Nenhum registro localizado'})
            }
            
            await data.delete()
            return response.status(200).send({ message: 'registro removido!' })    
        }catch(err){
            console.log(err);            
        }
    }

    async resetPassword ({ params, request, response }) {
        try{
            const { cod } = request.all()

            const data = await User.query()
            .where('id', cod)
            .first();
            
            if (!data) {
                return response.status(404).send({message: 'Nenhum registro localizado'})
            }
            data.password = `123456`;             
                
            await data.save()
            return data
        }catch(err){
            return err
        }
    }

    async resetPasswordEmail ({ params, request, response }) {
        try{
            const { email } = request.all()

            const data = await User.query()
            .where('email', email)
            .first();
            
            if (!data) {
                return response.status(404).send({message: 'Nenhum registro localizado'})
            }
            data.password = `123456`;             
                
            await data.save()
            return data
        }catch(err){
            return err
        }
    }
}

module.exports = UserController
