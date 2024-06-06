import { useState } from 'react';
import CreatableSelect from 'react-select/creatable';

interface Option {
  value: string;
  label: string;
}

// Sample statusOptions data
const statusOptions: Option[] = [
  { value: 'waitforresponse', label: 'Wait For Response' },
  { value: 'in progress', label: 'In Progress' },
  { value: 'open', label: 'Open' },
  { value: 'closed', label: 'Closed' },
];

const StatusOptionsPicker: React.FC = () => {
  const [options, setOptions] = useState<Option[]>(statusOptions);
  
  const handleCreateOption = (newValue: string) => {
    const newOption: Option = {
      value: newValue,
      label: newValue.charAt(0).toUpperCase() + newValue.slice(1)
    };

    setOptions([...options, newOption]);
  };

  return (
    <CreatableSelect 
      isClearable
      onChange={(selectedOption) => console.log(selectedOption)}
      options={options}
      onCreateOption={handleCreateOption}
    />
  );
};

export default StatusOptionsPicker;


