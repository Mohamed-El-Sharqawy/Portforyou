import { services } from "../../constants/services";
import SingleService from "./SingleService";

export default function ServicesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
      {services.map((service, index) => (
        <SingleService key={service.title} service={service} index={index} />
      ))}
    </div>
  );
}
