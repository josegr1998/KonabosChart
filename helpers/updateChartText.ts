export const updateChartText = (className: string, text: string):void => {

  const element = document.getElementsByClassName("recharts-legend-item-text");
  if (element?.length) {
    element[0].innerHTML = text;
  }

};
