export const isoStringToDate = (isoString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    return new Date(isoString).toLocaleDateString(undefined, options);
  };