import { useState, useRef, useEffect } from 'react';
import { Button, Input, Label } from '@/components/ui';

export default function TagSelector({ currentArr, maxLength, label, placeholder, getTags }) {
  const [input, setInput] = useState('');
  const [current, setCurrent] = useState(currentArr || []);
  const [error, setError] = useState({ err: false, msg: '' });
  const inpRef = useRef(null);
  useEffect(() => {
    getTags(current);
  }, [getTags, current]);
  useEffect(() => {
    const removeError = setTimeout(() => {
      if (error.err) setError({ err: false, msg: '' });
    }, 3000);
    return () => clearTimeout(removeError);
  }, [error]);
  return (
    <div className="space-y-1">
      {label !== '' && <Label>{label}</Label>}
      <div className=" flex flex-wrap min-w-full gap-2">
        {current.length > 0 &&
          current.map((item) => {
            return (
              <div className="flex items-center justify-between text-sm py-2 pl-3 pr-2 space-x-1 bg-emerald-500 rounded-full text-white" key={item}>
                <h1 className="peer-hover:text-transparent">{item}</h1>
                <span
                  className="peer flex items-center justify-center cursor-pointer rounded-full w-5 h-5 text-center hover:bg-emerald-400"
                  onClick={() => {
                    setCurrent((prev) => [...prev.filter((currentItem) => currentItem !== item)]);
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
      {error.err && <p className="transition-colors duration-500 text-red-500">{error.msg}</p>}
      {/* Form */}
      <div className="min-w-full flex items-center justify-center space-y-4 space-x-3">
        <div className="min-w-full space-y-4">
          <Input
            ref={inpRef}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyDown={(e) => {
              const { value } = e.target;
              if (e.key === 'Enter' && value.trim() !== '') {
                if (maxLength) {
                  if (current.length < maxLength) {
                    setCurrent((prev) => Array(...new Set([...prev, value.trim().toLowerCase()])));
                  } else {
                    setError((prev) => {
                      return {
                        ...prev,
                        err: true,
                        msg: `Only ${maxLength} Tags can are allowed.`,
                      };
                    });
                  }
                } else {
                  setCurrent((prev) => Array(...new Set([...prev, value.trim().toLowerCase()])));
                }
                setInput('');
                inpRef.current.focus();
              }
            }}
            className="customInput"
            placeholder={placeholder || ''}
            value={input}
          />
          <div className="flex items-center justify-between gap-2 max-w-full">
            <p className="self-start text-gray-400 text-xs">Tags includes technologies by default.</p>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setCurrent((prev) => []);
              }}
              className="min-w-[107px]"
            >
              Remove All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
//    {/* Suggested  */}
//    {suggested.length > 0 &&
//     suggested.slice(0, 5).map((item) => {
//       return (
//         <div className="flex justify-between" key={item}>
//           <h1>{item}</h1>
//           <Button
//             onClick={() => {
//               if (maxLength) {
//                 if (current.length < maxLength) {
//                   setCurrent((prev) => Array(...new Set([...prev, item])));
//                 } else {
//                   setError((prev) => {
//                     return {
//                       ...prev,
//                       err: true,
//                       msg: `Only ${maxLength} Technologies can be added`,
//                     };
//                   });
//                 }
//               } else {
//                 setCurrent((prev) => Array(...new Set([...prev, item])));
//               }
//               setInput("");
//               inpRef.current.focus();
//               setSuggested([]);
//             }}
//           >
//             Add
//           </Button>
//         </div>
//       );
//     })}
// function handleChange(e) {
//     const { value } = e.target;
//     setInput(value);
//     if (value !== "") {
//       const tempSuggested = suggestedArr.filter((item) => {
//         return item.toLowerCase().includes(value.toLowerCase());
//       });
//       setSuggested(tempSuggested);
//     } else {
//       setSuggested([]);
//     }
//   }
