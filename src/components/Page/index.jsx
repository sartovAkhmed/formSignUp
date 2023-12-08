
import React, { useState } from 'react'; 
import stylles from './Page.module.scss'

import img from '../../img/IMAGE.jpg'
import icon1 from '../../img/icons/IMAGE-1.svg'
import icon2 from '../../img/icons/IMAGE-2.svg'
import icon3 from '../../img/icons/IMAGE-3.svg'
import icon from '../../img/icons/IMAGE.svg'

import { Register } from '../Register';
import { Autori } from '../Autori';
import { Form } from '../Form';
import { Tasks } from '../Tasks';
import { Content } from '../Content/Content';

export const Page = () => {
    const navLink = ['Home', 'Properties', 'About', 'Contact']
    const [modalRegister, setModalRegister] = useState(false)
    // const footerLink = ['instangram', 'facebook', 'twitter', 'LinckedIn']
    const [modalAutory, setModalAutory] = useState(false)
    const [pageContent, setPageContent] = useState(true)
    return (
        <div className={stylles.page}>
            <header>
                <div className="container">
                    <nav className={stylles.nav}>
                        <h2>Logoped <span style={{color: 'red'}}>*</span></h2>
                        <ul>
                            {navLink.map((link) => (
                                <li><a href="#">{link}</a></li>
                            ))}
                        </ul>
                        <div className={stylles.nav__block}>
                            <input className={stylles.page__input} placeholder='Search' type="search" />
                            <button className={stylles.page__button}
                                onClick={() => setModalRegister(!modalRegister)}>Регистрация</button>
                            <button className={stylles.page__button}
                                onClick={() => setModalAutory(!modalAutory)}>Вход</button>
                        </div>
                    </nav>
                </div>
            </header>
            <div className="container">
                {pageContent ? <Content /> : <Tasks />}
            </div>
            <footer>
                <div className="container">
                    <div className={stylles.footer__inner}>
                        <div className={stylles.footer__block}>
                            <h2>Logoped <span style={{color: 'red'}}>*</span></h2>
                        </div>
                        <div className={stylles.footer__block}>
                            <img src="" alt="map" />
                        </div>
                        <div className={stylles.footer__block}>
                            <ul>
                                <li><a href="#"><img src={icon1} alt="link" />instangram</a></li>
                                <li><a href="#"><img src={icon2} alt="link" />facebook</a></li>
                                <li><a href="#"><img src={icon3} alt="link" />twitter</a></li>
                                <li><a href="#"><img src={icon} alt="link" />linckedIn</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
            {modalRegister && <Form />}
            {modalAutory && <Autori removeModalAutory={setModalAutory} 
                setPageContents={setPageContent}/>}
        </div>
    )
}

function PageContent() {
    return (
        <section className={stylles.page__inner}>
            <div className={stylles.block__first}>
                <h1>Find house for your family in minutes</h1>
                <p>Aenean sodales mauris quis tellus facilisis, vel mattis magna. Interdum curabitur eget aliquam elit in mauris purus.</p>
                <div className={stylles.block__first__block}>
                    <input className={stylles.page__input} type="text" placeholder='Search' />
                    <button className={stylles.page__button}>Find property</button>
                </div>
            </div>
            <div className={stylles.block__second__block}>
                <img src={img} alt="page" />
            </div>
        </section>
    )
}