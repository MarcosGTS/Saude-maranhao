import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useState } from "react";

export default function Searchbar({
  onSearch,                           // function to call on button click
  placeholder = "Palavras-chave (ex: dengue, malefícios, prevenção)",
  containerClassName = "",
  inputClassName = "",
  buttonClassName = "",
  buttonStyle = {},
}) {
  const [value, setValue] = useState('');

  const handleClick = () => {
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className={`mx-auto max-w-[950px] flex gap-4 justify-center ${containerClassName}`}>
      <InputText
        className={`grow-9 ${inputClassName}`}
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        style={{ backgroundColor: 'var(--tertiary)', ...buttonStyle }}
        className={buttonClassName}
        label="Buscar"
        icon="pi pi-search"
        onClick={handleClick}
      />
    </div>
  );
}
