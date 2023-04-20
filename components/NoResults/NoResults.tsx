import styles from "./NoResults.module.css";

export const NoResults = ({className}:{className?:string}) => {
  return (
    <div>
    <div className={`mx-auto my-16 w-1/3 h-1/3 relative ${className}`}>
        <img
          src='/no-results.svg'
          alt='Vercel Logo'
          className={`mx-auto ${styles.noResultsImg}`}
        />
        <h2 className='font-bold text-2xl text-brandsPrimary text-center uppercase absolute bottom-0 right-0  bg-white p-2 rounded-md transform translate-x-1/2 '>
          Sorry, not results found
        </h2>
      </div>
    </div>
  );
};
