"use client";

import { useState } from "react";
import { useGSAP } from "@gsap/react";
import { FilePond, registerPlugin } from "react-filepond";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { logos as initialLogos } from "@/features/(templates)/arik/constants/logos";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// Filepond
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

import gsap from "gsap";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { ScrollArea } from "@/components/ui/scroll-area";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Logos() {
  const [logos, setLogos] = useState(initialLogos);
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: any }>(
    {}
  );

  useGSAP(() => {
    gsap.to(".partner-logo", {
      opacity: 1,
      duration: 1,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: ".logos",
        start: "180% bottom",
      },
      stagger: 0.1,
    });
  });

  const handleFileUpdate = (fileItems: any[], logoAlt: string) => {
    if (fileItems.length === 0) {
      // Reset to original logo if no file
      const originalLogo = initialLogos.find((l) => l.alt === logoAlt);
      if (originalLogo) {
        setLogos((prev) =>
          prev.map((logo) => (logo.alt === logoAlt ? originalLogo : logo))
        );
        setUploadedFiles((prev) => {
          const newFiles = { ...prev };
          delete newFiles[logoAlt];
          return newFiles;
        });
      }
      return;
    }

    const file = fileItems[0].file;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setUploadedFiles((prev) => ({
        ...prev,
        [logoAlt]: fileItems[0],
      }));
      setLogos((prev) =>
        prev.map((logo) =>
          logo.alt === logoAlt ? { ...logo, src: result } : logo
        )
      );
    };
    reader.readAsDataURL(file);
  };

  return (
    <section id="logos-section" className="flex items-center justify-center">
      <Dialog>
        <DialogTrigger>
          <Marquee
            className="xl:!hidden py-8 bg-white/[0.02]"
            autoFill
            pauseOnHover
            speed={200}
          >
            {logos.map((logo) => (
              <div
                key={logo.alt}
                className="cursor-pointer drop-shadow-[0_0_4px_#DAC5A7] hover:drop-shadow-[0_0_8px_#DAC5A7] relative transition mr-16"
              >
                <Image
                  className="w-[155px] h-[35px] object-contain"
                  src={logo.src}
                  alt={logo.alt}
                  width={155}
                  height={35}
                />
              </div>
            ))}
          </Marquee>

          <div className="hidden xl:grid logos grid-cols-6 place-items-center w-[1200px] mx-auto pt-12">
            {logos.map((logo) => (
              <div
                key={logo.alt}
                className="partner-logo cursor-pointer drop-shadow-[0_0_4px_#DAC5A7] hover:drop-shadow-[0_0_8px_#DAC5A7] relative transition opacity-0"
              >
                <Image
                  className="w-[155px] h-[35px] object-contain"
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                />
              </div>
            ))}
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-4xl bg-black text-wheat border-none">
          <ScrollArea className="h-[450px]">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Upload your logos</h2>
              <p>Max Height: 50px | Max Width: 200px</p>
            </div>

            <div className="grid grid-cols-2 gap-6 place-items-center pt-10">
              {logos.map((logo) => (
                <div className="w-full" key={logo.alt}>
                  <FilePond
                    files={
                      uploadedFiles[logo.alt] ? [uploadedFiles[logo.alt]] : []
                    }
                    onupdatefiles={(fileItems) =>
                      handleFileUpdate(fileItems, logo.alt)
                    }
                    allowMultiple={false}
                    allowReorder
                    allowImagePreview
                    allowImageExifOrientation
                    acceptedFileTypes={[
                      "image/jpeg",
                      "image/png",
                      "image/webp",
                      "image/svg+xml",
                      "image/avif",
                    ]}
                    maxFiles={1}
                    name="logos"
                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                  />
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </section>
  );
}
