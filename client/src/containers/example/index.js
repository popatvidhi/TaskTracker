import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setExampleValueAction } from '../../store/actions/ExampleAction';
import { getValueSelector } from '../../store/selectors/ExampleSelector';

const ExamplePage = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const handleExample = useCallback((data) => dispatch(setExampleValueAction(data)), [dispatch]);
  const exampleValue = useSelector(getValueSelector());

  const exampleHandler = () => {
    handleExample(inputValue);
  };

  const changeHandler = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  return (
    <div>
      <input type={'text'} value={inputValue} onChange={changeHandler} />
      <button onClick={exampleHandler}>trigger saga!</button>
      <h1>{exampleValue}</h1>
    </div>
  );
};

export default ExamplePage;
