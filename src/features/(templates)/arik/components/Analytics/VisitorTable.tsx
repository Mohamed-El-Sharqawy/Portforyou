"use client";

import { useState } from "react";
import { VisitorData } from "../../services/analytics";
import { format } from "date-fns";

interface VisitorTableProps {
  visitors: VisitorData[];
}

export default function VisitorTable({ visitors }: VisitorTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sort visitors by date (newest first)
  const sortedVisitors = [...visitors].sort((a, b) => {
    return parseInt(b.visitDate!) - parseInt(a.visitDate!);
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedVisitors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleVisitors = sortedVisitors.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handle pagination
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (visitors.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-wheat/60">
        <p>No visitor data available</p>
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-wheat/15">
              <th className="py-3 px-4 text-wheat/80">Date & Time</th>
              <th className="py-3 px-4 text-wheat/80">IP Address</th>
              <th className="py-3 px-4 text-wheat/80">Country</th>
              <th className="py-3 px-4 text-wheat/80">Browser</th>
              <th className="py-3 px-4 text-wheat/80">Device</th>
            </tr>
          </thead>
          <tbody>
            {visibleVisitors.map((visitor, index) => {
              const visitDate = new Date(parseInt(visitor.visitDate!));
              return (
                <tr
                  key={index}
                  className="border-b border-wheat/10 hover:bg-wheat/5"
                >
                  <td className="py-3 px-4">
                    {format(visitDate, "MMM d, yyyy h:mm a")}
                  </td>
                  <td className="py-3 px-4">{visitor.ip}</td>
                  <td className="py-3 px-4">{visitor.country || "Unknown"}</td>
                  <td className="py-3 px-4">{visitor.browser}</td>
                  <td className="py-3 px-4 capitalize">{visitor.device}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 text-sm">
          <div className="text-wheat/60">
            Showing {startIndex + 1}-
            {Math.min(startIndex + itemsPerPage, sortedVisitors.length)} of{" "}
            {sortedVisitors.length} visitors
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${currentPage === 1 ? "text-wheat/30 cursor-not-allowed" : "text-wheat hover:bg-wheat/10"}`}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-3 py-1 rounded ${currentPage === page ? "bg-wheat/20 text-wheat" : "text-wheat hover:bg-wheat/10"}`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${currentPage === totalPages ? "text-wheat/30 cursor-not-allowed" : "text-wheat hover:bg-wheat/10"}`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
