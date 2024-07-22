const Button = ({label, iconURL, backgroundColor, textColor, borderColor, onClick}) => {
  return (
    <button onClick={onClick} className="flex justify-center items-center 
    gap-2 px-7 py-4 border font-montserrat text-lg leading-none 
    bg-red-600 rounded-full text-white"
    >
        {label}
        
        {iconURL && <img 
        src={iconURL} 
        alt="arrow right" 
        className="ml-2 rounded-full w-5 h-5"
        />}
    </button>
  )
}

export default Button