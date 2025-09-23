"use client";
import { useEffect, useRef, useState } from 'react';
import { DropdownProps } from './Dropdown.types';

const Dropdown = ({ items, trigger, className = '', position = 'right' }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleItemClick = (onClick: () => void) => {
    onClick();
    setIsOpen(false);
  };

  const positionClasses = position === 'left' 
    ? 'left-0' 
    : 'right-0';

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer"
      >
        {trigger}
      </div>

      {isOpen && (
        <div className={`absolute top-full mt-1 ${positionClasses} z-50 bg-zinc-800 rounded-md shadow-lg border border-zinc-700 min-w-[180px] py-1`}>
          {items.map((item, index) => (
            <div key={item.id}>
              {item.separator && index > 0 && (
                <div className="border-t border-zinc-700 my-1"></div>
              )}
              <button
                onClick={() => handleItemClick(item.onClick)}
                className="w-full px-4 py-2 text-left text-sm text-white hover:bg-zinc-700 transition-colors duration-150 flex items-center space-x-2"
              >
                {item.icon && (
                  <span className="flex-shrink-0">
                    {item.icon}
                  </span>
                )}
                <span>{item.label}</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Dropdown.displayName = 'Dropdown';
export { Dropdown };

