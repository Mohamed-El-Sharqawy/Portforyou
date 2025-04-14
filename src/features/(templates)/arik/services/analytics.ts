import fetcher from "@/services/api";
import { useMutation } from "@tanstack/react-query";

// Types for visitor data
export interface VisitorData {
  ip: string;
  country: string;
  browser: string;
  device: "mobile" | "desktop";
  visitDate?: string; // Added to match the backend response
}

export interface TemplateAnalytics {
  visitors: VisitorData[];
  totalVisits: number;
}

// Function to record a template visit
export const recordTemplateVisit = async (
  userId: string,
  // _templateName: string, // Unused but kept for API consistency
  visitorData: VisitorData
): Promise<{ data: { recordTemplateVisit: boolean } }> => {
  // Use 'arik' as the templateName for the arikTemplate
  const mutation = `
    mutation RecordTemplateVisit {
      recordTemplateVisit(
        userId: "${userId}", 
        templateName: "arik", 
        visitorData: {
          ip: "${visitorData.ip}",
          country: "${visitorData.country}",
          browser: "${visitorData.browser}",
          device: "${visitorData.device}"
        }
      )
    }
  `;

  return await fetcher(mutation);
};

// Function to get template analytics
export const getTemplateAnalytics = async (
  userId: string,
  // _templateName: string // Unused but kept for API consistency
): Promise<{ data: { templateAnalytics: TemplateAnalytics } }> => {
  // Use 'arik' as the templateName for the arikTemplate
  const query = `
    query GetTemplateAnalytics {
      templateAnalytics(userId: "${userId}", templateName: "arik") {
        totalVisits
        visitors {
          ip
          country
          browser
          device
          visitDate
        }
      }
    }
  `;

  return await fetcher(query);
};

// Hook for recording a template visit
export const useRecordTemplateVisit = () => {
  return useMutation({
    mutationFn: ({
      userId,
      // _templateName,
      visitorData,
    }: {
      userId: string;
      // _templateName: string;
      visitorData: VisitorData;
    }) => recordTemplateVisit(userId, visitorData,),
  });
};
