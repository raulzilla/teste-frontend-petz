import { InputHTMLAttributes } from "react";
import styles from './text-field.module.css';
import { Inter } from "@next/font/google";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const inter = Inter({ subsets: ['latin'] })

const TextField = ({ label, ...rest }: TextFieldProps) => {
  return (
    <div className={styles.container}>
      <label htmlFor={label} className={styles.label}><b>{label}</b></label>
      <input name={label} className={`${styles.textField} ${inter.className}`} {...rest} />
    </div>
  );
}

export default TextField;
