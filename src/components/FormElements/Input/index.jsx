import { splitProps } from "solid-js";
import { useField } from "solid-js-form";

const Input = (props) => {
  const { field, form } = useField(props.name);
  const formHandler = form.formHandler;
  const [local, rest] = splitProps(props, ["type", "model"]);

  return (
    <>
      <input
        className="input"
        use:model={local.model}
        use:formHandler
        value={field.value()}
        type={local.type || "text"}
        {...rest}
      />
      <span className="error">{field.error()}</span>
    </>
  );
};

export default Input;
