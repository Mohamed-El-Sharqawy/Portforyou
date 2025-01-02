import TopRightArrow from "@/features/(templates)/arik/assets/icons/top-right-arrow";
import Noise from "@/features/(templates)/arik/components/Noise";
import Image from "next/image";
import Link from "next/link";

type ProjectProps = {
  id: number;
  imgSrc: string;
  title: string;
  category: string;
};

export default function SingleProject({ project }: { project: ProjectProps }) {
  return (
    <Noise className="project max-w-[684px] max-h-[513px] w-full opacity-0">
      <Image
        className="w-full object-cover"
        src={project.imgSrc}
        alt={project.title}
        width={684}
        height={513}
      />

      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute inset-x-8 bottom-8 flex items-center justify-between bg-white/5 backdrop-blur-md p-4 border border-white/15 rounded-sm z-20"
      >
        <h4 className="text-wheat text-xl font-light editable" contentEditable>
          {project.title}
        </h4>

        <p
          className="text-wheat text-base font-normal text-[13px] uppercase editable"
          contentEditable
        >
          {project.category}
        </p>
      </div>

      <Link
        className="absolute inset-0 flex items-center justify-center z-10"
        href={`work/${project.id}`}
      >
        <TopRightArrow
          asDiv
          className="project-link-icon backdrop-blur-md opacity-0 transition-all duration-300"
        />
      </Link>
    </Noise>
  );
}
