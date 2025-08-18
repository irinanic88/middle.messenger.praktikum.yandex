import Block from '../../core/Block';
import { Form } from '../../core/Form';
import { UserType } from '../../types/api.types';
import { FormType } from '../../types/common.types';
import { ProfileDialogProps } from '../../types/componentProps.types';
import { initialFormEditProfile as initialForm } from '../../utils/constants';
import { prepareInitialFormEditProfile } from '../../utils/helpers';
import { Avatar } from '../Avatar/Avatar';
import { Button } from '../Button/Button';
import { UploadImageInput } from '../UploadImageInput/UploadImageInput';

const template = `
  <main class="dialog">
    <div class="dialog__container">
      <div class="profile-dialog">
        <div class="profile-dialog__left">
            <div class="profile-dialog__avatar">
              {{{Avatar}}}
              {{#if (not isFileUploaded)}}
                {{{UploadAvatarButton}}}
              {{/if}}

              {{#if isFileUploaded}}
                <div class="profile-dialog__edit-avatar-actions">
                  {{{BackButton}}}
                  {{{SaveUploadedAvatarButton}}}
                </div>
              {{/if}}
            </div>
        </div>

        <div class="profile-dialog__right">
          <div class='profile-dialog__right-container'>
            {{#if (not isEditUserInfo) }}
              <div class="profile-dialog__profile-info">
                <ul class='profile-dialog__info-list'>
                  <li><span>First name:</span><span>{{name}}</span></li>
                  <li><span>Surname:</span><span>{{surname}}</span></li>
                  <li><span>Display name:</span><span>{{displayName}}</span></li>
                  <li><span>Email:</span><span>{{email}}</span></li>
                  <li><span>Phone number:</span><span>{{phone}}</span></li>
                  <li><span>Login:</span><span>{{login}}</span></li>
                </ul>
                {{{EditUserInfoButton}}}
              </div>
            {{/if}}

            {{#if isEditUserInfo}}
              <div class="profile-dialog__profile-info">
                {{{EditUserInfo}}}
              </div>
            {{/if}}
          </div>

          <div class='profile-dialog__right-container'>
            {{#if (not isEditPassword)}}
              {{{EditPasswordButton}}}
            {{/if}}

            {{#if isEditPassword}}
              {{{EditPassword}}}
            {{/if}}
          </div>
        </div>
      </div>

      {{{CloseButton}}}
      {{{CloseButtonAction}}}
    </div>
  </main>
`;

export default class ProfileDialog extends Block<ProfileDialogProps> {
  constructor(props: {
    user: UserType,
    closeDialog: () => void,
  }) {
    const {
      first_name,
      second_name,
      display_name,
      email,
      phone,
      password,
      login,
      avatar,
    } = props.user;

    super({
      ...props,
      Avatar: new Avatar({
        classList: ['avatar__big'],
        isUser: true,
        src: avatar,
      }),
      BackButton: new Button({
        onClick: () => this.handleAvatarUploadCancel(),
        title: 'Back',
      }),
      CloseButton: new Button({
        classList: ['dialog__close-btn'],
        iconSolo: '/icons/close_icon.png',
        onClick: () => props.closeDialog(),
      }),
      CloseButtonAction: new Button({
        classList: ['profile-dialog__action-btn'],
        onClick: () => props.closeDialog(),
        title: 'Close',
      }),
      EditPassword: new Form({
        actionButtons: [{
          onClick: () => this.setProps({ isEditPassword: false }),
          title: 'Cancel',
        }],
        formName: 'edit-password-form',
        initialForm: {
          oldPassword: password,
          newPassword: '',
        },
        onSubmit: (form: FormType) => this.handlePasswordSaveClick(form),
        requiredFields: ['oldPassword', 'newPassword'],
        submitButton: {
          title: 'Save',
        },
      }),
      EditPasswordButton: new Button({
        classList: ['profile-dialog__action-btn-left'],
        onClick: () => this.setProps({ isEditPassword: true }),
        title: 'Edit password',
      }),
      EditUserInfo: new Form({
        actionButtons: [{
          classList: ['profile-dialog__action-btn'],
          onClick: () => this.setProps({ isEditUserInfo: false }),
          title: 'Cancel',
        }],
        formName: 'edit-user-info-form',
        initialForm: prepareInitialFormEditProfile(initialForm, props.user),
        onSubmit: (form: FormType) => this.handleUserInfoSaveClick(form),
        requiredFields: Object.keys(initialForm),
        submitButton: {
          classList: ['profile-dialog__action-btn'],
          title: 'Save',
        },
      }),
      EditUserInfoButton: new Button({
        classList: ['profile-dialog__action-btn-left'],
        onClick: () => this.setProps({ isEditUserInfo: true }),
        title: 'Edit profile info',
      }),

      SaveUploadedAvatarButton: new Button({
        onClick: () => this.handleUploadedAvatarSave(),
        title: 'Save',
      }),
      UploadAvatarButton: new UploadImageInput({
        id: 'avatar',
        label: 'Upload avatar',
        onChange: (v: string) => this.handleAvatarUploadChange(v),
      }),
      avatarForm: avatar,
      displayName: display_name,
      email,
      isEditPassword: false,
      isEditUserInfo: false,
      isFileUploaded: false,
      login,

      name: first_name,
      passwordForm: {
        oldPassword: password,
        newPassword: '',
      },

      phone,

      surname: second_name,

      uploadedFile: null,
    });
  }

  render(): string {
    return template;
  }

  handleUserInfoSaveClick(form: FormType) {
    console.log('EDIT USER INFO form submitted', form);

    this.setProps({
      email: form.email as string,
      isEditUserInfo: false,
      login: form.login as string,
      name: form.first_name as string,
      phone: form.phone as string,
      surname: form.second_name as string,
    });
  }

  handlePasswordSaveClick(form: FormType) {
    console.log('EDIT PASSWORD form submitted', form);

    const initialPasswordForm = {
      oldPassword: form.newPassword as string,
      newPassword: '',
    };

    this.setProps({
      isEditPassword: false,
      passwordForm: initialPasswordForm,
    });
    this.children.EditPassword.setProps({ initialForm: initialPasswordForm });
  }

  handleAvatarUploadChange(src: string) {
    this.children.Avatar.setProps({ src });
    this.setProps({isFileUploaded: true, uploadedFile: src});
  }

  handleUploadedAvatarSave() {
    if (this.props.uploadedFile) {
      this.setProps({avatarForm: this.props.uploadedFile, isFileUploaded: false});

      console.log('EDIT AVATAR form submitted', this.props.avatarForm);
    }
  }

  handleAvatarUploadCancel() {
    this.children.Avatar.setProps({ src: this.props.user.avatar });
    this.setProps({isFileUploaded: false, uploadedFile: null});
  }
}
