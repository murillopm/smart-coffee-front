import {
  HomeWrapper,
  InputError,
  InputWrapper,
  RegisterButton,
  RegisterForm,
  RegisterInput,
  RegisterInputLabel,
} from './styles'
import expressoImg from '../../assets/images/coffee.svg'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import zod from 'zod'
import { api } from '../../services/api'

const schema = zod.object({
  name: zod.string().min(5, {
    message: 'O nome deve conter ao menos 5 caracteres',
  }),
  email: zod.string().email({
    message: 'Digite um email válido',
  }),
})

type RegisterFormInputs = zod.infer<typeof schema>

export function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(schema),
  })

  async function handleRegisterSubmit(user: RegisterFormInputs) {
    try {
      const { data } = await api.post('/register', {
        name: user.name,
        email: user.email,
      })
      console.log(data)
    } catch (error: any) {
      window.alert(error.response.data.error)
    }
  }

  return (
    <HomeWrapper>
      <img src={expressoImg} alt="" />
      <RegisterForm onSubmit={handleSubmit(handleRegisterSubmit)}>
        <InputWrapper>
          <RegisterInputLabel htmlFor="name">Nome completo</RegisterInputLabel>
          <RegisterInput type="text" id="name" {...register('name')} />
          {!!errors.name && <InputError>{errors.name.message}</InputError>}
        </InputWrapper>
        <InputWrapper>
          <RegisterInputLabel htmlFor="email">E-mail</RegisterInputLabel>
          <RegisterInput type="email" id="email" {...register('email')} />
          {!!errors.email && <InputError>{errors.email.message}</InputError>}
        </InputWrapper>
        <RegisterButton>Cadastrar</RegisterButton>
      </RegisterForm>
    </HomeWrapper>
  )
}
