
import React, { useEffect, useRef, useState } from 'react';
import styles from './Register.module.scss'
import axios from 'axios';
import { Autori } from '../Autori';

const useValidation = (value, validations) => {
    const [isEmpty, setIsEmpty] = useState(true)
    const [minLengthError, setMinLengthError] = useState(false)
    const [maxLengthError, setMaxLengthError] = useState(false)
    const [emailError, setEmailError] = useState()
    const [inputValid, setInputValid] = useState(false)

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'minLength':
                    value.length < validations[validation] 
                        ? setMinLengthError(true) 
                        : setMinLengthError(false)
                    break;
                case 'isEmpty':
                    value ? setIsEmpty(false) : setIsEmpty(true)
                    break
                case 'maxLength':
                    value.length > validations[validation] 
                        ? setMaxLengthError(true) 
                        : setMaxLengthError(false)
                    break
                case 'isEmail':
                    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                    re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true)
                    break
            }
        }
    }, [value])

    useEffect(() => {
        if (isEmpty || maxLengthError || minLengthError || emailError) {
            setInputValid(false)
        } else {
            setInputValid(true)
        }
    }, [isEmpty, maxLengthError, minLengthError, emailError])

    return {
        isEmpty,
        minLengthError,
        maxLengthError,
        emailError,
        inputValid
    }
}

const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue)
    const [isDirty, setIsDirty] = useState(false)
    const valid = useValidation(value, validations)

    const onChange = (event) => {
        setValue(event.target.value)
    }
    const onBlur = (event) => {
        setIsDirty(true)
    }

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
}

export const Register = ({falseRegister, FalseAutory}) => {
    const email = useInput('', {isEmpty: true, minLength: 3, isEmail: true})
    const password = useInput('', {isEmpty: true, minLength: 5, maxLength: 14})
    // const [openRegistration, setOpenRegistration] = useState(true)
    const refInpur = useRef(null)
    // const [entrance, setEntrance] = useState(true)

    async function postQuery(event) {
        event.preventDefault()
        console.log('hello')
        falseRegister(false)
        FalseAutory(true)

        try {
            
            refInpur.current.textContent = ''
            axios.defaults.baseURL = 'https://656c7379e1e03bfd572e5367.mockapi.io/user'

            const response = await axios({
                method: 'POST',
                data: {
                    userId: 1,
                    email: email.value,
                    password: password.value
                }
            })
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.data.errText, 'error');
            } else if (error instanceof Error) {
                console.log(error.message);
            }
        }   
    }

    return (
        <div className={styles.registration}>
            <form className={styles.form} onSubmit={(event) => postQuery(event)}>
                <div className={styles.form__block}>
                    <h2 className={styles.form__title}>Регистрация</h2>
                    <button style={{backgroundColor: 'red'}}
                        onClick={() => falseRegister(false)}>X</button>
                </div>
                {(email.isDirty && email.isEmpty) 
                    && <div style={{color: 'red'}}>Поле не может быть пустым</div>}
                {(email.isDirty && email.minLengthError) 
                    && <div style={{color: 'red'}}>Неккоректная длинна</div>}
                {(email.isDirty && email.emailError) 
                    && <div style={{color: 'red'}}>Неккоректная email</div>}
                <input ref={refInpur}
                    className={styles.form__input} value={email.value} 
                    name='email' type="email" 
                    placeholder='Enter your email...' 
                    onChange={(event) => {email.onChange(event)}}
                    onBlur={(event) => {email.onBlur(event)}} />

                {(password.isDirty && password.maxLengthError) && 
                    <div style={{color: 'red'}}>Слишком длинный пароль</div>}
                {(password.isDirty && password.isEmpty) && 
                    <div style={{color: 'red'}}>Поле не может быть пустым</div>}
                {(password.isDirty && password.minLengthError) && 
                    <div style={{color: 'red'}}>Неккоректная длинна</div>}
                <input className={styles.form__input} value={password.value} 
                    name='password' type="password" 
                    placeholder='Enter your password' 
                    onChange={(event) => {password.onChange(event)}}
                    onBlur={(event) => {password.onBlur(event)}} />
                    
                <button className={styles.form__button}
                    disabled={!email.inputValid || !password.inputValid} 
                    type='submit'>Зарегистрироваться</button>
            </form>
        </div>
    )
}