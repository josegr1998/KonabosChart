import { useState } from "react";

export const Tooltip = ({text},{text:string}) => {

 const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative" onMouseOver={()=>setIsOpen(true)} onMouseLeave={()=>setIsOpen(false)}>
      <div className='w-8 h-8 cursor-pointer'>
        <img src='https://cdn.iconscout.com/icon/free/png-256/information-notice-info-ui-tooltip-guide-30515.png' />
      </div>
    <div className={`absolute w-48 h-auto bg-slate-100 z-20 top-8 right-0 px-4 py-4 rounded-md  transform transition-all ${isOpen ? 'scale-100' : 'scale-0'}`}>
        {text}
      </div>
    </div>
  );
};
