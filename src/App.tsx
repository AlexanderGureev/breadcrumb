import React from "react";
import {
  BreadCrumbs,
  DictionaryProject,
  Channel
} from "./components/breadcrumbs";
import { RouterStackState } from "./components/breadcrumbs";

const project: DictionaryProject = {
  data: {
    title: "Психологини",
    alias: "psihologini"
  }
};

const channels: Channel[] = [
  { id: 1, title: "Первый канал", canonicalUrl: "/online/1tv" },
  { id: 2, title: "Россия-1", canonicalUrl: "/online/russia1_hd" }
];

const routerStack: RouterStackState = {
  screen: {
    name: "category",
    params: { category: "tvseries" }
  },
  modals: [
    { name: "project", params: { project: "psihologini" } },
    {
      name: "project.seria",
      params: {
        project: "psihologini",
        season: "1_season",
        track: "1_seriya"
      }
    },
    {
      name: "project",
      params: {
        project: "psihologini",
        season: "1_season"
      }
    },
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

const App: React.FC = () => {
  return (
    <div className="App">
      <BreadCrumbs
        routerStack={routerStack}
        project={project}
        channels={channels}
      />
      <BreadCrumbs
        routerStack={routerStack2}
        project={project}
        channels={channels}
      />
      <BreadCrumbs
        routerStack={routerStack3}
        project={project}
        channels={channels}
      />
      <BreadCrumbs
        routerStack={routerStack4}
        project={project}
        channels={channels}
      />
      <BreadCrumbs
        routerStack={routerStack5}
        project={project}
        channels={channels}
      />
      <BreadCrumbs
        routerStack={routerStack6}
        project={project}
        channels={channels}
      />
      <BreadCrumbs
        routerStack={routerStack7}
        project={project}
        channels={channels}
      />
      <BreadCrumbs
        routerStack={routerStack8}
        project={project}
        channels={channels}
      />
      <BreadCrumbs
        routerStack={routerStack9}
        project={project}
        channels={channels}
      />
      <BreadCrumbs
        routerStack={routerStack10}
        project={project}
        channels={channels}
      />
      <BreadCrumbs
        routerStack={routerStack11}
        project={project}
        channels={channels}
      />
    </div>
  );
};

export default App;
