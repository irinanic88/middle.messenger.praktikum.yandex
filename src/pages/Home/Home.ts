import Block from "../../core/Block";
import {Button} from "../../components/Button/Button";
import {render} from "../../utils/helpers";

const template = `
<main class="main">
  <nav>
    <ul class="main__links">
    {{mainProp}}
    {{{button}}}
    </ul>
  </nav>
</main>
`;
class Home extends Block<any> {
  constructor(props) {
    super("div", {
      ...props,
    button: new Button({
        name: props.name,
        classList: ['button', 'button_primary'],
      })
    });
  }


  protected componentDidUpdate(oldProps, newProps): boolean {
    if (oldProps.name !== newProps.name) {
      this.children.button.setProps({name: newProps.name});
    }

    return true;
  }

  render(): DocumentFragment {
    this.children.button = new Button({
      name: this.props.name,
      classList: ['button', 'button_primary']
    });

    return this.compile(template, {
      button: this.children.button,
      mainProp: this.props.mainProp,
    });
  }
}

const home = new Home({
  name: 'Butt',
  mainProp: 'Ablablablabla',
});

// setTimeout(() => {
//   home.setProps({ name: 'Изменённая кнопка' });
// }, 2000);

render('.app', home);



