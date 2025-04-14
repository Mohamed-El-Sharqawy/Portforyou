// Service to fetch IP and location information

export interface LocationInfo {
  ip: string;
  country: string;
}

// Function to get IP and country information
export const getLocationInfo = async (): Promise<LocationInfo> => {
  try {
    // Using ipify API to get IP and location data
    const response = await fetch('https://api.ipify.org?format=json');
    const ipData = await response.json();
    
    // Get country information using ip-api
    const geoResponse = await fetch(`http://ip-api.com/json/${ipData.ip}`);
    const geoData = await geoResponse.json();
    
    return {
      ip: ipData.ip,
      country: geoData.country || 'Unknown',
    };
  } catch (error) {
    console.error('Error fetching location info:', error);
    return {
      ip: '0.0.0.0',
      country: 'Unknown',
    };
  }
};
