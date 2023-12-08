
import React, { useState } from 'react'; 
import { Register } from '../Register';
import { Autori } from '../Autori';

export const Form = () => {
    const [register, setRegister] = useState(true)
    const [autory, setAutory] = useState(false)
    // const [modalRegister, setModalRegister] = useState(false)

    return (
        <>
            {register && <Register falseRegister={setRegister} FalseAutory={setAutory}/>}
            {autory && <Autori />}
        </>
    )
}