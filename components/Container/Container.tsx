export const Container = ({ children }: { children: JSX.Element }) => (
  <div className='flex justify-center'>
    <div className='max-w-7xl'>{children}</div>
  </div>
);
