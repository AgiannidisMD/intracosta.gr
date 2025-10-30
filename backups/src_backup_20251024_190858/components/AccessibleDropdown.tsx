import { useState, useRef, useEffect } from 'react';

interface DropdownItem {
  text: string;
  onSelect: () => void;
}

interface AccessibleDropdownProps {
  label: string;
  items: DropdownItem[];
}

export default function AccessibleDropdown({ label, items }: AccessibleDropdownProps) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!buttonRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="px-4 py-2"
      >
        {label}
      </button>
      {open && (
        <ul role="menu" className="absolute mt-2 w-48 bg-white shadow-lg">
          {items.map((item, idx) => (
            <li role="none" key={idx}>
              <button role="menuitem" onClick={item.onSelect} className="block w-full text-left px-4 py-2">
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
