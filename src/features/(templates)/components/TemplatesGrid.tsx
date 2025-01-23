import Button from "@/components/ui/Button";
import Image from "next/image";

import { Template } from "../types/template";

interface Props {
  templates: Template[];
}

export default function TemplatesGrid({ templates }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <div
          key={template.id}
          className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-fit"
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
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {template.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {template.description}
            </p>
            <Button
              href={`/templates/${template.id}`}
              text="Get Template"
              className="w-full"
            >
              Get Template
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
