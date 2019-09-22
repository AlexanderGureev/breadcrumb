import React from "react";

export type Props = {
  routerStack: RouterStackState | undefined;
  channels: Channel[] | undefined;
  project: DictionaryProject | undefined;
};

export type LinkObject = {
  name: string;
  params: {
    [key: string]: string | object;
  };
};

export type RouterStackState = {
  screen: LinkObject | undefined;
  modals: LinkObject[] | undefined;
};

export type Crumb = {
  label: string;
  linkObject: LinkObject;
};
type Digest = {
  data: { title: string };
};

const digest: Digest = {
  data: {
    title: "Лучшее для детей"
  }
};

export type DictionaryCategories = {
  [key: string]: string;
};
export type DictionaryProject = {
  data: { [key: string]: string };
};
export type Channel = { id: number; title: string; canonicalUrl: string };

export const screens: DictionaryCategories = {
  tvseries: "Сериалы",
  films: "Фильмы",
  shows: "Шоу",
  kids: "Детям",
  online: "Эфир",
  useragreement: "Пользовательское соглашение",
  confidentiality: "Политика конфиденциальности"
};

const createLink = (name: string, params = {}): LinkObject => ({
  name,
  params
});

enum Params {
  PROJECT = "project",
  SEASON = "season",
  TRACK = "track",
  CHANNEL = "channel"
}

const mainCrumb = {
  label: "Главная",
  linkObject: createLink("home")
};

export const BreadCrumbs: React.FC<Props> = ({
  routerStack,
  channels,
  project
}) => {
  const [crumbs, setCrumbs] = React.useState<Crumb[]>(
    routerStack ? createCrumbs(routerStack) : []
  );

  React.useEffect(() => {
    if (!routerStack) return;
    setCrumbs(createCrumbs(routerStack));
  }, [routerStack]);

  function mapScreens(alias: string) {
    if (!screens[alias]) {
      console.warn("Not found screen <BreadCrumbs />");
      return alias;
    }
    return screens[alias];
  }
  function getScreenName(alias: string) {
    return mapScreens(alias);
  }
  function getProjectName(alias: string) {
    if (!project || !project.data || !project.data.alias) return alias;
    return project.data.alias === alias ? project.data.title : alias;
  }
  function getSeasonName(alias: string) {
    return `${alias[0]} сезон`;
  }
  function getTrackName(alias: string) {
    return `${alias[0]} серия`;
  }
  function getChannelName(alias: string) {
    if (!channels) return;
    return channels.find(({ canonicalUrl }) => {
      const channelName = canonicalUrl.split("/").pop();
      return channelName === alias;
    });
  }
  function formatName(key: string, alias: string) {
    switch (key) {
      case Params.PROJECT:
        return getProjectName(alias);
      case Params.SEASON:
        return getSeasonName(alias);
      case Params.TRACK:
        return getTrackName(alias);
      case Params.CHANNEL: {
        const channel = getChannelName(alias);
        if (channel && channel.title) {
          return channel.title;
        }
        return alias;
      }
      default:
        console.warn("Not found path <BreadCrumbs />");
        return alias;
    }
  } //перевод label в нужный формат
  function mapModalsToCrumbs(modals: LinkObject[] | undefined) {
    if (!modals || !modals.length) return [];
    const [lastModalsElement] = modals.slice(-1);

    if (!lastModalsElement.params) return [];

    const keys = Object.keys(lastModalsElement.params);
    let crumbs: Crumb[] = [];

    // обработка modal формата -> { name: string; params: {}}
    if (!keys.length) {
      return [
        createCrumb(lastModalsElement.name, createLink(lastModalsElement.name))
      ];
    }

    // обработка modal формата -> { name: string; params: { [key: string]: string | object } }
    if (keys.length === 1) {
      const [rootPath] = keys;
      const link = lastModalsElement.params[rootPath];

      if (typeof link === "string") {
        const linkParts = link.split("/"); //обработка случая { name: string; params: { [key: string]: "psihologini/1_season/1_seriya" } }
        const linkParamsAcc: string[] = [];
        const keysMap = ["project", "season", "track"];

        crumbs = linkParts.map(
          (partialLink, index): Crumb => {
            linkParamsAcc.push(partialLink);
            const key = rootPath === Params.PROJECT ? keysMap[index] : rootPath;

            return createCrumb(
              formatName(key, partialLink),
              createLink(rootPath, {
                [rootPath]: linkParamsAcc.join("/")
              })
            );
          }
        );
      }
    }

    // обработка modal формата -> { name: string; params: { [key: string]: string | object, ... } }
    if (keys.length > 1) {
      const [rootPath] = keys;
      const linkParamsAcc: string[] = [];

      crumbs = keys.reduce((acc: Crumb[], key: string): Crumb[] => {
        const partialLink = lastModalsElement.params[key];
        if (typeof partialLink !== "string") return acc; //crumb не будет содержать state в link

        linkParamsAcc.push(partialLink);

        return [
          ...acc,
          createCrumb(
            formatName(key, partialLink),
            createLink(rootPath, {
              [rootPath]: linkParamsAcc.join("/")
            })
          )
        ];
      }, []);
    }

    return crumbs;
  }
  function mapScreenToCrumbs(screen: LinkObject | undefined) {
    if (!screen) return [];
    if (screen.name === "home") return []; //пропускаем данный screen т.к мы всегда добавляем mainCrumb

    const paramsKeys = Object.keys(screen.params);
    if (!paramsKeys.length) {
      return [createCrumb(getScreenName(screen.name), createLink(screen.name))];
    }

    return paramsKeys.reduce((acc: Crumb[], key: string) => {
      const partialLink = screen.params[key];
      if (typeof partialLink !== "string") return acc;
      if (key === "digest_id") {
        //обработка раздела подборок, routerStack формируется нестандартно
        return [
          ...acc,
          createCrumb(digest.data.title, createLink(screen.name, screen.params))
        ];
      }

      return [
        ...acc,
        createCrumb(
          getScreenName(partialLink),
          createLink(screen.name, screen.params)
        )
      ];
    }, []);
  }
  function createCrumb(label: string, linkObject: LinkObject): Crumb {
    return {
      label,
      linkObject
    };
  }
  function createCrumbs({ modals, screen }: RouterStackState) {
    return [
      mainCrumb,
      ...mapScreenToCrumbs(screen),
      ...mapModalsToCrumbs(modals)
    ];
  }

  return (
    <div>
      {crumbs.map(({ label, linkObject }, i, arr) => (
        <span key={`crumb-${i}`}>
          {i < arr.length - 1 ? (
            <>
              <a href="#">{label}</a>
              <span>></span>
            </>
          ) : (
            <span>{label}</span>
          )}
        </span>
      ))}
    </div>
  );
};
