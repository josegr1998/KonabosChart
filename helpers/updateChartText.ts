export const updateChartText = (className: string, text: string):void => {

  const element = document.getElementsByClassName(className);
  if (element?.length) {
    element[0].innerHTML = text;
  }

};
