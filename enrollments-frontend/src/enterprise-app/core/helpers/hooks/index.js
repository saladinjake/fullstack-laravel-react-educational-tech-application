import React from 'react';
/*
*@companyName: EMS
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: toggle hook for mobile nav view

*/

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

