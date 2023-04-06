interface Control {
  value?: string | Date;
  label?: string;

  selectOptions?: { name: string; value: any }[];
  config?: {
    name?: string;
    type?: string;
    placeholder?: string;
    hint?: string;
    required?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    email?: boolean;
    maxlength?: number;
    minlength?: number;
    pattern?: string;
    mask?: boolean;
    customValidators?: {
      [validatorName: string]: any;
    };
    maskConfig?: {
      mask?: string;
      dropSpecialCharacters?: boolean;
      validation?: boolean;
    };
    dateConfig?: {
      minDate?: Date;
      maxDate?: Date;
    };
    errors?: {
      required?: string;
      minlength?: string;
      maxlength?: string;
      email?: string;
      pattern?: string;
      mask?: string;
      invalidCpf?: string;
      invalidUrl?: string;
    };
  };
}

export class ControlInput implements Control {
  value: string | Date;
  label: string;
  selectOptions: { name: string; value: any }[];

  config: {
    name: string;
    type: string;
    placeholder: string;
    hint: string;
    required: boolean;
    disabled: boolean;
    readonly: boolean;
    email: boolean;
    maxlength: number;
    minlength: number;
    pattern: string;
    mask: boolean;
    customValidators: {
      [validatorName: string]: any;
    };
    maskConfig: {
      mask?: string;
      dropSpecialCharacters?: boolean;
      validation?: boolean;
    };
    dateConfig: {
      minDate?: Date;
      maxDate?: Date;
    };
    errors: {
      required?: string;
      minlength?: string;
      maxlength?: string;
      email?: string;
      pattern?: string;
      mask?: string;
      invalidCpf?: string;
      invalidUrl?: string;
    };
  };
  constructor(args: Control) {
    this.value = args.value || '';
    this.label = args.label || '';
    this.selectOptions = args.selectOptions || [];
    this.config = {
      name: args.config?.name || '',
      type: args.config?.type || 'text',
      placeholder: args.config?.placeholder || '',
      hint: args.config?.hint || '',
      required: args.config?.required || false,
      disabled: args.config?.disabled || false,
      readonly: args.config?.readonly || false,
      email: args.config?.email || false,
      maxlength: args.config?.maxlength || 9999999999,
      minlength: args.config?.minlength || 0,
      pattern: args.config?.pattern || '',
      mask: args.config?.mask || false,
      customValidators: args.config?.customValidators || {},
      maskConfig: args.config?.maskConfig || {},
      dateConfig: args.config?.dateConfig || {},
      errors: args.config?.errors || {},
    };
  }
}
