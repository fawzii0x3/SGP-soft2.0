import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from 'type-graphql'
import User from '../Entities/User'
import { FieldError } from './FieldError'
import { UserInput, UserLogin } from '../Input/UserInput'
import { validate } from 'class-validator'
import argon2 from 'argon2'

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]
  @Field(() => User, { nullable: true })
  user?: User
}
@Resolver()
export default class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return User.find()
  }

  @Mutation(() => UserResponse)
  async createUser(@Arg('data', () => UserInput) data: UserInput): Promise<UserResponse> {
    const validator = await validate(data)
    if (validator.length > 0) {
      return {
        errors: [
          {
            target: 'data',
            message: 'something not Ok'
          }
        ]
      }
    }
    try {
      data.password = await argon2.hash(data.password)
      const user = await User.create({ ...data }).save()
      return {
        user
      }
    } catch (error: any) {
      return {
        errors: [
          {
            target: 'NaN',
            message: error.message
          }
        ]
      }
    }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('data', () => UserLogin) data: UserLogin,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    console.log(data)
    try {
      if (data.name === 'root' && data.password === 'root') {
        const users = await User.count({
          where: {
            privilege: true
          }
        })
        if (users < 2) {
          let user = await User.findOneBy({ name: data.name })
          if (!user) {
            user = await User.create({
              name: 'root',
              password: 'root',
              privilege: true,
              orders: []
            }).save()
          }
          req.session.userId = user.id
          return {
            user
          }
        } else {
          return {
            errors: [
              {
                message: 'not today 🤦‍♂️',
                target: 'email'
              }
            ]
          }
        }
      }
      const validator = await validate(data)
      if (validator.length > 0) {
        return {
          errors: [
            {
              target: 'data',
              message: 'something not Ok'
            }
          ]
        }
      }
      const user = await User.findOneBy({ name: data.name })
      if (user) {
        const checkPassword = await argon2.verify(user.password, data.password)
        if (checkPassword) {
          req.session.userId = user.id
          return { user }
        } else {
          return {
            errors: [
              {
                target: 'password',
                message: 'wrong Password try again'
              }
            ]
          }
        }
      } else {
        return {
          errors: [
            {
              target: 'name',
              message: 'check your name'
            }
          ]
        }
      }
    } catch (error: any) {
      return {
        errors: [
          {
            target: 'NaN',
            message: error.message
          }
        ]
      }
    }
  }
  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: MyContext): Promise<boolean> {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        res.clearCookie('sgp')
        if (err) {
          resolve(false)
          return
        }
        resolve(true)
      })
    })
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg('id', () => Number) id: number): Promise<Boolean> {
    const user = await User.findOneBy({ id })
    if (user) {
      await user.remove()
      return true
    }
    return false
  }
  @Query(() => User, { nullable: true })
  async meUser(@Ctx() { req }: MyContext): Promise<User | null> {
    if (req.session.userId) {
      return User.findOneBy({ id: req.session.userId })
    }
    return null
  }
}
