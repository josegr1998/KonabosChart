export const Container = ({ children,className }: { children: JSX.Element,className?:string }) => (
  
    <div className={`px-4 max-w-7xl m-auto ${className}`}>{children}</div>
 
);
