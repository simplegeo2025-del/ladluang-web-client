import { useState, forwardRef } from 'react';
import { Icon } from '@iconify/react';

const PasswordInput = forwardRef(({ id, name, autoComplete, required, className, value, onChange }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="relative">
            <input
                ref={ref}
                id={id}
                name={name}
                type={showPassword ? 'text' : 'password'}
                autoComplete={autoComplete}
                required={required}
                className={className}
                value={value}
                onChange={onChange}
            />
            <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 hover:text-gray-700"
            >
                <Icon icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'} className="text-lg" />
            </button>
        </div>
    );
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
