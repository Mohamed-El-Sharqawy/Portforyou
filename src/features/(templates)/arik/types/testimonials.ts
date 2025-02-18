type TestimonialClient = {
  client_name: string;
  client_company: string;
  client_img_url: string;
  client_img_id: string;
};

export type Testimonial = {
  testimonial_client: TestimonialClient;
  testimonial_heading: string;
  testimonial_paragraph: string;
};
