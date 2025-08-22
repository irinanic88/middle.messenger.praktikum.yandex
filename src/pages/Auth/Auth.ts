import { Link } from '../../components/Link/Link';
import Block from '../../core/Block';
import { Form } from '../../core/Form';
import { AuthPropsType, AuthTab } from '../../types/componentProps.types';
import { initialFormSignIn, initialFormSignUp } from '../../utils/constants';

const template = `
<div class="auth">
  <div class="auth__tabs tabs">
    <span class="tabs__titles">
      {{{SignInLink}}}
      {{{SignUpLink}}}
    </span>

    <div class="tabs__content">
       {{#if signIn}}
        {{{SignIn}}}
       {{/if}}
       {{#if signUp}}
        {{{SignUp}}}
       {{/if}}
    </div>
  </div>
</div>
`;

export class Auth extends Block<AuthPropsType> {
  constructor(props: {activeTab: AuthTab, onAuthSubmit: () => void}) {
    const { activeTab, onAuthSubmit } = props;

    super({
      SignIn: new Form({
        formName: 'sign-in-form',
        initialForm: initialFormSignIn,
        onSubmit: (form) => {
          console.log('SIGN IN form submitted', form);
          onAuthSubmit();
        },
        requiredFields: Object.keys(initialFormSignIn),
        submitButton: { title: 'Enter' },
      }),
      SignInLink: new Link({
        active: true,
        href: '#',
        id: 'signIn',
        onClick: () => this.handleLinkClick('signIn'),
        title: 'Sign In',
      }),
      SignUp: new Form({
        formName: 'sign-up-form',
        initialForm: initialFormSignUp,
        onSubmit: (form) => {
          console.log('SIGN UP form submitted', form);
          onAuthSubmit();
        },
        requiredFields: Object.keys(initialFormSignUp),
        submitButton: { title: 'Submit and enter' },
      }),
      SignUpLink: new Link({
        href: '#',
        id: 'signUp',
        onClick: () => this.handleLinkClick('signUp'),
        title: 'Sign Up',
      }),
      activeTab,
      signIn: activeTab === 'signIn',
      signUp: activeTab === 'signUp',
    });
  }

  render(): string {
    return template;
  }

  handleLinkClick(id: AuthTab) {
    this.setProps({
      activeTab: id,
      signIn: id === 'signIn',
      signUp: id === 'signUp',
    });
    this.children.SignInLink.setProps({ active: id === 'signIn' });
    this.children.SignUpLink.setProps({ active: id === 'signUp' });
  }
}
