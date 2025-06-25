import {Link} from "../components/Link/Link";
import { TabsType} from "../components/Tabs/Tabs.types";

export function render(query, block) {
  const root = document.querySelector(query);
  root.appendChild(block.getContent());
  return root;
}

export const getTabs = (tabs: TabsType, handleClick: (id: string) => void) => Object.keys(tabs).reduce((finalObj, tabKey) => {
  const {title, id, href} = tabs[tabKey];

  return {
    ...finalObj,
    [tabKey]: new Link({
      href,
      id,
      title,
      onClick: () => handleClick(id),
    }),
    tabs: [...finalObj.tabs, tabKey],
  }
}, {tabs: []});
