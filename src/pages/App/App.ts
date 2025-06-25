import Block from "../../core/Block";
import {Tabs} from "../../components/Tabs/Tabs";
import {getTabs, render} from "../../utils/helpers";
import {appTabs} from "../../utils/constants";
import './App.css';

const template = `
<div class="app">
  <div class="app__tabs tabs">
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

class App extends Block {
  constructor(props: { activeTab: string }) {
    super( {
      ...getTabs(appTabs, (newVal) => this.componentDidUpdate(props.activeTab, newVal)),
      Tabs: new Tabs({[props.activeTab]: true}),
      activeTab: props.activeTab,
    });

  }

  componentDidUpdate(oldProps, newProps) {
    if (oldProps !== newProps) {
      console.log('I am here and the tab is updating...almost', this.props);

      // this.setProps({...this.props, activeTab: newProps})
    }
    return true
  }

  render(): string {
    return template;
  }
}

const app = new App({
  activeTab: 'signUp',
});

render('#app', app);



