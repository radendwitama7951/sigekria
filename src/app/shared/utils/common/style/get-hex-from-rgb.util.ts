export const getHexFromRGB = (rgbStr: String): String => {
  if (!rgbStr.startsWith(`rgb(`))
    throw new Error(
      'RGB string format invalid ! format must be rgb(number, number, number)',
    );

  const rgbVal = rgbStr.replace(`rgb(`, ``).replace(`)`, ``).split(`,`);
  const hexVal = rgbVal.map((v) => {
    const hex = parseInt(v).toString(16).padStart(2, `0`);
    return hex;
  });

  const hexStr = `#${hexVal.join('').toLowerCase()}`;

  return hexStr;
};
