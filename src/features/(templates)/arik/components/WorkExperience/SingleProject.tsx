"use client";

import TopRightArrow from "@/features/(templates)/arik/assets/icons/top-right-arrow";
import Noise from "@/features/(templates)/arik/components/Noise";
import Image from "next/image";

import { Work } from "../../types/work";
import { useChangeWorkExperience } from "../../services/mutations";
import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IKUpload, ImageKitProvider } from "imagekitio-next";
import { fakeWorkExperience } from "../../constants/work-experience";
import { authenticator } from "@/lib/helpers";
import Loading from "@/app/loading";
import { cn } from "@/lib/utils";
import Link from "next/link";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

type ProjectProps = {
  project: Work;
  workExperience: Work[];
  index: number;
  refetch: () => void;
  isOwner: boolean;
};

export default function SingleProject({
  project,
  workExperience,
  index,
  refetch,
  isOwner,
}: ProjectProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [order, setOrder] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const { mutate } = useChangeWorkExperience();

  const ref = useRef(null);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const categoryRef = useRef<HTMLParagraphElement>(null);
  const projectLinkRef = useRef<HTMLParagraphElement>(null);

  return (
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
        <Noise className="project max-w-[684px] max-h-[513px] w-full opacity-0">
          <Image
            className="w-[684px] h-[513px] object-cover"
            src={project.img_url || fakeWorkExperience[index].img_url}
            alt={project.title || fakeWorkExperience[index].title}
            width={684}
            height={513}
          />

          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-8 bottom-8 flex items-center justify-between bg-white/5 backdrop-blur-md p-4 border border-white/15 rounded-sm z-20"
          >
            <h4
              ref={titleRef}
              className={`text-wheat text-xl font-light ${isOwner && "editable cursor-pointer"}`}
              contentEditable={isOwner}
              suppressContentEditableWarning
              onBlur={(e) => {
                workExperience[index] = {
                  ...workExperience[index],
                  title: e.target.textContent!,
                  category: categoryRef.current?.textContent ?? "",
                };
                mutate(workExperience);
              }}
              onPaste={(e) => {
                e.preventDefault();
                const text = e.clipboardData.getData("text/plain");
                document.execCommand("insertText", false, text);
              }}
            >
              {project.title || fakeWorkExperience[index].title}
            </h4>

            <p
              ref={categoryRef}
              className={`text-wheat text-base font-normal text-[13px] uppercase ${isOwner && "editable cursor-pointer"}`}
              contentEditable={isOwner}
              suppressContentEditableWarning
              onBlur={(e) => {
                workExperience[index] = {
                  ...workExperience[index],
                  title: titleRef.current?.textContent ?? "",
                  category: e.target.textContent!,
                };
                mutate(workExperience);
              }}
              onPaste={(e) => {
                e.preventDefault();
                const text = e.clipboardData.getData("text/plain");
                document.execCommand("insertText", false, text);
              }}
            >
              {project.category || fakeWorkExperience[index].category}
            </p>
          </div>

          <Link
            href={
              project.project_link.includes("https://")
                ? project.project_link
                : project.project_link
                  ? `https://${project.project_link}`
                  : "#"
            }
            target="_blank"
            onClick={(e) => {
              if (!isOwner) return;

              if (isOwner) {
                e.preventDefault();
                setOpen(true);
              }
            }}
            className={`absolute inset-0 flex items-center justify-center z-10 ${!isOwner && "cursor-pointer"}`}
          >
            <TopRightArrow
              asDiv
              className="project-link-icon backdrop-blur-md opacity-0 transition-all duration-300"
            />
          </Link>
        </Noise>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl bg-black text-wheat border-zinc-700 pt-8">
        <ScrollArea className="h-[500px]">
          <div className="text-center">
            <DialogTitle className="text-2xl font-semibold mb-4">
              Edit Project Details
            </DialogTitle>
          </div>

          <div className="px-2 flex items-center justify-evenly flex-wrap gap-y-6 pb-6">
            {workExperience.map((project, index) => (
              <div key={project.id} className="space-y-2">
                <Label className="sr-only">Project Image</Label>
                <div className="border border-dashed border-zinc-700 rounded-lg p-4">
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
                        if (workExperience?.[order!]?.img_id) {
                          await fetch("/api/images/delete", {
                            method: "DELETE",
                            body: JSON.stringify({
                              imageId: workExperience[order!]?.img_id,
                            }),
                          });
                        }
                      }}
                      onError={() => {
                        setIsUploading(false);
                      }}
                      onSuccess={async (e) => {
                        setIsUploading(false);
                        workExperience[order!] = {
                          ...workExperience[order!],
                          img_url: e.url,
                          img_id: e.fileId,
                        };

                        mutate(workExperience);

                        setOrder(null);
                      }}
                      onBlur={() => {
                        setIsUploading(false);
                      }}
                      onPaste={(e) => {
                        e.preventDefault();
                        const text = e.clipboardData.getData("text/plain");
                        document.execCommand("insertText", false, text);
                      }}
                      ref={ref}
                    />
                  </ImageKitProvider>
                  <div className="relative p-2" key={project.img_id}>
                    {isUploading && order === index && (
                      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Loading />
                      </div>
                    )}
                    <Image
                      src={project.img_url || fakeWorkExperience[index].img_url}
                      width={400}
                      height={200}
                      className={cn(
                        "w-[300px] h-[225px] object-cover cursor-pointer",
                        order === index && isUploading && "opacity-15",
                        isUploading && order !== index && "cursor-not-allowed"
                      )}
                      alt={`Client Picture - ${index + 1}`}
                      onClick={() => {
                        if (isUploading) return;

                        (ref.current! as { click: () => void })?.click();
                        setOrder(index);
                      }}
                      aria-disabled={isUploading}
                    />
                  </div>
                </div>

                <div>
                  <Label>Project Link</Label>
                  <p
                    ref={projectLinkRef}
                    className={`${isOwner && "editable cursor-pointer"} border-2 border-zinc-700 !p-2 mt-2 max-w-[350px] h-[44px] overflow-auto`}
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      workExperience[index] = {
                        ...workExperience[index],
                        project_link: e.target?.textContent ?? "",
                      };
                      mutate(workExperience);
                    }}
                    onPaste={(e) => {
                      e.preventDefault();
                      const text = e.clipboardData.getData("text/plain");
                      document.execCommand("insertText", false, text);
                    }}
                  >
                    {project.project_link && project.project_link == "null"
                      ? fakeWorkExperience[index].project_link
                      : project.project_link}
                  </p>
                </div>

                <div>
                  <Label>Image Link</Label>
                  <p
                    className={`${isOwner && "editable cursor-pointer"} border-2 border-zinc-700 !p-2 mt-2 max-w-[350px] h-[44px] overflow-auto`}
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      workExperience[index] = {
                        ...workExperience[index],
                        img_url: e.target?.textContent ?? "",
                        img_id: "not_image_kit",
                      };
                      mutate(workExperience);
                    }}
                    onPaste={(e) => {
                      e.preventDefault();
                      const text = e.clipboardData.getData("text/plain");
                      document.execCommand("insertText", false, text);
                    }}
                  >
                    {project.img_url && project.img_url == "null"
                      ? fakeWorkExperience[index].img_url
                      : project.img_url}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
