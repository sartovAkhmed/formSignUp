
import { Route, Link } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import styles from './Autori.module.scss'
import { Tasks } from '../Tasks';
import axios from 'axios';

export function Autori({removeModalAutory, setPageContents}) {
    // const [register, setRegister] = useState(true)
    const [disableded, setDisableded] = useState(false)
    const [dataAutori, setDataAutori] = useState([])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorAutori, setErrorAutori] = useState(false)

    async function getQuery(event) {
        event.preventDefault()

        try {
            axios.defaults.baseURL = 'https://656c7379e1e03bfd572e5367.mockapi.io/user'
            const response = await axios({
                method: 'GET',
            })
            setDataAutori(response.data)
            dataAutori.map((user) => {
                if (user.email === email && user.password === password) {
                    // setRegister(false)
                    setPageContents(false)
                    removeModalAutory(false)
                } else {
                    setErrorAutori(true)
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
            <p className={styles.form__happy}>Поздравляю с успешной регистрацией!</p>       
            <form className={styles.form} onSubmit={(event) => getQuery(event)}>
                <div className={styles.form__block}>
                    <h2 className={styles.form__title}>Авторизация</h2>
                    <button onClick={() => removeModalAutory(false)}>X</button>
                </div>
                <input className={styles.form__input}
                    name='email' type="email" 
                    placeholder='Enter your email...'
                    onChange={(event) => setEmail(event.target.value)} />
                <input className={styles.form__input}
                    name='password' type="password" 
                    placeholder='Enter your password' 
                    onChange={(event) => setPassword(event.target.value)} />
                <button className={styles.form__button} 
                    type='submit' disabled={disableded}> Вход
                </button>
                {errorAutori && <h4 style={{color: 'red'}}>Неверный пароль или логин</h4>}
            </form>
        </div>
    )
    {/* {register ? <AutoryFirst setRegister={setRegister} removeModalAutory={removeModalAutory}/> : <Tasks />} */}
}

// function AutoryFirst({setRegister, removeModalAutory}) {
//     const [disableded, setDisableded] = useState(false)
//     const [dataAutori, setDataAutori] = useState([])
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [errorAutori, setErrorAutori] = useState(false)

//     async function getQuery(event) {
//         event.preventDefault()

//         try {
//             axios.defaults.baseURL = 'https://656c7379e1e03bfd572e5367.mockapi.io/dataRegister'
//             const response = await axios({
//                 method: 'GET',
//             })
//             setDataAutori(response.data)
//             console.log(dataAutori);
//             dataAutori.map((user) => {
//                 if (user.email === email && user.password === password) {
//                     setRegister(false)
//                 } else {
//                     setErrorAutori(true)
//                 }
//             })
//         } catch (error) {
//             if (axios.isAxiosError(error)) {
//                 console.log(error.response?.data.errText, 'error');
//             } else if (error instanceof Error) {
//                 console.log(error.message);
//             }
//         }
//     }

//     return (
//         <div className={styles.registration}>
//             <p className={styles.form__happy}>Поздравляю с успешной регистрацией!</p>       
//             <form className={styles.form} onSubmit={(event) => getQuery(event)}>
//                 <div className={styles.form__block}>
//                     <h2 className={styles.form__title}>Авторизация</h2>
//                     <button onClick={() => removeModalAutory(false)}>X</button>
//                 </div>
//                 <input className={styles.form__input}
//                     name='email' type="email" 
//                     placeholder='Enter your email...'
//                     onChange={(event) => setEmail(event.target.value)} />
//                 <input className={styles.form__input}
//                     name='password' type="password" 
//                     placeholder='Enter your password' 
//                     onChange={(event) => setPassword(event.target.value)} />
//                 <button className={styles.form__button} 
//                     type='submit' disabled={disableded}> Вход
//                 </button>
//                 {errorAutori && <h4 style={{color: 'red'}}>Неверный пароль или логин</h4>}
//             </form>
//         </div>
//     )
// }