// src/components/CustomArrows.tsx
import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <FaChevronLeft
      className={className}
      style={{ ...style, display: 'block', color: 'black', fontSize: '24px' }}
      onClick={onClick}
    />
  );
};

export const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <FaChevronRight
      className={className}
      style={{ ...style, display: 'block', color: 'black', fontSize: '24px' }}
      onClick={onClick}
    />
  );
};
