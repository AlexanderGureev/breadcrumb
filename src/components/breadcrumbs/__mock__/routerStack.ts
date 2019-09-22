import { RouterStackState } from "..";

const routerStack: RouterStackState = {
  screen: {
    name: "category",
    params: { category: "tvseries" }
  },
  modals: [
    {
      name: "project",
      params: { project: "psihologini/1_season" }
    }
  ]
};
const routerStack2: RouterStackState = {
  screen: {
    name: "online",
    params: {}
  },
  modals: [{ name: "online.channel", params: { channel: "russia1_hd" } }]
};
const routerStack3: RouterStackState = {
  screen: {
    name: "category",
    params: { category: "tvseries" }
  },
  modals: [{ name: "project", params: { project: "psihologini" } }]
};
const routerStack4: RouterStackState = {
  screen: {
    name: "category",
    params: { category: "tvseries" }
  },
  modals: [
    {
      name: "project.seria",
      params: {
        project: "psihologini",
        season: "1_season",
        track: "1_seriya",
        state: { autoPlay: 1 }
      }
    }
  ]
};
const routerStack5: RouterStackState = {
  screen: {
    name: "widgets.digest_id",
    params: { digest_id: "87" }
  },
  modals: []
};
const routerStack6: RouterStackState = {
  screen: {
    name: "widgets.digest_id",
    params: { digest_id: "87" }
  },
  modals: [
    {
      name: "project",
      params: { project: "tri_bogatyrya_i_naslednitsa_prestola" }
    }
  ]
};
const routerStack7: RouterStackState = {
  screen: {
    name: "home",
    params: {}
  },
  modals: [
    {
      name: "project",
      params: { project: "vlechenie" }
    }
  ]
};
const routerStack8: RouterStackState = {
  screen: {
    name: "useragreement",
    params: {}
  },
  modals: undefined
};
const routerStack9: RouterStackState = {
  screen: undefined,
  modals: undefined
};
const routerStack10: RouterStackState = {
  screen: {
    name: "category",
    params: { category: "tvseries" }
  },
  modals: [
    {
      name: "project",
      params: { project: "psihologini/1_season/1_seriya" }
    }
  ]
};
const routerStack11: RouterStackState = {
  screen: {
    name: "confidentiality",
    params: {}
  },
  modals: undefined
};

export const mockRouterStack = [
  routerStack,
  routerStack2,
  routerStack3,
  routerStack4,
  routerStack5,
  routerStack6,
  routerStack7,
  routerStack8,
  routerStack9,
  routerStack10,
  routerStack11
];
