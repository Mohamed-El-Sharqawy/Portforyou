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
import { useOpenAIMutation } from "@/services/mutations";
import EnhanceContentButton from "../EnhanceContentButton";
import CustomTooltip from "@/components/CustomTooltip";
import { toast } from "sonner";
import EnhancingLoader from "../EnhancingLoader";

import Loading from "@/app/loading";
import Image from "next/image";

type Props = {
  testimonials: Testimonial[];
  testimonial: Testimonial;
  refetch: () => void;
  index: number;
  isOwner: boolean;
};

type LastClickedField =
  | "heading"
  | "paragraph"
  | "clientName"
  | "clientCompany"
  | null;

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

export default function SingleTestimonial({
  testimonials,
  testimonial,
  refetch,
  index,
  isOwner,
}: Props) {
  const [isUploading, setIsUploading] = useState(false);
  const [order, setOrder] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [lastClicked, setLastClicked] = useState<LastClickedField>(null);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const clientNameRef = useRef<HTMLHeadingElement>(null);
  const clientCompanyRef = useRef<HTMLHeadingElement>(null);
  const uploadRef = useRef(null);

  const { mutate } = useChangeTestimonials();
  const { mutate: enhanceContent, isPending } = useOpenAIMutation();

  const isHeadingPending = isPending && lastClicked === "heading";
  const isParagraphPending = isPending && lastClicked === "paragraph";
  const isClientNamePending = isPending && lastClicked === "clientName";
  const isClientCompanyPending = isPending && lastClicked === "clientCompany";

  return (
    <article
      className={
        "bg-wheat/5 border border-wheat/15 rounded-lg p-12 hover:bg-wheat/10 transition-colors"
      }
    >
      <h2
        ref={headingRef}
        className={cn(
          "text-xl font-medium mb-4 text-wheat group relative",
          isHeadingPending && "opacity-50",
          isOwner && "editable cursor-pointer"
        )}
        contentEditable={isOwner}
        suppressContentEditableWarning
        onBlur={(e) => {
          const newValue = e.target.textContent;
          const newTestimonials = [...testimonials];

          if (newValue == testimonial?.testimonial_heading) return;

          newTestimonials[index!].testimonial_heading = newValue!;
          mutate(newTestimonials);
        }}
      >
        {isHeadingPending && <EnhancingLoader />}
        {testimonial?.testimonial_heading ||
          fakeTestimonials[index!].testimonial_heading}
        {isOwner && (
          <CustomTooltip>
            <EnhanceContentButton
              onClick={() => {
                setLastClicked("heading");
                const elementContent = headingRef.current?.textContent?.replace(
                  "Enhance ContentEnhance Content",
                  ""
                );
                if (elementContent) {
                  enhanceContent(elementContent, {
                    onSuccess: (data: string) => {
                      const newTestimonials = [...testimonials];
                      if (data === elementContent) {
                        return toast.success("Content is already perfect 📈");
                      }
                      if (data == newTestimonials[index!].testimonial_heading)
                        return toast.success("Content is already perfect 📈");
                      newTestimonials[index!].testimonial_heading = data;
                      mutate(newTestimonials);
                      toast.success("Content enhanced successfully!");
                    },
                  });
                }
              }}
            />
          </CustomTooltip>
        )}
      </h2>

      <p
        ref={paragraphRef}
        className={cn(
          "text-wheat/60 mb-8 leading-relaxed max-w-[490px] group relative",
          isParagraphPending && "opacity-50",
          isOwner && "editable cursor-pointer"
        )}
        contentEditable={isOwner}
        suppressContentEditableWarning
        onBlur={(e) => {
          const newValue = e.target.textContent;
          const newTestimonials = [...testimonials];

          if (newValue == testimonial?.testimonial_paragraph) return;

          newTestimonials[index!].testimonial_paragraph = newValue!;
          mutate(newTestimonials);
        }}
      >
        {isParagraphPending && <EnhancingLoader />}
        {testimonial?.testimonial_paragraph ||
          fakeTestimonials[index!].testimonial_paragraph}
        {isOwner && (
          <CustomTooltip>
            <EnhanceContentButton
              onClick={() => {
                setLastClicked("paragraph");
                const elementContent =
                  paragraphRef.current?.textContent?.replace(
                    "Enhance ContentEnhance Content",
                    ""
                  );
                if (elementContent) {
                  enhanceContent(elementContent, {
                    onSuccess: (data: string) => {
                      const newTestimonials = [...testimonials];
                      if (data === elementContent) {
                        return toast.success("Content is already perfect 📈");
                      }
                      if (data == newTestimonials[index!].testimonial_paragraph)
                        return toast.success("Content is already perfect 📈");
                      newTestimonials[index!].testimonial_paragraph = data;
                      mutate(newTestimonials);
                      toast.success("Content enhanced successfully!");
                    },
                  });
                }
              }}
            />
          </CustomTooltip>
        )}
      </p>

      <div className="flex items-center gap-3">
        <div className="rounded-full overflow-hidden size-[60px] cursor-pointer">
          <Dialog
            open={open}
            onOpenChange={(opened) => {
              if (!isOwner) return;
              else {
                setOpen(opened);

                if (!opened) {
                  refetch();
                }
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

                      (uploadRef.current! as { click: () => void })?.click();
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

                          const newTestimonials = [...testimonials];
                          newTestimonials[
                            order!
                          ].testimonial_client.client_img_url = e.url;
                          newTestimonials[
                            order!
                          ].testimonial_client.client_img_id = e.fileId;

                          mutate(newTestimonials);
                          setOrder(() => null);
                        }}
                        onBlur={() => {
                          setIsUploading(false);
                        }}
                        ref={uploadRef}
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
            ref={clientNameRef}
            className={cn(
              "font-medium text-wheat group relative",
              isClientNamePending && "opacity-50",
              isOwner && "editable cursor-pointer"
            )}
            contentEditable={isOwner}
            suppressContentEditableWarning
            onBlur={(e) => {
              const newValue = e.target.textContent;
              const newTestimonials = [...testimonials];

              if (newValue == testimonial?.testimonial_client.client_name)
                return;

              newTestimonials[index!].testimonial_client.client_name =
                newValue!;
              mutate(newTestimonials);
            }}
          >
            {isClientNamePending && <EnhancingLoader />}
            {testimonial?.testimonial_client.client_name ||
              fakeTestimonials[index!].testimonial_client.client_name}
            {isOwner && (
              <CustomTooltip>
                <EnhanceContentButton
                  onClick={() => {
                    setLastClicked("clientName");
                    const elementContent =
                      clientNameRef.current?.textContent?.replace(
                        "Enhance ContentEnhance Content",
                        ""
                      );
                    if (elementContent) {
                      enhanceContent(elementContent, {
                        onSuccess: (data: string) => {
                          const newTestimonials = [...testimonials];
                          if (data === elementContent) {
                            return toast.success(
                              "Content is already perfect 📈"
                            );
                          }
                          newTestimonials[
                            index!
                          ].testimonial_client.client_name = data;
                          mutate(newTestimonials);
                          toast.success("Content enhanced successfully!");
                        },
                      });
                    }
                  }}
                />
              </CustomTooltip>
            )}
          </h3>
          <h5
            ref={clientCompanyRef}
            className={cn(
              "text-sm text-wheat/60 group relative",
              isClientCompanyPending && "opacity-50",
              isOwner && "editable cursor-pointer"
            )}
            contentEditable={isOwner}
            suppressContentEditableWarning
            onBlur={(e) => {
              const newValue = e.target.textContent;
              const newTestimonials = [...testimonials];

              if (newValue == testimonial?.testimonial_client.client_company)
                return;

              newTestimonials[index!].testimonial_client.client_company =
                newValue!;
              mutate(newTestimonials);
            }}
          >
            {isClientCompanyPending && <EnhancingLoader />}
            {testimonial?.testimonial_client.client_company ||
              fakeTestimonials[index!].testimonial_client.client_company}
            {isOwner && (
              <CustomTooltip>
                <EnhanceContentButton
                  onClick={() => {
                    setLastClicked("clientCompany");
                    const elementContent =
                      clientCompanyRef.current?.textContent?.replace(
                        "Enhance ContentEnhance Content",
                        ""
                      );
                    if (elementContent) {
                      enhanceContent(elementContent, {
                        onSuccess: (data: string) => {
                          const newTestimonials = [...testimonials];
                          if (data === elementContent) {
                            return toast.success(
                              "Content is already perfect 📈"
                            );
                          }
                          newTestimonials[
                            index!
                          ].testimonial_client.client_company = data;
                          mutate(newTestimonials);
                          toast.success("Content enhanced successfully!");
                        },
                      });
                    }
                  }}
                />
              </CustomTooltip>
            )}
          </h5>
        </div>
      </div>
    </article>
  );
}
