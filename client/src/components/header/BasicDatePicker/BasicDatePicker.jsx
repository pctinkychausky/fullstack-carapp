import React, { useContext } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { useState } from "react";
import { format } from "date-fns";
import "./basicDatePicker.css";

function BasicDatePicker(props) {
  console.log(
    "🚀 ~ file: BasicDatePicker.jsx ~ line 10 ~ BasicDatePicker ~ props",
    props.func
  );
  const [openDate, setOpenDate] = useState(false);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const inputDate = `${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
    date[0].endDate,
    "MM/dd/yyyy"
  )}`;

  // props.func(getDate(inputDate));

  // document.getElementById("dateEle").value = inputDate;

  return (
    <>
      <input
        onClick={() => setOpenDate(!openDate)}
        id="dateEle"
        type="text"
        value={inputDate}
        placeholder={inputDate}
        className="DateSearchInput"
      />
      {openDate && (
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setDate([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={date}
        />
      )}
    </>
  );
}

export default BasicDatePicker;
