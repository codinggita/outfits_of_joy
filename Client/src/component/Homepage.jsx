import React from 'react'
import './Homepage.css'
import img1 from '../assets/Group 23.png'
import img2 from '../assets/s1.png'
import img3 from '../assets/i1.png'
import img4 from '../assets/t1.png'

export default function Homepage() {
  return (
    <>
    <main>
        <section>
            <div id='hpinstruction'>
                <img src={img1} alt="" />
            </div>
            <div id='hpmensection'>
                <div>
                    <img src={img2} alt="" />
                    <p>Sherwani</p>
                </div>
                <div>
                    <img src={img3} alt="" />
                    <p>Indo-Western</p>
                </div>
                <div>
                    <img src={img4} alt="" />
                    <p>Tuxedo</p>
                </div>
            </div>
        </section>
    </main>
    </>
  )
}
