import React from 'react';
import profile_photo from '../Images/profile_photo.jpg';
import styles from './about.module.css';

export const About = () => {
    return(
        <section>
            <img src = {profile_photo} className = {styles.profile_photo}/>
            <p className = {styles.text_about_page}>My name is Viktor dabush, I am 28 years old.</p>
            <p className = {styles.text_about_page}>I have collection of Pokemon and Yu-gi-oh cards.</p>
            <p className = {styles.text_about_page}>I used to own an online business where i helped to ebay sellers, this way i made over 200k from my bed.</p>
    </section>
   );
}