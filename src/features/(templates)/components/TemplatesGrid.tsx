"use client";

import Button from "@/components/ui/Button";
import Image from "next/image";

import { Template } from "../types/template";
import { getToken } from "@/lib/utils";
import { useEffect, useState } from "react";

interface Props {
  templates: Template[];
}

export default function TemplatesGrid({ templates }: Props) {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const { decodedToken } = getToken();
      setUserId(decodedToken.userId);
    } catch (error) {
      console.error("Error getting token:", error);
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <div
          key={template.id}
          className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <div className="relative h-48 w-full">
            <Image
              src={template.image}
              alt={template.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 right-4">
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  template.price === "Free" ? "bg-green-500" : "bg-blue-500"
                } text-white`}
              >
                {template.price}
              </span>
            </div>
          </div>

          <div className="p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {template.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {template.description}
              </p>
            </div>
            <Button
              href={userId ? `/templates/${template.id}?userId=${userId}` : `#`}
              text="Get Template"
              className="w-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
