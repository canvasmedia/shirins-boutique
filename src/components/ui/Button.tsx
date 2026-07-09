'use client';

import { useRef, useCallback, ReactNode, MouseEvent } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'wholesale';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  href?: string;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  magnetic?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  disabled = false,
  type = 'button',
  fullWidth = false,
  magnetic = true,
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const strength = 0.3;
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  }, [magnetic]);

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0, 0)';
    ref.current.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    setTimeout(() => {
      if (ref.current) ref.current.style.transition = '';
    }, 400);
  }, []);

  const baseStyles = 'magnetic-btn font-montserrat tracking-[0.08em] uppercase font-semibold rounded transition-all duration-200 select-none';

  const sizes = {
    sm: 'text-[11px] px-4 py-2',
    md: 'text-[12px] px-6 py-3',
    lg: 'text-[13px] px-8 py-4',
  };

  const variants = {
    primary: 'bg-ink text-gold border-2 border-ink hover:border-gold hover:bg-ink/90',
    secondary: 'bg-ivory text-ink border-2 border-gold hover:bg-gold/10',
    ghost: 'bg-transparent text-gold border-2 border-gold/50 hover:border-gold hover:bg-gold/5',
    wholesale: 'bg-wholesale text-white border-2 border-wholesale hover:bg-wholesale/90',
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${sizes[size]}
        ${variants[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
    >
      {children}
    </motion.button>
  );
}
