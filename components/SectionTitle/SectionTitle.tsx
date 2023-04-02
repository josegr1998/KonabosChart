export const SectionTitle = ({ title,className }: { title: string,className:string }) => (
  <div>
    <h2 className={`text-center text-3xl font-bold capitalize ${className}`}>{title}</h2>
  </div>
);
