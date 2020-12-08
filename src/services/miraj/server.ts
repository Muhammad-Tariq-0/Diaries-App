import { belongsTo, createServer, Factory, hasMany, Model, Response } from "miragejs"

export const handleErrors = (error:any, message="Error Occured") => {
return new Response(400,undefined,{
  data: {
         message,
         isError:true
  }
})
}


export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model.extend({
          diary : hasMany()
      }),
      diary: Model.extend({
          entry : hasMany(),
          user: belongsTo()
      }),
      entry: Model.extend({
          diary: belongsTo()
      })
    },

    factories: {
      user: Factory.extend({
        username: "test",
        email: "test@gmail.com",
        password:"1234"
      })
    },

    seeds(server) {
      server.create("user")
    },

    routes() {
      this.urlPrefix='http://diaries.app'
    },
  })

  return server
}