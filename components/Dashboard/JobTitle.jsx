import { useState, useRef, useEffect } from 'react';
import { Button, Input, Label } from '@/components/ui';
import { titles } from './Data';
import { useSelector, useDispatch } from 'react-redux';

export default function JobTitle({ getJobTitle, onJobTitleChange, portfolio }) {
  const minLength = 1;
  const maxLength = 8;
  const [input, setInput] = useState('');
  const [currentTitles, setCurrentTitles] = useState(portfolio?.jobTitle || []);
  const [suggested, setSuggested] = useState([]);
  const [error, setError] = useState({ err: false, msg: '' });
  const inpRef = useRef(null);

  useEffect(() => {
    const removeError = setTimeout(() => {
      if (error.err) setError({ err: false, msg: '' });
    }, 3000);
    return () => clearTimeout(removeError);
  }, [error]);

  useEffect(() => {
    getJobTitle(currentTitles);
  }, [getJobTitle, currentTitles]);

  function handleChange(e) {
    const { value } = e.target;
    onJobTitleChange(value);
    setInput(value);
    if (value !== '') {
      const tempSuggested = titles.filter((item) => {
        return item.toLowerCase().includes(value.toLowerCase());
      });
      setSuggested(tempSuggested);
    } else {
      setSuggested([]);
    }
  }
  return (
    <div className='flex flex-col items-center w-full space-y-4'>
      <div className='w-full flex flex-wrap gap-1'>
        {currentTitles.length > 0 &&
          currentTitles.map((item) => {
            return (
              <div className='flex items-center justify-between text-sm py-2 pl-3 pr-2 space-x-1 bg-red-400 rounded-full text-white' key={item}>
                <h1 className='peer-hover:text-transparent'>{item}</h1>
                <span
                  className='peer flex items-center justify-center cursor-pointer rounded-full w-5 h-5 text-center hover:bg-red-300/50'
                  onClick={() => {
                    if (minLength) {
                      if (currentTitles.length > minLength) setCurrentTitles((prev) => [...prev.filter((currentItem) => currentItem !== item)]);
                      else
                        setError((prev) => {
                          return {
                            ...prev,
                            err: true,
                            msg: `Need at least ${minLength} Job title`,
                          };
                        });
                    } else {
                      setCurrentTitles((prev) => [...prev.filter((currentItem) => currentItem !== item)]);
                    }
                  }}
                >
                  <span className={`absolute bg-white w-[11px] h-[1px]  transfrom-all duration-300 rotate-[42deg]`}></span>
                  <span className={`absolute bg-white w-[11px] h-[1px]  transfrom-all duration-300 -rotate-[42deg]`}></span>
                </span>
              </div>
            );
          })}
      </div>
      {/* Error message */}
      {error.err && <p className='transition-colors duration-500 text-red-500'>{error.msg}</p>}
      {/* Form */}
      <Input ref={inpRef} onChange={handleChange} className='customInput' placeholder={'Titles'} value={input} />
      {/* Suggested  */}
      {suggested.length > 0 &&
        suggested.slice(0, 5).map((item) => {
          return (
            <div className='w-full flex items-center justify-between' key={item}>
              <h1>{item}</h1>
              <Button
                onClick={() => {
                  if (maxLength) {
                    if (currentTitles.length < maxLength) {
                      setCurrentTitles((prev) => Array(...new Set([...prev, item])));
                    } else {
                      setError((prev) => {
                        return {
                          ...prev,
                          err: true,
                          msg: `Only ${maxLength} titles can be added`,
                        };
                      });
                    }
                  } else {
                    setCurrentTitles((prev) => Array(...new Set([...prev, item])));
                  }
                  setInput('');
                  inpRef.current.focus();
                  setSuggested([]);
                }}
              >
                Add
              </Button>
            </div>
          );
        })}
    </div>
  );
}
