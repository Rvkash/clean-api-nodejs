const HttpResponse = require('../helpers/httpresponse')
const MissingParamError = require('../helpers/missing-param-error')

module.exports =
 class LoginRouter {
   constructor (authUseCase) {
     this.authUseCase = authUseCase
   }

   // if > try catch
   async route (httpRequest) {
     try {
       const { email, password } = httpRequest.body
       if (!email) {
         return HttpResponse.badRequest(new MissingParamError('email'))
       }
       if (!password) {
         return HttpResponse.badRequest(new MissingParamError('password'))
       }
       const accessToken = await this.authUseCase.auth(email, password)
       if (!accessToken) {
         return HttpResponse.unauthorizedError()
       }
       return HttpResponse.ok({ accessToken })
     } catch (error) {
       //  console.error(error)
       return HttpResponse.serverError()
     }
   }
 }
