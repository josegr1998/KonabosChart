import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className='h-24 bg-white'>
    <div className="max-w-7xl  border-t-2 flex justify-center items-center mx-auto h-full">
     <a href='https://github.com/josegr1998' target='_blank'>
      <img
       src='/github.png'
       alt='Vercel Logo'
       className={`mx-auto ${styles.githubImg}`}
      />
     </a>
     </div>
    </div>
  );
};

export default Footer;
