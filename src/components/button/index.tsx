import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styles from './button.module.css';
import { Inter } from "@next/font/google";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: 'solid' | 'link' | 'outline';
}

const inter = Inter({ subsets: ['latin'] })

const Button = ({ children, className, kind = 'solid', ...rest }: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      className={`${className} ${styles[kind]} ${styles.base} ${inter.className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
