import { useEffect } from 'react';
import mixpanel from 'mixpanel-browser';

let initialized = false;

export default function MixpanelProvider({ children }) {
  useEffect(() => {
    if (!initialized) {
      mixpanel.init('c72a1992c58f234317c996058fae9082', {
        autocapture: true,
        record_sessions_percent: 100,
        record_heatmap_data: true,
        api_host: 'https://api-eu.mixpanel.com',
      });
      initialized = true;
    }
  }, []);

  return children;
}
