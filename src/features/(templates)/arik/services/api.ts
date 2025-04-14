import fetcher from "@/services/api";

import { getToken } from "@/lib/utils";
import { Logo } from "../types/logos";
import { Service } from "../types/services";
import { Work } from "../types/work";
import { WorkSteps } from "../types/work-steps";
import { Testimonial } from "../types/testimonials";

type HeroData = Promise<{
  data: {
    user: {
      id: string;
      arikTemplate: {
        hero: {
          hero_heading: string;
          hero_subheading: string;
          hero_paragraph: string;
        };
      };
    };
  };
}>;

type LogosData = Promise<{
  data: {
    user: {
      id: string;
      arikTemplate: {
        logos: Logo[];
      };
    };
  };
}>;

type ServicesData = Promise<{
  data: {
    user: {
      id: string;
      arikTemplate: {
        services: Service[];
      };
    };
  };
}>;

export type WorkExperienceData = Promise<{
  data: {
    user: {
      id: string;
      arikTemplate: {
        work: Work[];
      };
    };
  };
}>;

type WorkStepsData = Promise<{
  data: {
    user: {
      id: string;
      arikTemplate: {
        process: WorkSteps;
      };
    };
  };
}>;

type TestimonialData = Promise<{
  data: {
    user: {
      id: string;
      arikTemplate: {
        testimonials: {
          testimonials: Testimonial[];
          testimonials_heading: string;
          testimonials_paragraph: string;
        };
      };
    };
  };
}>;

type FooterData = Promise<{
  data: {
    user: {
      id: string;
      arikTemplate: {
        footer: {
          footer_heading: string;
          footer_paragraph: string;
        };
      };
    };
  };
}>;

// Queries
export const getHeroSectionData = async (userId: string): HeroData => {
  const query = `query GetHeroSection {
  user(id: "${userId}") {
  id
    arikTemplate {
      hero {
        hero_heading
        hero_subheading
        hero_paragraph
      }
    }
  }
}`;

  return await fetcher(query);
};

export const getLogosSectionData = async (userId: string): LogosData => {
  const query = `query GetLogosSection {
  user(id: "${userId}") {
    id
    arikTemplate {
      logos {
        img_url
        img_id
      }
    }
  }
}`;

  return await fetcher(query);
};

export const getServicesSectionData = async (userId: string): ServicesData => {
  const query = `query GetServicesData {
  user(id: "${userId}") {
    id
    arikTemplate {
      services {
        title
        description
      }
    }
  }
}`;

  return await fetcher(query);
};

export const getWorkExperienceSectionData = async (
  userId: string
): WorkExperienceData => {
  const query = `query GetWorkExperienceSection {
  user(id: "${userId}") {
    id
    arikTemplate {
      work {
        id
        project_link
        title
        category
        img_url
        img_id
      }
    }
  }
}`;

  return await fetcher(query);
};

export const getWorkStepsSectionData = async (
  userId: string
): WorkStepsData => {
  const query = `
  query GetWorkStepsSection {
  user(id: "${userId}") {
    id
    arikTemplate {
      process {
        process_heading
        process_paragraph
        steps {
          step_heading
          step_subheading
          step_paragraph
          step_points
        }
      }
    }
  }
}`;

  return await fetcher(query);
};

export const getTestimonialSectionData = async (
  userId: string
): TestimonialData => {
  const query = `query GetTestimonialsData {
  user(id: "${userId}") {
    id
    arikTemplate {
      testimonials {
        testimonials_heading
        testimonials_paragraph
        testimonials {
          testimonial_client {
            client_name
            client_company
            client_img_url
            client_img_id
          }
          testimonial_heading
          testimonial_paragraph
        }
      }
    }
  }
}`;

  return await fetcher(query);
};

export const getFooterSectionData = async (userId: string): FooterData => {
  const query = `query GetCTASectionData {
  user(id: "${userId}") {
    id
    arikTemplate {
      footer {
        footer_heading
        footer_paragraph
      }
    }
  }
}`;

  return fetcher(query);
};

// Mutations
export const changeHeroHeading = async (
  textContent: string
): Promise<{
  data: {
    user: {
      arikTemplate: {
        hero: {
          hero_heading: string;
        };
      };
    };
  };
}> => {
  const {
    decodedToken,
  } = getToken();

  const mutation = `
  mutation UpdateHeroSection {
  updateUserTemplate(
    id: "${decodedToken?.userId}"
    template: { hero: { hero_heading: "${textContent}" } }
  ) {
    arikTemplate {
      hero {
        hero_heading
      }
    }
  }
}`;

  return await fetcher(mutation);
};

export const changeHeroSubheading = async (
  textContent: string
): Promise<{
  data: {
    user: {
      arikTemplate: {
        hero: {
          hero_subheading: string;
        };
      };
    };
  };
}> => {
  const {
    decodedToken,
  } = getToken();

  const mutation = `mutation UpdateHeroSection {
  updateUserTemplate(
    id: "${decodedToken?.userId}"
    template: { hero: { hero_subheading: "${textContent}" } }
  ) {
    arikTemplate {
      hero {
        hero_subheading
      }
    }
  }
}`;

  return await fetcher(mutation);
};

export const changeHeroParagraph = async (
  textContent: string
): Promise<{
  data: {
    user: {
      arikTemplate: {
        hero: {
          hero_paragraph: string;
        };
      };
    };
  };
}> => {
  const { decodedToken } = getToken();

  const mutation = `mutation UpdateHeroSection {
  updateUserTemplate(
    id: "${decodedToken?.userId}"
    template: { hero: { hero_paragraph: "${textContent}" } }
  ) {
    arikTemplate {
      hero {
        hero_paragraph
      }
    }
  }
}`;

  return await fetcher(mutation);
};

export const changeLogos = async (logos: Logo[]): LogosData => {
  const {
    decodedToken,
  } = getToken();

  const logosString = logos
    .map(
      ({ img_id, img_url }) => `{ img_id: "${img_id}", img_url: "${img_url}" }`
    )
    .join(",\n        ");

  const mutation = `mutation UpdateLogosSection {
  updateUserTemplate(
    id: "${decodedToken?.userId}"
    template: {
      logos: [
        ${logosString}
      ]
    }
  ) {
    arikTemplate {
      logos {
        img_id
        img_url
      }
    }
  }
}`;

  return await fetcher(mutation);
};

export const changeServices = async (services: Service[]): ServicesData => {
  const { decodedToken } = getToken();

  const servicesString = services
    .map(
      ({ title, description }) =>
        `{ title: "${title}", description: "${description}" }`
    )
    .join(",\n        ");

  const mutation = `mutation UpdateLogosSection {
  updateUserTemplate(
    id: "${decodedToken?.userId}"
    template: {
      services: [
        ${servicesString}
      ]
    }
  ) {
    arikTemplate {
      services {
        title
        description
      }
    }
  }
}`;

  return await fetcher(mutation);
};

export const changeWorkExperience = async (
  work: Work[]
): WorkExperienceData => {
  const { decodedToken } = getToken();

  const mutation = `mutation UpdateWorkExperienceSection {
  updateUserTemplate(
    id: "${decodedToken?.userId}"
    template: {
      work: [
        ${work
          .map(
            ({ title, category, img_id, img_url, project_link }) =>
              `{ title: "${title}", category: "${category}", img_id: "${img_id}", img_url: "${img_url}", project_link: "${project_link}" }`
          )
          .join(",\n        ")}
      ]
    }
  ) {
    arikTemplate {
      work {
        id
        project_link
        title
        category
        img_url
        img_id
      }
    }
  }
}`;

  return await fetcher(mutation);
};

export const changeProcessSection = async (
  workSteps: WorkSteps
): Promise<WorkStepsData> => {
  const { decodedToken } = getToken();

  const mutation = `mutation UpdateProcessDataSection {
  updateUserTemplate(id: "${decodedToken?.userId}", template: {
    process:  {
      process_heading: "${workSteps.process_heading}",
      process_paragraph: "${workSteps.process_paragraph}",
      steps: [
      ${workSteps.steps
        .map(
          ({ step_heading, step_subheading, step_paragraph, step_points }) =>
            `{ step_heading: "${step_heading}", step_subheading: "${step_subheading}", step_paragraph: "${step_paragraph}", step_points: [${step_points.map((point) => `"${point}"`).join(", ")}] }`
        )
        .join(",\n        ")}
      ]
    }
  }) {
    arikTemplate {
        process {
          process_heading
          process_paragraph
          steps {
            step_heading
            step_subheading
            step_paragraph
            step_points
          }
        }
      }
    }
  }`;

  return await fetcher(mutation);
};

export const changeTestimonialsSectionHeading = async (
  testimonials_heading: string
): TestimonialData => {
  const { decodedToken } = getToken();

  const mutation = `mutation ChangeTestimonialsData {
  updateUserTemplate(id: "${decodedToken?.userId}", template: {
    testimonials:  {
      testimonials_heading: "${testimonials_heading}"
    }
  }) {
    arikTemplate {
      testimonials {
        __typename
      }
    }
  }
}`;

  return await fetcher(mutation);
};

export const changeTestimonialsSectionParagraph = async (
  testimonials_paragraph: string
): TestimonialData => {
  const { decodedToken } = getToken();

  const mutation = `mutation ChangeTestimonialsData {
  updateUserTemplate(id: "${decodedToken?.userId}", template: {
    testimonials:  {
      testimonials_paragraph: "${testimonials_paragraph}"
    }
  }) {
    arikTemplate {
      testimonials {
        __typename
      }
    }
  }
}`;

  return await fetcher(mutation);
};

export const changeTestimonialsSection = async (
  testimonials: Testimonial[]
): TestimonialData => {
  const {
    decodedToken,
  } = getToken();

  const mutation = `mutation ChangeTestimonialsData {
  updateUserTemplate(id: "${decodedToken?.userId}", template: {
    testimonials:  {
      testimonials: [
      ${testimonials
        .map(
          ({
            testimonial_heading,
            testimonial_paragraph,
            testimonial_client,
          }) =>
            `{ testimonial_heading: "${testimonial_heading}", testimonial_paragraph: "${testimonial_paragraph}", testimonial_client: { client_name: "${testimonial_client.client_name}", client_company: "${testimonial_client.client_company}", client_img_url: "${testimonial_client.client_img_url}", client_img_id: "${testimonial_client.client_img_id}" } }`
        )
        .join(",\n        ")}
      ]
    }
  }) {
    arikTemplate {
      testimonials {
        __typename
      }
    }
  }
}`;

  return await fetcher(mutation);
};

export const changeFooterHeading = async (
  footer_heading: string
): TestimonialData => {
  const { decodedToken } = getToken();

  const mutation = `mutation ChangeFooterHeading {
  updateUserTemplate(id: "${decodedToken?.userId}", template: {
    footer:  {
      footer_heading: "${footer_heading}"
    }
  }) {
    arikTemplate {
      footer {
        __typename
      }
    }
  }
}`;

  return fetcher(mutation);
};

export const changeFooterParagraph = async (
  footer_paragraph: string
): TestimonialData => {
  const {
    decodedToken,
  } = getToken();

  const mutation = `mutation ChangeFooterParagraph {
  updateUserTemplate(id: "${decodedToken?.userId}", template: {
    footer:  {
      footer_paragraph: "${footer_paragraph}"
    }
  }) {
    arikTemplate {
      footer {
        __typename
      }
    }
  }
}`;

  return fetcher(mutation);
};
