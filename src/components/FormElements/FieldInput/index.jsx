import { splitProps } from "solid-js";
import { useField } from "solid-js-form";
import Input from "../Input";

export const FieldInput = (props) => {
  const { field, form } = useField(props.name);
  const formHandler = form.formHandler;
  const [local, rest] = splitProps(props, ["label", "type", "model"]);

  return (
    <label className="label">
      <span className="labelText">{local.label}</span>
      <Input
        className="labelInput input"
        value={field.value()}
        type={local.type || "text"}
        model={local.model}
        {...rest}
      />
      <span className="labelError error">{field.error()}</span>
    </label>
  );
};

export default FieldInput;
