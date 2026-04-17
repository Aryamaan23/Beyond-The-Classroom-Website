import React from 'react';

export interface CardProps {
  title?: string;
  description?: string;
  image?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  imageAlt?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  icon,
  children,
  className = '',
  onClick,
  imageAlt = '',
}) => {
  const baseStyles = 'bg-white/95 backdrop-blur-sm rounded-2xl shadow-card overflow-hidden transition-all duration-300 ease-out hover:shadow-card-hover hover:scale-[1.02] border-2 border-primary/10 hover:border-secondary/35 transform';
  const interactiveStyles = onClick ? 'cursor-pointer' : '';
  const combinedClassName = `${baseStyles} ${interactiveStyles} ${className}`;

  const CardElement = onClick ? 'button' : 'div';
  const cardProps = onClick ? {
    onClick,
    type: 'button' as const,
    className: `${combinedClassName} text-left w-full`,
  } : {
    className: combinedClassName,
  };

  return (
    <CardElement {...cardProps}>
      {image && (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={image}
            alt={imageAlt || title || 'Card image'}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      
      <div className="p-5 sm:p-6">
        {icon && (
          <div className="mb-3 sm:mb-4 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 text-primary" aria-hidden="true">
            {icon}
          </div>
        )}
        
        {title && (
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 tracking-tight">
            {title}
          </h3>
        )}
        
        {description && (
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            {description}
          </p>
        )}
        
        {children && (
          <div className="mt-3 sm:mt-4">
            {children}
          </div>
        )}
      </div>
    </CardElement>
  );
};

export default Card;
