import React, { InputHTMLAttributes, MutableRefObject, useCallback, useState } from "react";
import styles from './select-field.module.css';
import { Inter } from "@next/font/google";

interface SelectFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  options: {
    label: string,
    value: string
  }[]
  onSelectInput?: (value: string) => void
  inputRef?: MutableRefObject<HTMLInputElement | null>
  isInline?: boolean
}

const inter = Inter({ subsets: ['latin'] })

const SelectField = ({ label, onSelectInput, inputRef, isInline = false, options, ...rest }: SelectFieldProps) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const handleMenu = () => setOpenMenu(!openMenu);
  const handleCloseMenu = () => setOpenMenu(false);

  const handleSelectOption = useCallback((value: string) => {
    onSelectInput && onSelectInput(value)
    setSelectedValue(value);
    handleCloseMenu();
  }, [selectedValue]);

  const debouceOnBlur = () => setTimeout(() => handleCloseMenu(), 200);

  return (
    <div className={`${styles.container} ${isInline ? styles.inline : ''}`}>
      <label htmlFor={label} className={`${styles.label} ${isInline ? styles.labelInline : ''}`}><b>{label}</b></label>
      <div className={`${styles.selectFieldWrapper} ${isInline ? styles.selectFieldInline : ''}`}>
        <input
          className={`
            ${styles.selectField}
            ${openMenu ? styles.selectFieldOpen : ''}
            ${inter.className}
          `}
          onFocus={handleMenu}
          onBlur={debouceOnBlur}
          value={selectedValue}
          name={label}
          ref={inputRef}
          readOnly
          {...rest}
        />
        {openMenu && (
          <ul className={`${styles.optionGroup} ${options.length > 10 ? styles.optionGroupExtend : ''}`}>
            {options.map(item => (
              <li
                key={item.value}
                className={`${styles.option} ${inter.className}`}
                value={item.value}
                onClick={() => handleSelectOption(item.value)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SelectField;
