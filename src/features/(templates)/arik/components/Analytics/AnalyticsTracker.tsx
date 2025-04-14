"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getDeviceInfo } from "../../utils/deviceDetection";
import { getLocationInfo } from "../../utils/locationService";
import { useRecordTemplateVisit } from "../../services/analytics";

/**
 * Component that silently tracks analytics for template visits
 * This component doesn't render anything visible
 */
export default function AnalyticsTracker() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const [hasTracked, setHasTracked] = useState(false);
  
  const { mutate: recordVisit } = useRecordTemplateVisit();

  useEffect(() => {
    // Only track if we have a userId and haven't tracked yet in this session
    if (userId && !hasTracked) {
      const trackVisit = async () => {
        try {
          // Get device information
          const deviceInfo = getDeviceInfo();
          
          // Get location information
          const locationInfo = await getLocationInfo();
          
          // Record the visit
          recordVisit({
            userId,
            // _templateName: "arik", // This parameter is not used in the backend but kept for API consistency
            visitorData: {
              ip: locationInfo.ip,
              country: locationInfo.country,
              browser: deviceInfo.browser,
              device: deviceInfo.device,
            },
          });
          
          // Set flag to prevent multiple tracking in the same session
          setHasTracked(true);
        } catch (error) {
          console.error("Error tracking template visit:", error);
        }
      };
      
      trackVisit();
    }
  }, [userId, hasTracked, recordVisit]);

  // This component doesn't render anything
  return null;
}
