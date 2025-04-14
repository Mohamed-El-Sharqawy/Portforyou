"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getToken } from "@/lib/utils";
import { getTemplateAnalytics, TemplateAnalytics } from "@/features/(templates)/arik/services/analytics";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import VisitorChart from "@/features/(templates)/arik/components/Analytics/VisitorChart";
import DeviceDistribution from "@/features/(templates)/arik/components/Analytics/DeviceDistribution";
import BrowserDistribution from "@/features/(templates)/arik/components/Analytics/BrowserDistribution";
import CountryDistribution from "@/features/(templates)/arik/components/Analytics/CountryDistribution";
import VisitorTable from "@/features/(templates)/arik/components/Analytics/VisitorTable";
import { InfoDialog } from "@/features/(templates)/arik/components/Analytics/InfoDialog";
import { formatDistanceToNow } from "date-fns";

export default function ArikAnalytics() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const { decodedToken } = getToken();
  
  const [analytics, setAnalytics] = useState<TemplateAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const isOwner = userId === decodedToken?.userId;

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!userId) {
        setError("User ID is required");
        setLoading(false);
        return;
      }
      
      try {
        const response = await getTemplateAnalytics(userId);
        setAnalytics(response.data.templateAnalytics);
      } catch (err) {
        console.error("Error fetching analytics:", err);
        setError("Failed to load analytics data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnalytics();
  }, [userId]);
  
  if (!isOwner) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-wheat">
        <div className="text-center p-8 bg-wheat/5 rounded-lg border border-wheat/15 max-w-md">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="mb-6">You don&apos;t have permission to view these analytics.</p>
          <Link 
            href={`/templates/arik?userId=${userId}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-wheat/10 hover:bg-wheat/20 rounded-md transition-colors"
          >
            <ArrowLeftCircle size={18} />
            Back to Template
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-wheat">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-wheat"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-wheat">
        <div className="text-center p-8 bg-wheat/5 rounded-lg border border-wheat/15 max-w-md">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="mb-6">{error}</p>
          <Link 
            href={`/templates/arik?userId=${userId}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-wheat/10 hover:bg-wheat/20 rounded-md transition-colors"
          >
            <ArrowLeftCircle size={18} />
            Back to Template
          </Link>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-wheat">
        <div className="text-center p-8 bg-wheat/5 rounded-lg border border-wheat/15 max-w-md">
          <h1 className="text-2xl font-bold mb-4">No Data</h1>
          <p className="mb-6">No analytics data available for this template.</p>
          <Link 
            href={`/templates/arik?userId=${userId}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-wheat/10 hover:bg-wheat/20 rounded-md transition-colors"
          >
            <ArrowLeftCircle size={18} />
            Back to Template
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-wheat p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Arik Template Analytics</h1>
          <Link 
            href={`/templates/arik?userId=${userId}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-wheat/10 hover:bg-wheat/20 rounded-md transition-colors"
          >
            <ArrowLeftCircle size={18} />
            Back to Template
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-wheat/5 p-6 rounded-lg border border-wheat/15">
            <h2 className="text-xl font-semibold mb-2">Total Visits</h2>
            <p className="text-4xl font-bold">{analytics.totalVisits}</p>
          </div>
          <div className="bg-wheat/5 p-6 rounded-lg border border-wheat/15">
            <h2 className="text-xl font-semibold mb-2">Unique Visitors</h2>
            <p className="text-4xl font-bold">{new Set(analytics.visitors.map(v => v.ip)).size}</p>
          </div>
          <div className="bg-wheat/5 p-6 rounded-lg border border-wheat/15">
            <h2 className="text-xl font-semibold mb-2">Last Visit</h2>
            <p className="text-xl">
              {analytics.visitors.length > 0 ? 
                formatDistanceToNow(new Date(parseInt(analytics.visitors[analytics.visitors.length - 1].visitDate!)), { addSuffix: true }) : 
                'No visits yet'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-wheat/5 p-6 rounded-lg border border-wheat/15">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Visits Over Time</h2>
              <InfoDialog 
                title="Visits Over Time" 
                description="This chart shows the number of visits to your template over time. The data is aggregated by day, allowing you to identify trends and patterns in visitor traffic. You can see which days had higher activity and track the growth of your audience over time."
              />
            </div>
            <VisitorChart visitors={analytics.visitors} />
          </div>
          <div className="bg-wheat/5 p-6 rounded-lg border border-wheat/15">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Device Distribution</h2>
              <InfoDialog 
                title="Device Distribution" 
                description="This chart displays the distribution of devices used by visitors to view your template. It categorizes visitors by whether they accessed your template from mobile devices or desktop computers, helping you understand which platforms your audience prefers."
              />
            </div>
            <DeviceDistribution visitors={analytics.visitors} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-wheat/5 p-6 rounded-lg border border-wheat/15">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Browser Distribution</h2>
              <InfoDialog 
                title="Browser Distribution" 
                description="This chart shows the distribution of web browsers used by your visitors. Understanding which browsers are most commonly used to access your template can help you optimize your design and ensure compatibility with the most popular browsers among your audience."
              />
            </div>
            <BrowserDistribution visitors={analytics.visitors} />
          </div>
          <div className="bg-wheat/5 p-6 rounded-lg border border-wheat/15">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Country Distribution</h2>
              <InfoDialog 
                title="Country Distribution" 
                description="This chart displays the geographic distribution of your visitors by country. It helps you understand the global reach of your template and identify which regions are showing the most interest in your portfolio."
              />
            </div>
            <CountryDistribution visitors={analytics.visitors} />
          </div>
        </div>

        <div className="bg-wheat/5 p-6 rounded-lg border border-wheat/15">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Visitors</h2>
            <InfoDialog 
              title="Recent Visitors" 
              description="This table provides detailed information about each visitor to your template, including their IP address, country, browser, device type, and when they visited. The most recent visitors are shown first, giving you insight into your latest audience interactions."
            />
          </div>
          <VisitorTable visitors={analytics.visitors} />
        </div>
      </div>
    </div>
  );
}
