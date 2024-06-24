const mobileNumberRegex = /^\d{10}$/;

const validateMobileNumber = (mobileNumber: string) => {
  return mobileNumber.match(mobileNumberRegex);
};

export { validateMobileNumber };
