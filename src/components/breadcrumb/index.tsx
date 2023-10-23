import styles from './breadcrumb.module.css';
import { Inter } from "@next/font/google";

interface BreadcrumbProps {
  label: string[]
}

const inter = Inter({ subsets: ['latin'] })

const Breadcrumb = ({ label }: BreadcrumbProps) => {
  return (
    <span className={`${styles.text} ${inter.className}`}>
      {label.map((item, index) => {
        if (label.length === index + 1) return item

        return `${item} > `
      })}
    </span>
  );
}

export default Breadcrumb;
