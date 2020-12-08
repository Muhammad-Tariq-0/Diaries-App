import { randomBytes } from 'crypto'
import { Request, Response } from 'miragejs'
import { user } from '../../../interfaces/User,interface';
import { handleErrors } from '../server';

const generateToken = () => randomBytes(8).toString('Hex');

export interface AuthResponse{
    token: String,
    user: user
}
export const login = (schema:any,req:Request): AuthResponse | Response => {
    const {username,password} = JSON.parse(req.requestBody);
    const user = schema.users.findBy({username});
    if(!user){
        return handleErrors(null,"No user with that username exists")
    }
    if(password !== user.password){
        return handleErrors(null,"Password does'nt match")
    }
    const token = generateToken();
    return{
        user: user.attrs as user,
        token
    }
}

export const signup = (schema:any,req:Request): AuthResponse | Response => {
  const data = JSON.parse(req.requestBody);
  const exuser = schema.users.findBy({username: data.username});
  if(exuser){
      return handleErrors(null,'This username already exists')
  }  

  const user = schema.users.create(data);
  const token = generateToken();
  return{
      user: user.attrs as user,
      token
  }
}

