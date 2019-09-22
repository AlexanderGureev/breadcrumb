import React, { useEffect, useState } from "react";
import { shallow, mount, render } from "enzyme";
import { BreadCrumbs, Props, Crumb, Channel, DictionaryProject } from "./index";
import { mockRouterStack } from "./__mock__/routerStack";
import { create } from "react-test-renderer";

describe("BreadCrumbs", () => {
  let wrapper: any;

  const setState = jest.fn();
  const useStateSpy = jest
    .spyOn(React, "useState")
    .mockImplementation(state => [state, setState]);

  const useEffect = jest.fn();
  const useEffectSpy = jest
    .spyOn(React, "useEffect")
    .mockImplementation(useEffect);

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

  beforeEach(() => {
    const [routerStack] = mockRouterStack;
    wrapper = mount(
      <BreadCrumbs
        routerStack={routerStack}
        project={project}
        channels={channels}
      />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("BreadCrumbs renders correctly", () => {
    const [routerStack] = mockRouterStack;
    const tree = create(
      <BreadCrumbs
        routerStack={routerStack}
        project={project}
        channels={channels}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("first call to useState returns a tuple [[], setState]", () => {
    const crumbsResult = [
      { label: "Главная", linkObject: { name: "home", params: {} } },
      {
        label: "Сериалы",
        linkObject: { name: "category", params: { category: "tvseries" } }
      },
      {
        label: "Психологини",
        linkObject: { name: "project", params: { project: "psihologini" } }
      },
      {
        label: "1 сезон",
        linkObject: {
          name: "project",
          params: { project: "psihologini/1_season" }
        }
      }
    ];
    expect(useStateSpy).toHaveBeenCalledTimes(1);
    expect(useStateSpy.mock.results[0].value).toMatchObject([
      crumbsResult,
      setState
    ]);
  });

  test("call useEffect for the first time", () => {
    expect(useEffectSpy).toHaveBeenCalledTimes(1);
  });

  test("useEffect is called when updating routerStack", () => {
    const [, secondRouterStack] = mockRouterStack;
    wrapper.setProps({ routerStack: secondRouterStack });
    expect(useEffectSpy).toHaveBeenCalledTimes(2);
  });

  describe("routerStack", () => {
    beforeEach(() => {
      useEffectSpy.mockRestore();
    });

    test("routerStack - home -> tvseries -> project -> season", () => {
      const routerStack = mockRouterStack[0];
      const crumbsResult = [
        { label: "Главная", linkObject: { name: "home", params: {} } },
        {
          label: "Сериалы",
          linkObject: { name: "category", params: { category: "tvseries" } }
        },
        {
          label: "Психологини",
          linkObject: { name: "project", params: { project: "psihologini" } }
        },
        {
          label: "1 сезон",
          linkObject: {
            name: "project",
            params: { project: "psihologini/1_season" }
          }
        }
      ];

      wrapper = mount(
        <BreadCrumbs
          routerStack={routerStack}
          project={project}
          channels={channels}
        />
      );
      expect(setState).lastCalledWith(crumbsResult);
    });
    test("routerStack - home -> online -> channel", () => {
      const routerStack = mockRouterStack[1];
      const crumbsResult = [
        { label: "Главная", linkObject: { name: "home", params: {} } },
        {
          label: "Эфир",
          linkObject: { name: "online", params: {} }
        },
        {
          label: "Россия-1",
          linkObject: { name: "channel", params: { channel: "russia1_hd" } }
        }
      ];

      wrapper = mount(
        <BreadCrumbs
          routerStack={routerStack}
          project={project}
          channels={channels}
        />
      );
      expect(setState).lastCalledWith(crumbsResult);
    });
    test("routerStack - home -> tvseries -> project", () => {
      const routerStack = mockRouterStack[2];
      const crumbsResult = [
        { label: "Главная", linkObject: { name: "home", params: {} } },
        {
          label: "Сериалы",
          linkObject: { name: "category", params: { category: "tvseries" } }
        },
        {
          label: "Психологини",
          linkObject: { name: "project", params: { project: "psihologini" } }
        }
      ];

      wrapper = mount(
        <BreadCrumbs
          routerStack={routerStack}
          project={project}
          channels={channels}
        />
      );
      expect(setState).lastCalledWith(crumbsResult);
    });
    test("routerStack - home -> tvseries -> project -> season -> seriya", () => {
      const routerStack = mockRouterStack[3];
      const crumbsResult = [
        { label: "Главная", linkObject: { name: "home", params: {} } },
        {
          label: "Сериалы",
          linkObject: { name: "category", params: { category: "tvseries" } }
        },
        {
          label: "Психологини",
          linkObject: { name: "project", params: { project: "psihologini" } }
        },
        {
          label: "1 сезон",
          linkObject: {
            name: "project",
            params: { project: "psihologini/1_season" }
          }
        },
        {
          label: "1 серия",
          linkObject: {
            name: "project",
            params: { project: "psihologini/1_season/1_seriya" }
          }
        }
      ];

      wrapper = mount(
        <BreadCrumbs
          routerStack={routerStack}
          project={project}
          channels={channels}
        />
      );
      expect(setState).lastCalledWith(crumbsResult);
    });
    test("routerStack - home -> compilation (widgets)", () => {
      const routerStack = mockRouterStack[4];
      const crumbsResult = [
        { label: "Главная", linkObject: { name: "home", params: {} } },
        {
          label: "Лучшее для детей",
          linkObject: { name: "widgets.digest_id", params: { digest_id: "87" } }
        }
      ];

      wrapper = mount(
        <BreadCrumbs
          routerStack={routerStack}
          project={project}
          channels={channels}
        />
      );
      expect(setState).lastCalledWith(crumbsResult);
    });
    test("routerStack - home -> compilation (widgets) -> film/tvserial", () => {
      const project: DictionaryProject = {
        data: {
          title: "Три богатыря и Наследница престола",
          alias: "tri_bogatyrya_i_naslednitsa_prestola"
        }
      };

      const routerStack = mockRouterStack[5];
      const crumbsResult = [
        { label: "Главная", linkObject: { name: "home", params: {} } },
        {
          label: "Лучшее для детей",
          linkObject: { name: "widgets.digest_id", params: { digest_id: "87" } }
        },
        {
          label: "Три богатыря и Наследница престола",
          linkObject: {
            name: "project",
            params: { project: "tri_bogatyrya_i_naslednitsa_prestola" }
          }
        }
      ];

      wrapper = mount(
        <BreadCrumbs
          routerStack={routerStack}
          project={project}
          channels={channels}
        />
      );
      expect(setState).lastCalledWith(crumbsResult);
    });
    test("routerStack - home -> film/tvserial", () => {
      const project: DictionaryProject = {
        data: {
          title: "Влечение",
          alias: "vlechenie"
        }
      };

      const routerStack = mockRouterStack[6];
      const crumbsResult = [
        { label: "Главная", linkObject: { name: "home", params: {} } },
        {
          label: "Влечение",
          linkObject: {
            name: "project",
            params: { project: "vlechenie" }
          }
        }
      ];

      wrapper = mount(
        <BreadCrumbs
          routerStack={routerStack}
          project={project}
          channels={channels}
        />
      );
      expect(setState).lastCalledWith(crumbsResult);
    });
    test("routerStack - home -> useragreement", () => {
      const routerStack = mockRouterStack[7];
      const crumbsResult = [
        { label: "Главная", linkObject: { name: "home", params: {} } },
        {
          label: "Пользовательское соглашение",
          linkObject: {
            name: "useragreement",
            params: {}
          }
        }
      ];

      wrapper = mount(
        <BreadCrumbs
          routerStack={routerStack}
          project={project}
          channels={channels}
        />
      );
      expect(setState).lastCalledWith(crumbsResult);
    });
    test("routerStack { screen: undefined, modals: undefined }", () => {
      const routerStack = mockRouterStack[8];
      const crumbsResult = [
        { label: "Главная", linkObject: { name: "home", params: {} } }
      ];

      wrapper = mount(
        <BreadCrumbs
          routerStack={routerStack}
          project={project}
          channels={channels}
        />
      );
      expect(setState).lastCalledWith(crumbsResult);
    });
    test("routerStack - home -> tvseries -> project -> season -> seriya ({ project: 'psihologini/1_season/1_seriya' })", () => {
      const routerStack = mockRouterStack[9];
      const crumbsResult = [
        { label: "Главная", linkObject: { name: "home", params: {} } },
        {
          label: "Сериалы",
          linkObject: { name: "category", params: { category: "tvseries" } }
        },
        {
          label: "Психологини",
          linkObject: { name: "project", params: { project: "psihologini" } }
        },
        {
          label: "1 сезон",
          linkObject: {
            name: "project",
            params: { project: "psihologini/1_season" }
          }
        },
        {
          label: "1 серия",
          linkObject: {
            name: "project",
            params: { project: "psihologini/1_season/1_seriya" }
          }
        }
      ];

      wrapper = mount(
        <BreadCrumbs
          routerStack={routerStack}
          project={project}
          channels={channels}
        />
      );
      expect(setState).lastCalledWith(crumbsResult);
    });
    test("routerStack - home -> confidentiality", () => {
      const routerStack = mockRouterStack[10];
      const crumbsResult = [
        { label: "Главная", linkObject: { name: "home", params: {} } },
        {
          label: "Политика конфиденциальности",
          linkObject: {
            name: "confidentiality",
            params: {}
          }
        }
      ];

      wrapper = mount(
        <BreadCrumbs
          routerStack={routerStack}
          project={project}
          channels={channels}
        />
      );
      expect(setState).lastCalledWith(crumbsResult);
    });
    test("routerStack is undefined", () => {
      useStateSpy.mockClear();

      wrapper = mount(
        <BreadCrumbs
          routerStack={undefined}
          project={project}
          channels={channels}
        />
      );
      expect(useStateSpy).toHaveBeenCalledTimes(1);
      expect(useStateSpy.mock.results[0].value).toMatchObject([[], setState]);
    });
  });
});
