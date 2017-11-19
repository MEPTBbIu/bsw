// tslint:disable:indent
const normalizePhone = value => {
  if (!value) {
    return "";
  }

  let onlyNums = value.replace(/[^\d]/g, "");
  if (onlyNums.length === 1) {
    if (onlyNums === "7") return "";
    else onlyNums = "7" + onlyNums;
  }

  // 792 => +7 (926
  if (onlyNums.length <= 4) {
    return `+${onlyNums.slice(0, 1)} (${onlyNums.slice(1)}`;
  }
  // 792 => +7 (926) 2_
  if (onlyNums.length <= 7) {
    return `+${onlyNums.slice(0, 1)} (${onlyNums.slice(1, 4)}) ${onlyNums.slice(
      4
    )}`;
  }

  // 7926756 => +0 (123) 456
  //if (onlyNums.length <= 7) {
  //	return `+${onlyNums.slice(0,1)} (${onlyNums.slice(1,4)}) ${onlyNums.slice(4)}`
  //}
  // 792675633 => +0 (123) 456-78
  if (onlyNums.length <= 9) {
    return `+${onlyNums.slice(0, 1)} (${onlyNums.slice(1, 4)}) ${onlyNums.slice(
      4,
      7
    )}-${onlyNums.slice(7)}`;
  }
  // 792675633 => +0 (123) 456-78-9x
  return `+${onlyNums.slice(0, 1)} (${onlyNums.slice(1, 4)}) ${onlyNums.slice(
    4,
    7
  )}-${onlyNums.slice(7, 9)}-${onlyNums.slice(9, 11)}`;
};

export default normalizePhone;
