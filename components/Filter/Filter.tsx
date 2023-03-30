import filterFields from "../../data/filterFields.json";
import filterDates from '../../data/dates.json'
import { IFilterState } from "./IFIlterState";

export const Filter = ({ onChange, states }: { onChange: (type: string,value:string) => void, states: IFilterState }) => {
  return (
    <div className='max-w-7xl m-auto mb-8 flex justify-start gap-x-4'>
      <h2 className='text-xl'>Filter By</h2>
      <div>
        <p>Type</p>
        <select name='type' onChange={(e) => onChange(e.target.name, e.target.value)} value={states.type}>
          {filterFields.map(({ value, label }) => (
            <option value={value}>{label}</option>
          ))}
        </select>
      </div>
      <div>
        <p>Date</p>
        <select name='date' onChange={(e) => onChange(e.target.name,e.target.value)} value={states.date}>
          {filterDates.map((year)=><option value={year}>{year}</option>)}
        </select>
      </div>
    </div>
  );
};
