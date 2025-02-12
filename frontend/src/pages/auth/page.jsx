import { useState } from 'react'
import styles from './page.module.css'
import { TextField, Button } from '@mui/material'

export default function Auth() {
    const [ formType, setFormType] = useState('login')
    const [ formData, setFormData] = useState(null)
    
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
                break
            case 'signup':
                if (formData.password !== formData.confirmPassword) {
                    console.log('As senhas são diferentes')
                }
                break
        }
    }

    if (formType === 'login') {
        return(
            <div className={styles.authPageContainer}>
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
                    <Button type='submit'>Login</Button>
                </form>
            </div>
        )
    }

    if (formType === 'signup') {
        return(
            <div className={styles.authPageContainer}>
                <h1>SingUp</h1>
                <button onClick={handleChangeFormType}>Ja tem conta? clique aqui</button>
                <form onSubmit={handleSubmitForm}>
                    <TextField 
                    required
                    label='Nome Completo'
                    type='name'
                    name='name'
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
                    <Button type='submit'>Registre-se</Button>
                </form>
            </div>
        )
    }
}