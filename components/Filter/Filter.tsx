import filterFields from "../../data/filterFields.json";
import filterDates from "../../data/dates.json";
import { IFilterState } from "./IFIlterState";

export const Filter = ({
  onChange,
  states,
  onDisplayChange,
}: {
  onChange: (type: string, value: string) => void;
  states: IFilterState;
  onDisplayChange: (type: string) => void;
}) => {
  return (
    <div className='max-w-7xl m-auto mb-8 flex justify-start gap-x-4'>
      <div className='relative'>
        <button
          className='rounded-md border-2 p-1 w-24 border-brandsPrimaryDark'
          onClick={() => onDisplayChange("type")}
        >
          Type
        </button>
        <div
          className={`${states.type.isOpen ? 'absolute' : 'hidden'} w-32 h-32 border border-brandsPrimary z-20 bg-white rounded-md
        mt-2 px-2`}
        >
          {filterFields.map(({value,label},index) => (
            <div key={index}>
              <button className='hover:text-brandsPrimary' onClick={() => onChange('type', value)}>
                {label}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className='relative'>
        <button
          className='rounded-md border-2 p-1 w-24 border-brandsPrimaryDark'
          onClick={() => onDisplayChange("date")}
        >
          Date
        </button>
        <div
          className={`${states.date.isOpen ? 'absolute' : 'hidden'} w-32 h-32 border border-brandsPrimary z-20 bg-white rounded-md
        mt-2 px-2`}
        >
          {filterDates.map((field,index) => (
            <div key={index}>
              <button className='hover:text-brandsPrimary' onClick={() => onChange('date', field)}>
                {field}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
