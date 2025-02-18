"use client";

import { Testimonial } from "@/features/(templates)/arik/types/testimonials";
import { fakeTestimonials } from "../../constants/testimonials";
import { useChangeTestimonials } from "../../services/mutations";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IKUpload, ImageKitProvider } from "imagekitio-next";
import { authenticator } from "@/lib/helpers";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

import Loading from "@/app/loading";
import Image from "next/image";

type Props = {
  testimonials: Testimonial[];
  testimonial: Testimonial;
  refetch: () => void;
  index: number;
};

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

export default function SingleTestimonial({
  testimonials,
  testimonial,
  refetch,
  index,
}: Props) {
  const [isUploading, setIsUploading] = useState(false);
  const [order, setOrder] = useState<number | null>(null);

  const ref = useRef(null);

  const { mutate } = useChangeTestimonials();

  return (
    <article
      className={
        "bg-wheat/5 border border-wheat/15 rounded-lg p-12 hover:bg-wheat/10 transition-colors"
      }
    >
      <h2
        className="text-xl font-medium mb-4 text-wheat editable"
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          const newValue = e.target.textContent;
          const newTestimonials = testimonials;

          if (newValue == testimonial?.testimonial_heading) return;

          newTestimonials[index!].testimonial_heading = newValue!;
          mutate(newTestimonials);
        }}
      >
        {testimonial?.testimonial_heading ||
          fakeTestimonials[index!].testimonial_heading}
      </h2>

      <p
        className="text-wheat/60 mb-8 leading-relaxed max-w-[490px] editable"
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          const newValue = e.target.textContent;
          const newTestimonials = testimonials;

          if (newValue == testimonial?.testimonial_paragraph) return;

          newTestimonials[index!].testimonial_paragraph = newValue!;
          mutate(newTestimonials);
        }}
      >
        {testimonial?.testimonial_paragraph ||
          fakeTestimonials[index!].testimonial_paragraph}
      </p>

      <div className="flex items-center gap-3">
        <div className="rounded-full overflow-hidden size-[60px] cursor-pointer">
          <Dialog
            onOpenChange={(opened) => {
              if (!opened) {
                refetch();
              }
            }}
          >
            <DialogTrigger asChild>
              <Image
                src={
                  testimonial?.testimonial_client.client_img_url ||
                  fakeTestimonials[index].testimonial_client.client_img_url
                }
                alt={`${testimonial?.testimonial_client.client_name || fakeTestimonials[index!].testimonial_client.client_name} Picture - ${index + 1}`}
                width={60}
                height={60}
                className="object-cover w-auto h-auto cursor-pointer"
              />
            </DialogTrigger>

            <DialogContent
              className="sm:max-w-4xl bg-black text-wheat border-zinc-700 pt-12"
              onClick={(e) => e.stopPropagation()}
            >
              <DialogTitle className="text-center text-2xl">
                Upload Your Clients Avatars
              </DialogTitle>
              <div className="grid grid-cols-3 justify-items-center gap-y-10 mt-10">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={`Uploaded ${testimonial?.testimonial_client.client_name} Picture ${index + 1}`}
                    className={cn(
                      "relative",
                      order === index && isUploading && "opacity-15",
                      isUploading && "cursor-not-allowed"
                    )}
                    onClick={() => {
                      if (isUploading) return;

                      (ref.current! as { click: () => void })?.click();
                      setOrder(index);
                    }}
                  >
                    <ImageKitProvider
                      authenticator={authenticator}
                      publicKey={publicKey}
                      urlEndpoint={urlEndpoint}
                    >
                      <IKUpload
                        className="hidden"
                        useUniqueFileName
                        onUploadStart={async () => {
                          setIsUploading(true);

                          // delete the previous uploaded logo
                          if (
                            testimonials[order!].testimonial_client
                              .client_img_id
                          ) {
                            await fetch("/api/images/delete", {
                              method: "DELETE",
                              body: JSON.stringify({
                                imageId:
                                  testimonials[order!].testimonial_client
                                    .client_img_id,
                              }),
                            });
                          }
                        }}
                        onError={() => {
                          setIsUploading(false);
                        }}
                        onSuccess={async (e) => {
                          setIsUploading(false);

                          testimonials[
                            order!
                          ].testimonial_client.client_img_url = e.url;
                          testimonials[
                            order!
                          ].testimonial_client.client_img_id = e.fileId;

                          mutate(testimonials);
                          setOrder(() => null);
                        }}
                        onBlur={() => {
                          setIsUploading(false);
                        }}
                        ref={ref}
                      />
                    </ImageKitProvider>

                    {isUploading && order === index && (
                      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Loading />
                      </div>
                    )}
                    <Image
                      src={
                        testimonial?.testimonial_client.client_img_url ||
                        fakeTestimonials[index!].testimonial_client
                          .client_img_url
                      }
                      alt={`${testimonial?.testimonial_client.client_name || fakeTestimonials[index!].testimonial_client.client_name} Picture`}
                      width={60}
                      height={60}
                      className={cn(
                        `object-cover w-auto h-auto cursor-pointer`,
                        order === index && isUploading && "opacity-15",
                        isUploading && "cursor-not-allowed"
                      )}
                      aria-disabled={isUploading}
                    />
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div>
          <h3
            className="font-medium text-wheat editable"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => {
              const newValue = e.target.textContent;
              const newTestimonials = testimonials;

              if (newValue == testimonial?.testimonial_client.client_name)
                return;

              newTestimonials[index!].testimonial_client.client_name =
                newValue!;
              mutate(newTestimonials);
            }}
          >
            {testimonial?.testimonial_client.client_name ||
              fakeTestimonials[index!].testimonial_client.client_name}
          </h3>
          <h5
            className="text-sm text-wheat/60 editable"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => {
              const newValue = e.target.textContent;
              const newTestimonials = testimonials;

              if (newValue == testimonial?.testimonial_client.client_company)
                return;

              newTestimonials[index!].testimonial_client.client_company =
                newValue!;
              mutate(newTestimonials);
            }}
          >
            {testimonial?.testimonial_client.client_company ||
              fakeTestimonials[index!].testimonial_client.client_company}
          </h5>
        </div>
      </div>
    </article>
  );
}
