import React from 'react';
import { Link } from 'react-router-dom';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  'aria-label'?: string;
  'aria-pressed'?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  href,
  className = '',
  type = 'button',
  disabled = false,
  'aria-label': ariaLabel,
  'aria-pressed': ariaPressed,
}) => {
  // Base styles with optimized transitions
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] tracking-wide';

  // Variant styles with professional polish
  const variantStyles = {
    primary:
      'bg-gradient-to-r from-primary via-primary-light to-primary text-white hover:from-primary-dark hover:via-primary hover:to-primary-dark shadow-md hover:shadow-lg hover:shadow-primary/25 focus:ring-primary border border-white/10',
    secondary:
      'bg-gradient-to-r from-secondary to-secondary-light text-primary-dark hover:from-secondary-dark hover:to-secondary shadow-md hover:shadow-lg hover:shadow-secondary/30 focus:ring-secondary',
    outline:
      'bg-white/90 backdrop-blur-sm border-2 border-primary/35 text-primary hover:bg-primary hover:text-white hover:border-primary shadow-sm hover:shadow-md focus:ring-primary',
  };

  // Size styles
  const sizeStyles = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-6 py-3.5 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  // Render as link if href is provided
  if (href) {
    const isApiDownload = href.startsWith('/api/');
    const isExternal = href.startsWith('http') || href.startsWith('mailto') || isApiDownload;

    // External link
    if (isExternal) {
      return (
        <a
          href={href}
          className={combinedClassName}
          onClick={onClick}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      );
    }
    
    // Internal link using React Router
    return (
      <Link 
        to={href} 
        className={combinedClassName} 
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    );
  }

  // Render as button
  return (
    <button
      type={type}
      className={combinedClassName}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
    >
      {children}
    </button>
  );
};

export default Button;
