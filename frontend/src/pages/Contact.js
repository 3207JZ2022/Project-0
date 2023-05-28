import React from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import './Contact.css'

export default function Contact() {

  const email='jianzhang2020c@gmail.com';
  const githublink="https://github.com/3207JZ2022";
  const linkedinlink="https://www.linkedin.com/in/jian-zhang-595154201/"
  return (
    <div className="contact-page">
        <Header />
        <div className="contact-body">

            <ul className="contact-list">
                <li className="contact-list-item">
                  <h1>Jian Zhang</h1>
                </li>
                <li className="contact-list-item">
                  <h3>Email: <a href={"mailto:" + email}>{email}</a>
                  </h3>
                </li>
                <li className="contact-list-item">
                  <h3>GitHub: <a href={githublink}>{githublink}</a></h3>
                </li>
                <li className="contact-list-item">
                  <h3>LinkedIn: <a href={linkedinlink}>{linkedinlink}</a></h3>
                </li>

            </ul>

            <div>
              
            </div>
        </div>
        <Footer />
    </div>
  )
}