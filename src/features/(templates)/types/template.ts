import { StaticImageData } from "next/image";

export interface Template {
  id: string;
  title: string;
  description: string;
  image: string | StaticImageData;
  price: string;
}
