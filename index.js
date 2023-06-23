const isNumericInput = (event) => {
  const key = event.key;
  const location = event.location;

  if (
    location === KeyboardEvent.DOM_KEY_LOCATION_NUMPAD ||
    location === KeyboardEvent.DOM_KEY_LOCATION_STANDARD
  ) {
    return true;
  }
  return false;
};

const isModifierKey = (event) => {
  const key = event.key;
  if (
    key === "Shift" ||
    key === "Home" ||
    key === "End" || // Allow Shift, Home, End
    key === "Backspace" ||
    key === "Tab" ||
    key === "Enter" ||
    key === "Delete" || // Allow Backspace, Tab, Enter, Delete
    key === "ArrowLeft" ||
    key === "ArrowUp" ||
    key === "ArrowRight" ||
    key === "ArrowDown" || // Allow left, up, right, down
    // Allow Ctrl/Command + A,C,V,X,Z
    ((event.ctrlKey === true || event.metaKey === true) &&
      (key === "a" || key === "c" || key === "x" || key === "v" || key === "z"))
  ) {
    return true;
  }
  return false;
};

const enforceFormat = (event) => {
  // Input must be of a valid number format or a modifier key, and not longer than ten digits
  if (isNumericInput(event) === false && isModifierKey(event) === false) {
    event.preventDefault();
  }
};

const formatToPhone = (event) => {
  if (isModifierKey(event)) {
    return;
  }

  const input = event.target.value.replace(/\D/g, "").substring(0, 10); // First ten digits of input only
  const areaCode = input.substring(0, 3);
  const middle = input.substring(3, 6);
  const last = input.substring(6, 10);

  if (input.length > 6) {
    event.target.value = `(${areaCode}) ${middle}-${last}`;
  } else if (input.length > 3) {
    event.target.value = `(${areaCode}) ${middle}`;
  } else if (input.length > 0) {
    event.target.value = `(${areaCode}`;
  }
};

const inputElement = document.getElementById("phone");
inputElement.addEventListener("keydown", enforceFormat);
inputElement.addEventListener("keyup", formatToPhone);
