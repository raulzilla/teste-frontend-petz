import Image from 'next/image'
import { Inter } from '@next/font/google'
import iconSuccess from '@/public/success.svg';
import iconError from '@/public/error.svg';
import styles from "./modal.module.css";
import Button from '@/components/button';
import Router from 'next/router';

export interface ModalProps {
  title: string
  subtitle: string
  kind?: 'success' | 'error'
}

const inter = Inter({ subsets: ['latin'] })

const Modal = ({ title, subtitle, kind = 'success' }: ModalProps) => {
  const kinds = {
    success: {
      icon: iconSuccess,
      alt: 'Ícone de sucesso'
    },
    error: {
      icon: iconError,
      alt: 'Ícone de erro'
    },
  }

  return (
    <section className={`${styles.modal} ${inter.className}`}>
      <h1>{title}</h1>
      <Image
        className={styles.image}
        src={kinds[kind].icon}
        alt={kinds[kind].alt}
      ></Image>
      <p className={styles.subtitle}>{subtitle}</p>
      <Button onClick={() => Router.push('/consultation-schedule')}>
        Fazer Novo Agendamento
      </Button>
    </section>
  );
}

export default Modal;
