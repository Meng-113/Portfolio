import React from 'react';

const variantClasses = {
  primary: 'btn btn-primary',
  secondary: 'btn btn-secondary',
};

const sizeClasses = {
  md: 'btn-md',
  sm: 'btn-sm',
  xs: 'btn-xs',
  logo: 'btn-logo',
};

const HeroButton = ({
  href,
  onClick,
  type = 'button',
  disabled = false,
  children,
  ariaLabel,
  label,
  Label,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const classes = `${variantClasses[variant] ?? variantClasses.primary} ${
    sizeClasses[size] ?? sizeClasses.md
  } disabled:cursor-not-allowed disabled:opacity-60 ${className}`.trim();
  const resolvedAriaLabel = ariaLabel ?? label ?? Label;
  const content = <span className="btn-label">{children}</span>;

  if (typeof href === 'string' && href.length > 0) {
    return (
      <a href={href} className={classes} aria-label={resolvedAriaLabel}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      aria-label={resolvedAriaLabel}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default HeroButton;
