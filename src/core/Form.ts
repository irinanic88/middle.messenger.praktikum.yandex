import Block from './Block';
import { Validator } from './Validator';
import { Alert } from '../components/Alert/Alert';
import { Button } from '../components/Button/Button';
import {
  ActionButtonProps,
  FormBlockProps, FormKeys,
  FormType,
  SubmitButtonProps,
  ValidatorKeys,
} from '../types/common.types';
import { ButtonProps, ButtonPropsType } from '../types/componentProps.types';
import {
  allRequiredFieldsFilled, formValuesChanged,
  generateTextInputs,
  isObjectEmpty,
  noErrors, prepareFormValues, prepareSubmitData,
} from '../utils/helpers';

const template = `
  <div class="form-container">
    <form class="form" name="{{formName}}">
      <div class="form__inputs">
        {{#each inputKeys}}
          {{{lookup ../this this}}}
        {{/each}}
      </div>
      <div class="form__actions">
          {{{SubmitButton}}}
          {{#each formActionsKeys}}
            {{{lookup ../this this}}}
          {{/each}}
      </div>
    </form>
    {{#if showAlert}}
      {{{Alert}}}
    {{/if}}
  </div>
`;

export class Form extends Block<FormBlockProps> {
  private formValues: Record<string, string>;
  private errors: Record<string, string[]> = {};

  constructor(props: {
    initialForm: FormType;
    formName: string;
    inputKeys?: string[];
    arrayValues?: string[];
    requiredFields?: string[];
    onSubmit?: (values?: FormType) => void;
    submitButton: SubmitButtonProps;
    actionButtons?: ActionButtonProps[];
    submitHandler?: () => void;
  }) {
    const {
      actionButtons,
      initialForm,
      submitButton,
      onSubmit,
      requiredFields,
      formName,
    } = props;
    const { formValues, arrayValues } = prepareFormValues(initialForm);

    const handleInputChange = (field: string, value: string) => {
      formValues[field] = value;
    };

    const handleBlur = (field: FormKeys, value: string) => {
      const validator = Validator[field as ValidatorKeys];

      if (typeof validator !== 'function') return true;

      const result = validator.call(Validator, value);

      if (Array.isArray(result)) {
        this.errors[field] = result;
        this.setProps({ showAlert: true });
        this.setProps({});

        return false;
      }

      if (this.errors[field]) {
        delete this.errors[field];
        this.setProps({ showAlert: Object.keys(this.errors).length > 0 });
        this.setProps({});
      }

      return true;
    };

    const inputs = generateTextInputs(
      formValues,
      handleInputChange,
      handleBlur,
      requiredFields as FormKeys[] | undefined,
    );
    const inputKeys = Object.keys(inputs);

    const btnProps: ButtonProps = {
      ...(submitButton as Partial<ButtonPropsType>),
      onClick: () => {
        this.submitHandler();
      },
      type: 'submit',
    };

    const formActions = actionButtons?.reduce((acc, actionProps, index) => ({
      ...acc,
      [`action-btn_${index}`]: new Button(actionProps),
    }), {});
    const formActionsKeys = formActions ? Object.keys(formActions) : [];

    super({
      ...inputs,
      ...formActions,
      SubmitButton: new Button(btnProps),
      arrayValues,
      formActionsKeys,
      formName,
      initialForm,
      inputKeys,
      onSubmit,
      requiredFields,
      showAlert: false,
      submitButton,
    });

    this.formValues = formValues;
  }

  render() {
    return template;
  }

  componentDidUpdate(oldProps: FormBlockProps) {
    if (oldProps.initialForm !== this.props.initialForm) {
      const { formValues, arrayValues } = prepareFormValues(this.props.initialForm);

      const inputs = generateTextInputs(
        formValues,
        (field, value) => { this.formValues[field] = value },
        undefined,
        Object.keys(this.props.initialForm) as FormKeys[],
      );

      Object.entries(inputs).forEach(([key, inputBlock]) => {
        this.children[key] = inputBlock;
      });

      this.setProps({
        arrayValues,
        inputKeys: Object.keys(inputs),
      });

      this.formValues = formValues;
      this.errors = {};
    }

    if (this.props.showAlert) {
      const alertProps = !isObjectEmpty(this.errors)
        ? { errors: this.errors }
        : { customErrors: { Form: 'Required fields should not be empty' } };

      this.children.Alert = new Alert(alertProps);
    }

    return true;
  }

  private submitHandler() {
    if (!noErrors(this.errors)) {
      this.setProps({ showAlert: true });

      return;
    }

    if (!allRequiredFieldsFilled(this.formValues, this.props.requiredFields)) {
      this.setProps({ showAlert: true });

      return;
    }

    const { formValues: initialFormValues } = prepareFormValues(this.props.initialForm);

    if (!formValuesChanged(this.formValues, initialFormValues)) {
      return;
    }

    const submitData = this.props.arrayValues ? prepareSubmitData(this.formValues, this.props.arrayValues) : this.formValues;

    this.props.onSubmit?.(submitData);

    this.formValues = initialFormValues;

    Object.entries(this.formValues).forEach(([key, value]) => {
      if (this.children[key]) {
        this.children[key].setProps({ value });
      }
    });

    this.errors = {};
    this.setProps({ showAlert: false });
    this.setProps({});
  }
}

