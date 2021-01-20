import React from 'react'
import {observer} from 'mobx-react-lite'

type TextAreaProps = Omit<
  React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >,
  'property'
>

interface BoundTextAreaProps<TModel, TProp extends keyof TModel> {
  model: TModel
  customChange?: () => void
  property: TProp
  formatter?(value: TModel[TProp]): string
  parser?(value: string): TModel[TProp]
}

const BoundTextArea = observer(
  <TModel, TProp extends keyof TModel>({
    property,
    model,
    formatter,
    customChange,
    parser,
    ...props
  }: BoundTextAreaProps<TModel, TProp> & TextAreaProps) => {
    const format = formatter || ((val) => String(val))
    const parse = parser || ((val) => (val as any) as TModel[TProp])
    const handleChange = (event: any) => {
      model[property] = parse(event.target.value)
      if (customChange) customChange()
    }
    return (
      <textarea
        className="form-control"
        name={property as string}
        value={model[property] ? format(model[property]) : ''}
        onChange={handleChange}
        {...props}
      />
    )
  },
)

export default BoundTextArea
