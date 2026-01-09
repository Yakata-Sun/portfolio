// src/components/ResizableMelodyInput.jsx
import React, { useRef, useEffect } from 'react';

const ResizableMelodyInput = React.forwardRef(({ value, onChange, placeholder, ...props }, ref) => {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const shadowRef = useRef(null);

  // Синхронизация высоты и ширины через "shadow" div
  useEffect(() => {
    const updateSize = () => {
      if (shadowRef.current && contentRef.current) {
        shadowRef.current.textContent = value || '\u200b'; // zero-width space for empty
        const rect = shadowRef.current.getBoundingClientRect();

        // Минимальные размеры
        const minWidth = 200;
        const minHeight = 40;

        const newWidth = Math.max(minWidth, rect.width + 20); // + отступы
        const newHeight = Math.max(minHeight, rect.height + 4); // небольшой padding

        contentRef.current.style.width = `${newWidth}px`;
        contentRef.current.style.height = `${newHeight}px`;
      }
    };

    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    if (contentRef.current) resizeObserver.observe(contentRef.current);
    return () => resizeObserver.disconnect();
  }, [value]);

  const handleChange = (e) => {
    let text = e.target.textContent || '';
    // Очистка: оставляем только ноты, цифры, #, b, пробелы
    text = text.replace(/[^A-Ga-g#b0-9\s]/g, '');
    // Сжимаем пробелы
    text = text.replace(/\s+/g, ' ').trim();
    onChange?.(text);
  };

  return (
    <div className="resizable-melody-wrapper" ref={wrapperRef}>
      <div
        ref={contentRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleChange}
        spellCheck={false}
        className="resizable-melody-input"
        {...props}
      >
        {value || ''}
      </div>
      {/* Invisible shadow for size measurement */}
      <div ref={shadowRef} className="resizable-melody-shadow" aria-hidden="true">
        {value || '\u200b'}
      </div>
      {value === '' && <div className="resizable-melody-placeholder">{placeholder || 'C4 D4 E4 F4 G4...'}</div>}
    </div>
  );
});

export default ResizableMelodyInput;
