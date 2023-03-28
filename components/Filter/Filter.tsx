import filterFields from "../../data/filterFields.json";

export const Filter = ({ onChange, value }: { onChange: (type: string) => void, value: string }) => {
  return (
    <div className='max-w-7xl m-auto mb-8 flex justify-start gap-x-4'>
      <h2 className='text-xl'>Filter By</h2>
      <select onChange={(e) => onChange(e.target.value)} value={value}>
        {filterFields.map(({ value, label }) => (
          <option value={value}>{label}</option>
        ))}
      </select>
    </div>
  );
};
