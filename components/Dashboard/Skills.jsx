import { useState, useRef, useEffect } from 'react';
import { skills } from './Data.js';
import { Input, Button } from '@/components/ui';
const Skills = ({ getSkills, onSkillValueChange, portfolio }) => {
  const [input, setInput] = useState('');
  const [currentSkills, setCurrentSkills] = useState(portfolio?.skills || []);
  const [suggestedSkills, setSuggestedSkills] = useState([]);
  const [error, setError] = useState({ err: false, msg: '' });
  const inpRef = useRef(null);
  useEffect(() => {
    if (error.err) {
      setTimeout(() => {
        setError({ err: false, msg: '' });
      }, 3000);
    }
  }, [error]);

  useEffect(() => {
    getSkills(currentSkills);
  }, [getSkills, currentSkills]);

  function handleChange(e) {
    const { value } = e.target;
    onSkillValueChange(value);
    setInput(value);
    if (value !== '') {
      const tempSkills = skills.filter((item) => {
        return item.toLowerCase().includes(value.toLowerCase());
      });
      setSuggestedSkills(tempSkills);
    } else {
      setSuggestedSkills([]);
    }
  }
  return (
    <div className='flex flex-col items-center w-full space-y-4'>
      {/* Current Skills */}
      <div className='w-full flex flex-wrap gap-1'>
        {currentSkills.length > 0 &&
          currentSkills.map((item) => {
            return (
              <div className='flex items-center justify-between text-sm py-2 pl-3 pr-2 space-x-1 bg-emerald-500 rounded-full text-white' key={item}>
                <h1 className='peer-hover:text-transparent'>{item}</h1>
                <span
                  className='peer flex items-center justify-center cursor-pointer rounded-full w-5 h-5 text-center hover:bg-emerald-400'
                  onClick={() => {
                    if (currentSkills.length > 1) setCurrentSkills((prev) => prev.filter((skill) => skill !== item));
                    else
                      setError((prev) => {
                        return { ...prev, err: true, msg: 'Need at least 1 skill' };
                      });
                  }}
                >
                  <span className={`absolute bg-white w-[11px] h-[1px]  transfrom-all duration-300 rotate-[42deg]`}></span>
                  <span className={`absolute bg-white w-[11px] h-[1px]  transfrom-all duration-300 -rotate-[42deg]`}></span>
                </span>
              </div>

              // <div className="w-full flex items-center justify-between" key={item}>
              //   <h1>{item}</h1>
              //   <Button
              //   >
              //     Remove
              //   </Button>
              // </div>
            );
          })}
      </div>
      {/* Error message */}
      {error.err && <p className='transition-colors duration-500 text-red-500'>{error.msg}</p>}
      {/* Form */}
      <div className='w-full '>
        <Input
          ref={inpRef}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter')
              if (currentSkills.length < 15) {
                if (suggestedSkills[0] !== undefined) {
                  setCurrentSkills((prev) => Array(...new Set([...prev, suggestedSkills[0]])));
                  setInput('');
                  inpRef.current.focus();
                  setSuggestedSkills([]);
                }
              } else {
                setError((prev) => {
                  return { ...prev, err: true, msg: 'Only 15 skills can be added' };
                });
              }
          }}
          className='customInput'
          placeholder={'Skill Name'}
          value={input}
        />
      </div>
      {/* Suggested Skills */}
      <div className='w-full flex flex-col gap-1'>
        {suggestedSkills.length > 0 &&
          suggestedSkills.slice(0, 5).map((item) => {
            return (
              <div className='flex items-center justify-between w-full' key={item}>
                <h1>{item}</h1>
                <Button
                  onClick={() => {
                    if (currentSkills.length < 8) {
                      setCurrentSkills((prev) => Array(...new Set([...prev, item])));
                      setInput('');
                      inpRef.current.focus();
                      setSuggestedSkills([]);
                    } else {
                      setError((prev) => {
                        return { ...prev, err: true, msg: 'Only 8 skills can be added' };
                      });
                    }
                  }}
                >
                  Add
                </Button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Skills;
