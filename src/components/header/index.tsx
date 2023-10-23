import Image from 'next/image'
import Router from 'next/router';
import { Inter } from '@next/font/google'
import styles from "./header.module.css";
import Button from '@/components/button'
import pokeball from '@/public/images/white-pokeball.svg';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

const Header = () => {
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const navigateToHome = () => Router.push('/')

  const navigateToAbout = () => Router.push('/about')

  const navigateToConsultationSchedule = () => Router.push('/consultation-schedule')

  return (
    <header className={`${styles.header} ${inter.className}`}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li>
            <Button className={styles.button} onClick={navigateToHome}>
              <Image
                priority
                src={pokeball}
                className={styles.image}
                alt="Pokebola"
              />
              <span className={`${styles.text} ${showText ? styles.showText : ''}`}>
                Centro Pokémon
              </span>
            </Button>
          </li>
          <li>
            <Button onClick={navigateToAbout} kind='link'>
              Quem Somos
            </Button>
            <Button onClick={navigateToConsultationSchedule}>
              Agendar Consulta
            </Button>
          </li>
        </ul>
      </nav>
    </header >
  );
}

export default Header;
