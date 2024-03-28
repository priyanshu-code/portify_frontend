import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePortfolio } from "@/features/portfolio/portfolioSlice";
import { Button, Textarea, Input, Label, useToast } from "@/components/ui";
import { workSchema } from "@/components/models/Portfolio/Work";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function WorkHistory() {
  const { portfolio } = useSelector((store) => store.Portfolio);
  const [work, setWork] = useState(portfolio?.workHistory || []);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const arrOfObjects = work.map(() => {
    return {
      companyName: { err: false, message: "" },
      position: { err: false, message: "" },
      jobDescription: { err: false, message: "" },
    };
  });
  const [arrayOfErrors, setArrayOfErrors] = useState(arrOfObjects);
  // Verify values function
  function verifyValues(values) {
    const res = workSchema.safeParse(values);
    let tempError = arrayOfErrors;
    tempError.map((item) => {
      item.companyName.err = false;
      item.position.err = false;
      item.jobDescription.err = false;
    });
    if (res.success) {
      return true;
    } else {
      const errorArray = JSON.parse(res.error.message);
      errorArray.map((item) => {
        const { message, path } = item;
        const position = path[0];
        const field = path[1];
        tempError[position][field].err = true;
        tempError[position][field]["message"] = message;
      });
    }
    return false;
  }
  const workAdder = () => {
    return {
      companyName: "",
      position: "",
      jobDescription: "",
      startDate: "",
      endDate: "",
    };
  };
  const errAdder = () => {
    return {
      companyName: { err: false, message: "" },
      position: { err: false, message: "" },
      jobDescription: { err: false, message: "" },
    };
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (verifyValues(work)) {
      dispatch(updatePortfolio({ workHistory: work }));
      toast({
        title: "Success",
        description: "Work history successfully updated.",
      });
    } else {
      toast({
        title: "Failed",
        description: "Please complete the form.",
      });
    }
  }
  useEffect(() => {
    verifyValues(work);
  }, [work]);
  const handleWork = (index, fields) => {
    const { name, value } = fields;
    const newWork = work.map((item, id) => {
      if (id === index) {
        return { ...work[id], [name]: value };
      }
      return item;
    });
    setWork(newWork);
  };
  const handleRemove = (index) => {
    const newWork = work.filter((item, id) => {
      return id !== index;
    });
    setWork(newWork);
  };
  return (
    <div className="flex flex-col  items-center w-full sm:max-w-[500px] space-y-4 px-3">
      <h1 className="text-center text-3xl xs:text-3xl sm:text-4xl m-4 min-w-full font-semibold">
        Work History
      </h1>
      <form className="space-y-4 w-full max-w-[500px]">
        <div className="flex items-center justify-between">
          <Button
            onClick={(e) => {
              e.preventDefault();
              const newErr = errAdder();
              setArrayOfErrors((prev) => {
                return [...prev, newErr];
              });
              const newWork = workAdder();
              setWork((prev) => {
                return [newWork, ...prev];
              });
            }}
          >
            Add
          </Button>
          <Button onClick={handleSubmit} type="submit">
            Save
          </Button>
        </div>
        {work.map((field, index) => {
          const { companyName, position, jobDescription, year, _id } = field;
          const tempFunc = (e) => {
            const { name, value } = e.target;
            handleWork(index, { name: name, value: value });
          };
          const comp = arrayOfErrors[index].companyName;
          const pos = arrayOfErrors[index].position;
          const desc = arrayOfErrors[index].jobDescription;
          return (
            <div className="max-w-full border-t-2 pt-4 border-black space-y-2" key={_id}>
              <div className="flex  justify-between space-x-3 max-w-full">
                <div className="space-y-2">
                  <Input
                    name="position"
                    placeholder="Position *"
                    value={position}
                    onChange={tempFunc}
                    className="customInput"
                  />
                  {position.length < 2 && errorMessage(pos.message)}
                </div>
                <p className="self-start pt-2 text-gray-600/60">at</p>
                <div className="space-y-2">
                  <Input
                    name="companyName"
                    placeholder="Company *"
                    value={companyName}
                    onChange={tempFunc}
                    className="customInput"
                  />
                  {companyName.length < 2 && errorMessage(comp.message)}
                </div>
              </div>
              <div>
                <Label className={jobDescription.length < 2 ? "text-destructive" : ""}>
                  Job Description
                </Label>
                <Textarea
                  name="jobDescription"
                  className="customInput min-h-[6rem]"
                  placeholder="Job Description"
                  value={jobDescription}
                  onChange={tempFunc}
                />
              </div>
              {jobDescription.length < 2 && errorMessage(desc.message)}
              <div>
                <Input
                  name="Year"
                  className="customInput"
                  placeholder="Eg. 2023"
                  value={year}
                  onChange={tempFunc}
                  type="year"
                />
              </div>

              <Button
                className="mt-2 mb-1"
                onClick={(e) => {
                  e.preventDefault();
                  handleRemove(index);
                }}
              >
                Remove
              </Button>
            </div>
          );
        })}
      </form>
    </div>
  );
}

function errorMessage(message) {
  return <p className="text-[0.8rem] font-medium text-destructive">{message}</p>;
}
