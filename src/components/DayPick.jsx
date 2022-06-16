/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRef, useState } from "react";
import { format, isValid, parse } from "date-fns";
import FocusTrap from "focus-trap-react";
import { DayPicker } from "react-day-picker";
import { usePopper } from "react-popper";
import "react-day-picker/dist/style.css";

export const DayPick = (props) => {
  const { dateString, setDateString } = props;

  const [selected, setSelected] = useState();
  const [inputValue, setInputValue] = useState(dateString);
  const [isPopperOpen, setIsPopperOpen] = useState(false);

  const popperRef = useRef(null);
  const buttonRef = useRef(null);
  const [popperElement, setPopperElement] = useState(null);

  const popper = usePopper(popperRef.current, popperElement, {
    placement: "bottom-start",
  });

  const handleButtonClick = () => {
    setIsPopperOpen(true);
  };

  const closePopper = () => {
    setIsPopperOpen(false);
    buttonRef?.current?.focus();
  };

  // 日付を手入力した時の処理
  const handleInputChange = (event) => {
    const newInputValue = event.currentTarget.value;
    setInputValue(newInputValue);
    const date = parse(newInputValue, "y-MM-dd", new Date());
    if (isValid(date)) {
      setSelected(date);
      setDateString(format(date, "y-MM-dd"));
    } else {
      setSelected(undefined);
      setDateString("");
    }
  };

  // カレンダーから日付を選択した時の処理
  const handleDaySelect = (date) => {
    setSelected(date);
    if (date) {
      setInputValue(format(date, "y-MM-dd"));
      setDateString(format(date, "y-MM-dd"));
      closePopper();
    } else {
      setInputValue("");
      setDateString("");
    }
  };

  return (
    <div>
      <div ref={popperRef}>
        <input
          type="text"
          placeholder={format(new Date(), "y-MM-dd")}
          value={inputValue}
          onChange={handleInputChange}
          className="input-reset pa2 ma2 bg-white black ba"
        />
        <button
          ref={buttonRef}
          type="button"
          className="pa2 bg-white button-reset ba"
          aria-label="Pick a date"
          onClick={handleButtonClick}
        >
          <span role="img" aria-label="calendar icon">
            📅
          </span>
        </button>
      </div>
      {isPopperOpen && (
        <FocusTrap
          active
          focusTrapOptions={{
            initialFocus: false,
            allowOutsideClick: true,
            clickOutsideDeactivates: true,
            onDeactivate: closePopper,
          }}
        >
          <div
            css={popperStyle}
            tabIndex={-1}
            style={popper.styles.popper}
            className="dialog-sheet"
            {...popper.attributes.popper}
            ref={setPopperElement}
            role="dialog"
          >
            <DayPicker
              initialFocus={isPopperOpen}
              mode="single"
              defaultMonth={selected}
              selected={selected}
              onSelect={handleDaySelect}
            />
          </div>
        </FocusTrap>
      )}
    </div>
  );
};

const popperStyle = css`
  background-color: #fff0f5;
`;
