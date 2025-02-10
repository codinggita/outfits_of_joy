import React from 'react'
import { Link } from 'react-router-dom'
import './Homepage.css'
import img1 from '../assets/Group 23.png'
import img2 from '../assets/s1.png'
import img3 from '../assets/i1.png'
import img4 from '../assets/t1.png'
import img5 from '../assets/l1.png'
import img6 from '../assets/a1.png'
import img7 from '../assets/g1.png'
import img8 from '../assets/r1.png'
import img9 from '../assets/w1.png'

export default function Homepage() {
    return (
        <>
            <main id='hpmain'>
                <section id='hpsection'>
                    <div id='hpinstruction'>
                        <img src={img1} alt="" />
                    </div>
                    <div id='hpmensection'>

                        <div>
                            <Link to='/Malecollection/sherwani'>
                                <img src={img2} alt="" />
                                <p>Sherwani</p>
                            </Link>
                        </div>

                        <div>
                            <Link to='/Malecollection/indo-western'>
                                <img src={img3} alt="" />
                                <p>Indo-Western</p>
                            </Link>
                        </div>

                        <div>
                            <Link to='/Malecollection/tuxedo'>
                                <img src={img4} alt="" />
                                <p>Tuxedo</p>
                            </Link>
                        </div>
                    </div>
                    <div id='hpwomensection'>
                        <div>
                            <Link to='/Femalecollection/lehenga'>
                                <img src={img5} alt="" />
                                <p>Lehenga</p>
                            </Link>
                        </div>
                        <div>
                            <Link to='/Femalecollection/anarkali'>
                                <img src={img6} alt="" />
                                <p>Anarkali</p>
                            </Link>
                        </div>
                        <div>
                            <Link to='/Femalecollection/gown'>
                                <img src={img7} alt="" />
                                <p>Gown</p>
                            </Link>
                        </div>
                    </div>
                    <div id='hpmensctn'>
                        <img src={img8} alt="" />
                    </div>
                    <div id='hpwomensctn'>
                        <img src={img9} alt="" />
                    </div>
                </section>
            </main>
        </>
    )
}
