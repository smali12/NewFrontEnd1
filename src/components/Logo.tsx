'use client';

import React, { useState, useEffect } from 'react';
import { ASSETS } from '@/config/assets';

interface LogoProps {
  variant?: 'icon' | 'full';
  theme?: 'dark' | 'light';
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

/**
 * Logo Component with comprehensive error handling
 * - Responsive sizing across devices
 * - Theme-aware rendering
 * - Fallback text support
 * - Loading states
 * - ARIA labels for accessibility
 */
export function Logo({
  variant = 'icon',
  theme = 'light',
  size = 'medium',
  showText = false,
  className = '',
  style = {},
  onClick,
}: LogoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Size mappings for responsive rendering
  const sizeMap = {
    small: { width: 32, height: 32 },
    medium: { width: 40, height: 40 },
    large: { width: 56, height: 56 },
  };

  const currentSize = sizeMap[size];
  const logoConfig = ASSETS.logo[variant];
  const logoSrc = theme === 'dark' 
    ? ASSETS.logo.light.src 
    : ASSETS.logo.dark.src;

  // Determine which logo to display based on variant
  const displaySrc = variant === 'full' ? logoConfig.src : logoSrc;

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'opacity 0.2s ease',
    opacity: hasError ? 0.5 : 1,
    ...style,
  };

  const imageStyle: React.CSSProperties = {
    width: `${currentSize.width}px`,
    height: `${currentSize.height}px`,
    objectFit: 'contain',
    borderRadius: '12px',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexShrink: 0,
  };

  const handleImageLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleImageError = () => {
    console.error(`[Logo] Failed to load image: ${displaySrc}`);
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div
      style={containerStyle}
      className={className}
      onClick={onClick}
      role="img"
      aria-label="Analyst Platform Logo"
      title="Analyst Platform"
    >
      <div style={imageStyle}>
        {hasError ? (
          // Fallback: Display text logo if image fails
          <span
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700,
              fontSize: `${currentSize.width * 0.5}px`,
              color: 'currentColor',
              textAlign: 'center',
            }}
          >
            A
          </span>
        ) : (
          <img
            src={displaySrc}
            alt={logoConfig.alt}
            width={currentSize.width}
            height={currentSize.height}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
            loading="eager"
            decoding="async"
          />
        )}
      </div>

      {showText && !hasError && (
        <span
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 700,
            fontSize: size === 'large' ? '20px' : size === 'medium' ? '18px' : '16px',
            letterSpacing: '1.5px',
            whiteSpace: 'nowrap',
            transition: 'opacity 0.2s ease',
            opacity: isLoaded ? 1 : 0.5,
          }}
        >
          ANALYST
        </span>
      )}

      {/* Loading skeleton */}
      {!isLoaded && (
        <div
          style={{
            position: 'absolute',
            width: `${currentSize.width}px`,
            height: `${currentSize.height}px`,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: '12px',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

/**
 * Optimized Next.js Image version (recommended for production)
 * Use this when you want automatic image optimization from Next.js
 */
import Image from 'next/image';

interface OptimizedLogoProps extends Omit<LogoProps, 'className'> {
  priority?: boolean;
}

export function OptimizedLogo({
  variant = 'icon',
  theme = 'light',
  size = 'medium',
  showText = false,
  style = {},
  onClick,
  priority = false,
}: OptimizedLogoProps) {
  const sizeMap = {
    small: { width: 32, height: 32 },
    medium: { width: 40, height: 40 },
    large: { width: 56, height: 56 },
  };

  const currentSize = sizeMap[size];
  const logoConfig = ASSETS.logo[variant];
  const displaySrc = variant === 'full' ? logoConfig.src : (theme === 'dark' ? ASSETS.logo.light.src : ASSETS.logo.dark.src);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
      onClick={onClick}
      role="img"
      aria-label="Analyst Platform Logo"
    >
      <div
        style={{
          width: `${currentSize.width}px`,
          height: `${currentSize.height}px`,
          borderRadius: '12px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          flexShrink: 0,
        }}
      >
        <Image
          src={displaySrc}
          alt={logoConfig.alt}
          width={currentSize.width}
          height={currentSize.height}
          priority={priority}
          quality={95}
          style={{
            objectFit: 'contain',
          }}
        />
      </div>

      {showText && (
        <span
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 700,
            fontSize: size === 'large' ? '20px' : size === 'medium' ? '18px' : '16px',
            letterSpacing: '1.5px',
            whiteSpace: 'nowrap',
          }}
        >
          ANALYST
        </span>
      )}
    </div>
  );
}
