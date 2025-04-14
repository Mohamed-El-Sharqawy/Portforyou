// Utility functions to detect browser and device information

export const getDeviceInfo = (): {
  browser: string;
  device: "mobile" | "desktop";
} => {
  // Browser detection
  const getBrowser = (): string => {
    const userAgent = navigator.userAgent;
    
    if (userAgent.indexOf("Firefox") > -1) return "Firefox";
    if (userAgent.indexOf("SamsungBrowser") > -1) return "Samsung Browser";
    if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) return "Opera";
    if (userAgent.indexOf("Trident") > -1) return "Internet Explorer";
    if (userAgent.indexOf("Edge") > -1) return "Edge";
    if (userAgent.indexOf("Chrome") > -1) return "Chrome";
    if (userAgent.indexOf("Safari") > -1) return "Safari";
    
    return "Unknown";
  };
  
  // Device detection (mobile or desktop)
  const isMobile = (): boolean => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };
  
  return {
    browser: getBrowser(),
    device: isMobile() ? "mobile" : "desktop",
  };
};
