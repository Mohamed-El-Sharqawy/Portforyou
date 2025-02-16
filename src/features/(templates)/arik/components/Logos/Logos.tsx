"use client";

import { useRef, useState } from "react";
import { registerPlugin } from "react-filepond";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IKUpload, ImageKitProvider } from "imagekitio-next";
import { fakeLogos } from "@/features/(templates)/arik/constants/logos";
import { useLogosSectionData } from "../../services/queries";
import { useChangeLogos } from "../../services/mutations";

// Filepond
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

import Image from "next/image";
import Marquee from "react-fast-marquee";
import Loading from "@/app/loading";
import gsap from "gsap";

import { cn } from "@/lib/utils";
import { authenticator } from "@/lib/helpers";

import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP, ScrollTrigger);

import { ScrollTrigger } from "gsap/ScrollTrigger";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

export default function Logos() {
  const [order, setOrder] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const ref = useRef(null);

  const { data, isFetching } = useLogosSectionData();
  const logos = data?.data.user.arikTemplate.logos;

  const { mutate } = useChangeLogos();

  useGSAP(
    () => {
      gsap.to(".partner-logo", {
        opacity: 1,
        duration: 1,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: ".logos",
          start: "180% bottom", // start of the section
        },
        stagger: 0.1,
      });
    },
    {
      dependencies: [isFetching],
    }
  );

  return (
    <section id="logos-section" className="flex items-center justify-center">
      <Dialog>
        <DialogTrigger>
          {/* Mobile Logos */}
          <Marquee
            className="xl:!hidden py-8 bg-white/[0.02]"
            autoFill
            pauseOnHover
            speed={200}
          >
            {logos?.map((logo, idx) => (
              <div
                key={`mobile ${idx}`}
                className="cursor-pointer drop-shadow-[0_0_4px_#DAC5A7] hover:drop-shadow-[0_0_8px_#DAC5A7] relative transition mr-16"
              >
                <Image
                  className="w-[155px] h-[35px] object-contain"
                  src={logo.img_url || fakeLogos[idx].src}
                  alt={"Uploaded Logo for a (client - company - service)"}
                  width={155}
                  height={35}
                />
              </div>
            ))}
          </Marquee>

          {/* Desktop Logos */}
          <div className="logos hidden xl:grid grid-cols-6 place-items-center w-[1200px] mx-auto pt-12">
            {logos?.map((logo, idx) => (
              <div
                key={`desktop ${idx}`}
                className="partner-logo cursor-pointer drop-shadow-[0_0_4px_#DAC5A7] hover:drop-shadow-[0_0_8px_#DAC5A7] relative transition opacity-0"
              >
                <Image
                  className="w-[155px] h-[35px] object-contain"
                  src={logo.img_url || fakeLogos[idx].src}
                  alt={"Uploaded Logo for a (client - company - service)"}
                  width={155}
                  height={35}
                />
              </div>
            ))}
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-4xl bg-black text-wheat border-zinc-700 pt-8">
          <ScrollArea className="h-[500px]">
            <div className="text-center">
              <DialogTitle className="text-2xl font-semibold mb-4">
                Upload your logos
              </DialogTitle>
              <p>Max Height: 50px | Max Width: 200px</p>
            </div>

            <div className="grid grid-cols-3 gap-16 place-items-center pt-12">
              <ImageKitProvider
                urlEndpoint={urlEndpoint}
                publicKey={publicKey}
                authenticator={authenticator}
              >
                <IKUpload
                  className="hidden"
                  useUniqueFileName
                  onUploadStart={async () => {
                    setIsUploading(true);

                    // delete the previous uploaded logo
                    if (logos?.[order!]?.img_id) {
                      await fetch("/api/images/delete", {
                        method: "DELETE",
                        body: JSON.stringify({
                          imageId: logos[order!]?.img_id,
                        }),
                      });
                    }
                  }}
                  onProgress={() => {
                    console.log("uploading");
                  }}
                  onError={() => {
                    setIsUploading(false);
                    console.log("Error in uploading");
                  }}
                  onSuccess={async (e) => {
                    setIsUploading(false);
                    const newLogos = logos!;

                    newLogos[order!] = {
                      img_url: e.url,
                      img_id: e.fileId,
                    };

                    mutate(newLogos);

                    setOrder(null);
                  }}
                  onBlur={() => {
                    setIsUploading(false);
                    console.log("Blur");
                  }}
                  ref={ref}
                />
                {logos?.map((logo, idx) =>
                  logo.img_url ? (
                    <div className="relative p-2" key={logo.img_id}>
                      {isUploading && order === idx && (
                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <Loading />
                        </div>
                      )}
                      <Image
                        src={logo.img_url}
                        width={400}
                        height={200}
                        className={cn(
                          "w-[400px] h-[200px] object-contain cursor-pointer hover:drop-shadow-[0_0_8px_#DAC5A7] relative transition",
                          order === idx && isUploading && "opacity-15",
                          isUploading && order !== idx && "cursor-not-allowed"
                        )}
                        alt={`Logo ${idx + 1}`}
                        onClick={() => {
                          if (isUploading) return;

                          (ref.current! as { click: () => void })?.click();
                          setOrder(idx);
                        }}
                        aria-disabled={isUploading}
                      />
                    </div>
                  ) : (
                    <button
                      key={`add image button ${idx + 1}`}
                      className="partner-logo cursor-pointer hover:drop-shadow-[0_0_8px_#DAC5A7] relative transition disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => {
                        if (isUploading) return;

                        (ref.current! as { click: () => void })?.click();
                        setOrder(idx);
                      }}
                      disabled={isUploading}
                    >
                      {isUploading ? "Uploading..." : "Add Image"}
                    </button>
                  )
                )}
              </ImageKitProvider>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </section>
  );
}
