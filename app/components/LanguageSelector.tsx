import { languageOptions } from '../utils/constants';

const LanguageSelector = ({ value, onChange, disabledValue }: {
  value: string;
  onChange: (value: string) => void;
  disabledValue?: string;
}) => (
  <select 
    className="w-full p-2 border border-gray-300 rounded"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  >
    <option value="">Select language</option>
    {languageOptions.map((option) => (
      <option key={option.value} value={option.value} disabled={option.value === disabledValue}>
        {option.label}
      </option>
    ))}
  </select>
);

export default LanguageSelector;