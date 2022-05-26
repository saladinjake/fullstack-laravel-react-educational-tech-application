import React from 'react';

export const useToggleSuggestions = () => {
  const [show, setShow] = React.useState(false);

  const toggle = () => {
    setShow((prev) => !prev);
  };

  const setFalse = () => {
    setShow(false);
  };

  const setTrue = () => {
    setShow(true);
  };

  return {
    show,
    toggle,
    setFalse,
    setTrue
  };
};

