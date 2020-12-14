import React from 'react';
import {observer} from 'mobx-react-lite';

type InputProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  'property'
>;

interface BoundInputProps<TModel, TProp extends keyof TModel> {
  model: TModel;
  property: TProp;
  formatter?(value: TModel[TProp]): string;
  parser?(value: string): TModel[TProp];
}

const BoundInput = observer(
  <TModel, TProp extends keyof TModel>({
    property,
    model,
    formatter,
    parser,
    ...props
  }: BoundInputProps<TModel, TProp> & InputProps) => {
    const format = formatter || ((val) => String(val));
    const parse = parser || ((val) => (val as any) as TModel[TProp]);

    return (
      <input
        type="text"
        className="form-control"
        name={property as string}
        value={model[property] ? format(model[property]) : ''}
        onChange={(e) => {
          model[property] = parse(e.target.value);
        }}
        {...props}
      />
    );
  },
);

export default BoundInput;
