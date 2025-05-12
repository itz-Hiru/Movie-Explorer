const Input = ({ label, type, placeholder, value, onChange, readOnly }) => {
  return (
    <div>
      <label className="text-[13px] text-white">{label}</label>
      <div className="input-box">
        <input
          type={type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-[13px]"
          value={value}
          onChange={(e) => onChange(e)}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
};

export default Input;
