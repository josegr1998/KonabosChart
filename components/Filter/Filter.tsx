import filterFields from "../../data/filterFields.json";
import filterDates from "../../data/dates.json";
import { IFilterState } from "./IFIlterState";
import { Container } from "../Container/Container";

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
    <Container>
      <div className='max-w-7xl m-auto mb-8 flex justify-center mt-6 md:mt-0 md:justify-start gap-x-4'>
        <div className='relative'>
          <button
            className='rounded-md border-2 p-1 w-24 border-brandsPrimaryDark'
            onClick={() => onDisplayChange("type")}
          >
            Type
          </button>
          <div
            className={`transform transition-all absolute ${states.type.isOpen ? 'scale-100' : 'scale-0'} w-32 h-32 border border-brandsPrimary z-20 bg-white rounded-md
        mt-2 px-2`}
          >
            {filterFields.map(({ value, label }, index) => (
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
            className={`transform transition-all absolute ${states.date.isOpen ? 'scale-100' : 'scale-0'} w-32 h-32 border border-brandsPrimary z-20 bg-white rounded-md
        mt-2 px-2`}
          >
            {filterDates.map((field, index) => (
              <div key={index}>
                <button className='hover:text-brandsPrimary' onClick={() => onChange('date', field)}>
                  {field}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};
