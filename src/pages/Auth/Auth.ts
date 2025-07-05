import Block from "../../core/Block";
import {Tabs} from "../../components/Tabs/Tabs";
import {getTabs} from "../../utils/helpers";
import {appTabs} from "../../utils/constants";
import '../../components/Tabs/Tabs.css';
import './Auth.css';

const template = `
<div class="auth">
  <div class="auth__tabs tabs">
    <span class="tabs__titles">
      {{{signIn}}}
      {{{signUp}}}
    </span>
    
    <div class="tabs__content">
      {{{Tabs}}}
    </div>
  </div>
</div>
`;

export class Auth extends Block {
  constructor(props) {
    const activeTab = props.activeTab;

    super( {
      ...getTabs(appTabs, (newVal) => this.componentDidUpdate(activeTab, newVal)),
      Tabs: new Tabs({[activeTab]: true}),
      activeTab,
    });

  }

  render(): string {
    return template;
  }
}



