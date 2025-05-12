import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

const Select = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };
  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-sm text-white outline-none bg-white/10 border border-white/50 px-2.5 py-3 rounded-md flex justify-between items-center focus-within:border-primary"
      >
        {value
          ? options.find((opt) => opt.value === value)?.label
          : placeholder}
        <span className="ml-2">
          {isOpen ? (
            <LuChevronDown />
          ) : (
            <LuChevronDown className="cursor-pointer" />
          )}
        </span>
      </button>
      {isOpen && (
        <div className="absolute w-full bg-bg-black border border-primary rounded-md mt-1 shadow-md z-10">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="px-3 py-2 text-white text-sm cursor-pointer hover:bg-primary"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
