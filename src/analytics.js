import { v4 as uuidv4 } from 'uuid';

export const dataLayerInit = () => {
  ga((tracker) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'customDimensions',
      pageUrl: `${location.origin}${location.pathname}${location.search}`,
      clientId: ga.getAll()[0].get('clientId'),
      sessionId: uuidv4(),
    });
  });
};
