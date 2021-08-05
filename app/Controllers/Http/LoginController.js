'use strict'

const User = use('App/Models/User')

class LoginController {
    async login ({ request, response, auth }) {
        const { email, password } = request.all()
        const user = await auth.attempt(email, password)
    
        return user
    }

    async logout ({ request, response, auth }) {
      await auth.logout();
  
      return 'Logout in successfully'
    }

    async loginGoogle ({ request, response, auth }) {
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
    
    async loginCheck ({ request, response, auth }) {
        try {
            this.gravaLoginLog(auth.user.email);
            return await auth.getUser();
          } catch (error) {
            response.send('You are not logged in')
            return 'You are not logged in'
          }
    }
}

module.exports = LoginController