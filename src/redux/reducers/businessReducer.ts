import {
  GET_ALL_ECOSYSTEM,
  GET_ALL_ORGANIZATION,
  GET_ALL_SUB_ECOSYSTEM,
} from "../constants";

const initialState = {
  ecosystem: [],
  subEcosystem: [],
  organization: [],
  segments: [
    {
      name: "Business Support",
      description:
        "Organizations providing support services that enable businesses grow",
      sub_class: [
        {
          name: "Business Advisory",
          description: "",

          sub_class: ["Mentoring", "Legal", "Tax", "HR", "Book-Keeping"],
        },
        {
          name: "Incubators",
          description: "",

          sub_class: [],
        },
        {
          name: "Accelerators",
          description: "",

          sub_class: [],
        },
      ],
    },
    {
      name: "Training",
      description:
        "Organizations providing entrepreneurship training for businesses",
      sub_class: [
        {
          name: "Enterprise Support Organizations",
          description: "",

          sub_class: [],
        },
        {
          name: "Incubators",
          description: "",

          sub_class: [],
        },
        {
          name: "Accelerators",
          description: "",

          sub_class: [],
        },
        {
          name: "Virtual Learning",
          description: "",

          sub_class: [],
        },
        {
          name: "Skill Based Training",
          description: "",

          sub_class: [],
        },
      ],
    },

    {
      name: "Funding",
      description:
        "Organizations providing funds to support business growth and/or expansion",
      sub_class: [
        {
          name: "Loan Providers",
          description: "",

          sub_class: [],
        },
        {
          name: "Grant Providers",
          description: "",

          sub_class: [],
        },
        {
          name: "Equity Funders ",
          description: "",

          sub_class: [],
        },
      ],
    },

    {
      name: "Market Access",
      description:
        "Organizations or platforms enabling businesses gain access to new or more customers",
      sub_class: [
        {
          name: "Organizations",
          description:
            "Organizations that expose businesses to new or more customers",
          sub_class: [],
        },
        {
          name: "Tech Platforms",
          description:
            "Tech platforms that connect businesses with potential customers",
          sub_class: [],
        },
      ],
    },

    {
      name: "Research & Development",
      description:
        "Organizations involved in entrepreneurship research, innovation and design",
      sub_class: [
        {
          name: "Makerspaces",
          description:
            "organizations that enable collaboration between engineers and entrepreneurs to fabricate machinery for businesses",
          sub_class: [],
        },
        {
          name: "Reserch Centers",
          description: "Organizations that carry out research",
          sub_class: [],
        },

        {
          name: "Innovation and Design Spaces",
          description:
            "Organizations specializing in hardware and software that help business operations",
          sub_class: [],
        },
      ],
    },

    {
      name: "Policy and Regulation",
      description:
        "Organizations involved in entrepreneurship policy design, review or implementation, regulatory organizations, policy advocacy organizations etc.",
      sub_class: [
        {
          name: "Government",
          description: "Ministries, Parastatals etc",
          sub_class: [],
        },
        {
          name: "Regulators",
          description: "",
          sub_class: [],
        },

        {
          name: "Entrepreneurship Advocacy Groups/Think-tanks",
          description: "",
          sub_class: [],
        },
      ],
    },

    {
      name: "Resources",
      description:
        "Organizations that provide or host resources that businesses need on their entrepreneurship journey",
      sub_class: [
        {
          name: "Virtual Resources",
          description: "",
          sub_class: [],
        },
        {
          name: "In-Person Resources",
          description: "",
          sub_class: [],
        },
      ],
    },

    {
      name: "MSMEs and Startups",
      description: "",
      sub_class: [],
    },
  ],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_ECOSYSTEM:
      return {
        ...state,
        ecosystem: payload,
      };

    case GET_ALL_SUB_ECOSYSTEM:
      return {
        ...state,
        subEcosystem: payload,
      };

    case GET_ALL_ORGANIZATION:
      return {
        ...state,
        organization: payload,
      };

    default:
      return state;
  }
};
