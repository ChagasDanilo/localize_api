'use strict'

const User = use('App/Models/User')

class LoginController {
    async login({ request, response, auth }) {
        const { email, password } = request.all()
        const user = await auth.attempt(email, password)

        return user
    }

    async logout({ request, response, auth }) {
        await auth.logout();

        return 'Logout in successfully'
    }

    async loginGoogle({ request, response, auth }) {
        try {
            const { email, password } = request.all()

            const token = await auth.use('api').attempt(email, password)
            console.log(token);
            return token
        } catch {
            return response.badRequest('Invalid credentials')
        }
        // try {
        //     const { email, password } = request.all()
        //     const validaToken = await auth.attempt(email, password)

        //     console.log(validaToken);
        //     return validaToken
        // } catch (err) {
        //     return err
        // }
    }

    async loginCheck({ request, response, auth }) {
        try {
            // const cons = await User.query()
            //     .where('id', auth.user.id)
            //     .first();

            // var data = {
            //     user_id: null,
            // };
            // data.user_id = cons.id;

            // this.gravaLoginLog(auth.user.email);
            console.log(auth.getUser());
            return await auth.getUser();
        } catch (error) {
            response.send('You are not logged in')
            return 'You are not logged in'
        }
    }

    async gravaLoginLog(email) { //username, email, password, type, associado_id, status){
        try {
            console.log('log');
            const cons = await User.query()
                .where('email', email)
                .first();

            var data = {
                user_id: null,
            };
            data.user_id = cons.id;

            const log = await LoginLog.create(data);
            return log

        } catch (err) {
            console.log('user_login_log: ' + err);
            return 'user_login_log: ' + err
        }
    }
}

module.exports = LoginController