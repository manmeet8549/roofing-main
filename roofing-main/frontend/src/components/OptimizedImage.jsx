import { useState, memo } from 'react';

const OptimizedImage = memo(function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  wrapperClassName = '',
  priority = false 
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {/* Placeholder/Loading state */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-slate-100 animate-pulse" />
      )}
      
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
      />
      
      {hasError && (
        <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
          <span className="text-slate-400 text-sm">Image unavailable</span>
        </div>
      )}
    </div>
  );
});

export default OptimizedImage;
