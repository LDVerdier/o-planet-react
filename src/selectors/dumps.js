export const findDumpById = (dumpElements, searchedId) => {
  const dumpElement = dumpElements.find(
    // parseInt converts a string to integer. It needs a second param to specify the conversion base
    // use 10 to decimal
    (currentDumpElement) => currentDumpElement.id === parseInt(searchedId, 10),
  );
  return dumpElement;
};

export const getDumpIds = (dumpElements) => {
  const dumpIds = dumpElements.map((dumpElement) => dumpElement.id);
  return dumpIds;
};

export const removeCleanDumps = (dumpsList, shouldRemove) => {
  if (!shouldRemove) {
    return dumpsList;
  }
  return dumpsList.filter((dumpElement) => !dumpElement.isClosed);
};
