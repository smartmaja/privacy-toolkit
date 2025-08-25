import { useRef } from 'react';
import type { MouseEvent, ButtonHTMLAttributes, ReactNode } from 'react';

type RippleButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
};

function RippleButton({ children, ...props }: RippleButtonProps) {
    const btnRef = useRef<HTMLButtonElement>(null);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        const button = btnRef.current;
        if (!button) return;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        button.appendChild(ripple);

        ripple.addEventListener('animationend', () => {
        ripple.remove();
        });

        if (props.onClick) props.onClick(e);
    };

    return (
        <button {...props} className={`btn btn-ripple ${props.className || ''}`} ref={btnRef} onClick={handleClick}>
        {children}
        </button>
    );
}

export default RippleButton;