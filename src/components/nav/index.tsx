import { Inter } from '@next/font/google'
import styles from "./nav.module.css";
import Breadcrumb from '@/components/breadcrumb';

interface NavProps {
  title: string
  subtitle: string
  breadcrumb: string[]
}

const inter = Inter({ subsets: ['latin'] })

const Nav = ({ title, subtitle, breadcrumb }: NavProps) => {
  return (
    <nav role="listitem" className={`${styles.nav} ${inter.className}`}>
      <Breadcrumb label={breadcrumb} />
      <h1 className={styles.navText}>{title}</h1>
      <p className={styles.navText}>{subtitle}</p>
    </nav>
  );
}

export default Nav;
