import { fetchData } from './data';
import { dataLayerInit } from './analytics';

export const wireUpListeners = () => {
  window.onload = (e) => {
    dataLayerInit();
  };

  window.onclick = (e) => {
    fetchData('http://localhost:3000/api/v1/analytics', {
      analyticsID: e.target.dataset.gaId,
    })
      .then((result) => {
        if (
          Object.keys(result.data).length !== 0 &&
          result.data.constructor === Object
        ) {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push(result.data.eventData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
