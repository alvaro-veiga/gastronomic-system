import { useEffect, useState } from 'react'
import styles from './page.module.css'
import { TextField, Button } from '@mui/material'
import authServices from '../../services/auth'
import { useNavigate } from 'react-router-dom'
import { LuLogIn } from 'react-icons/lu'

export default function Auth() {
    const [ formType, setFormType] = useState('login')
    const [ formData, setFormData] = useState(null)
    const { login, signup, authLoading } = authServices()

    const navigate = useNavigate()
    const authData = JSON.parse(localStorage.getItem('auth'))

    useEffect(() => {
        if (authData) {
            setTimeout(() => navigate('/profile'), 0);
        }
    }, [authData]);

    const handleChangeFormType = () => {
        setFormData(null)
        if (formType === 'login') {
            setFormType('signup')
        } else {
            setFormType('login')
        }
    }

    const handleFormDataChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmitForm = (event) => {
        event.preventDefault()

        switch (formType) {
            case 'login':
                login(formData)
                break
            case 'signup':
                if (formData.password !== formData.confirmPassword) {
                    console.log('As senhas são diferentes')
                    return
                }
                signup(formData)
                break
        }
    }
    if (authLoading) {
        return(
            <h1>Loading...</h1>
        )
    }

    return (
        <div className={styles.authPageContainer}>
            {formType === 'login' ? (
                <>
                    <h1>Login</h1>
                    <button onClick={handleChangeFormType}>Não tem conta? clique aqui</button>
                    <form onSubmit={handleSubmitForm}>
                        <TextField 
                        required
                        label='Email'
                        type='email'
                        name='email'
                        onChange={handleFormDataChange}
                        />
                        <TextField 
                        required
                        label='Senha'
                        type='password'
                        name='password'
                        onChange={handleFormDataChange}
                        />
                        <button type='submit'>Login<LuLogIn/></button>
                    </form>
                </>
            ): null}
            {formType === 'signup'? (
                <>
                    <h1>Registro</h1>
                    <button onClick={handleChangeFormType}>Ja tem conta? clique aqui</button>
                    <form onSubmit={handleSubmitForm}>
                        <TextField 
                        required
                        label='Nome Completo'
                        type='fullname'
                        name='fullname'
                        onChange={handleFormDataChange}
                        />
                        <TextField 
                        required
                        label='Email'
                        type='email'
                        name='email'
                        onChange={handleFormDataChange}
                        />
                        <TextField 
                        required
                        label='Senha'
                        type='password'
                        name='password'
                        onChange={handleFormDataChange}
                        />
                        <TextField 
                        required
                        label='Confirme sua senha'
                        type='password'
                        name='confirmPassword'
                        onChange={handleFormDataChange}
                        />
                        <button type='submit'>Registre-se<LuLogIn/></button>
                    </form>
                </>
            ): null}
        </div>
    )
}