import { onCleanup, mergeProps, splitProps } from "solid-js";
import { createRenderEffect } from "solid-js";
import { createStore } from "solid-js/store";

import { useField, Form } from "solid-js-form";
import * as Yup from "yup";

// import FieldInput from "./components/FormElements/FieldInput";
// import Input from "./components/FormElements/Input";
import Card from "./components/Card";
import styles from "./App.module.scss";
import cardStyles from "./components/Card/Card.module.scss";
import formStyles from "./components/FormElements/FormElements.module.scss";
import { createSignal } from "solid-js";
import ThankYou from "./components/ThankYou";
import Button from "./components/Button";

// Two way bind
function model(el, accessor) {
  const [getter, setter] = accessor();

  el.addEventListener("input", (e) =>
    setter(el.name, () => e.currentTarget.value)
  );
  createRenderEffect(() => (el.value = getter[el.name]));

  // onCleanup(() => {
  //   el.removeEventListener("input");
  // });
}

function App() {
  const appModel = createStore({
    name: "",
    number: "",
    month: "",
    year: "",
    cvc: "",
  });

  const validation = {
    name: Yup.string()
      .required("Can't be blank")
      .matches(/[a-zA-Z]/, {
        message: "Password can only contain Latin letters",
        excludeEmptyString: true,
      }),
    number: Yup.string()
      .required("Can't be blank")
      .matches(/[0-9]/, {
        message: "Wrong format, numbers only",
        excludeEmptyString: true,
      })
      .test("len", "Must be exactly 16 characters", (val) => val.length === 16),
    month: Yup.string()
      .matches(/[0-9]/, {
        message: "Wrong format, numbers only",
        excludeEmptyString: true,
      })
      .test(
        "val",
        "Must be equal or less than 12",
        (val) => parseInt(val) <= 12
      )
      .required("Can't be blank"),
    year: Yup.string()
      .matches(/[0-9]/, {
        message: "Wrong format, numbers only",
        excludeEmptyString: true,
      })
      .test(
        "date",
        "Must be equal or less than current year",
        (val) =>
          parseInt(val) >= Number(new Date().getFullYear().toString().slice(-2))
      )
      .required("Can't be blank"),
    cvc: Yup.string().required("Can't be blank").matches(/[0-9]/, {
      message: "Wrong format, numbers only",
      excludeEmptyString: true,
    }),
  };

  const [isValid, setIsValid] = createSignal(false);

  return (
    <>
      <aside className={cardStyles.cards}>
        <Card data={JSON.parse(JSON.stringify(appModel[0]))} front />
        <Card data={JSON.parse(JSON.stringify(appModel[0]))} back />
      </aside>
      {isValid() ? (
        <ThankYou onClick={() => setIsValid(false)} />
      ) : (
        <Form
          initialValues={appModel[0]}
          validation={validation}
          onSubmit={async ({ isValid }) => {
            setIsValid(isValid);
          }}
        >
          <FieldInput
            name="name"
            label="Cardholder name"
            placeholder="e.g. Jane Appleseed"
            model={appModel}
          />
          <FieldInput
            name="number"
            label="Card number"
            maxLength={16}
            model={appModel}
            placeholder="e.g. 1234 5678 9123 0000"
          />
          <div className={formStyles.fieldGroup}>
            <label className={formStyles.label}>
              <span className={formStyles.labelText}>Exp. Date (MM/YY)</span>
              <div className={formStyles.fieldGroupInputWrapper}>
                <Input
                  name="month"
                  placeholder="MM"
                  inputMode="numeric"
                  model={appModel}
                  maxLength={2}
                />
              </div>
              <div className={formStyles.fieldGroupInputWrapper}>
                <Input
                  name="year"
                  placeholder="YY"
                  inputMode="numeric"
                  model={appModel}
                  maxLength={2}
                />
              </div>
            </label>
          </div>
          <FieldInput
            name="cvc"
            label="cvc"
            inputMode="numeric"
            placeholder="e.g. 123"
            maxLength={3}
            model={appModel}
          />
          <Button>Confirm</Button>
        </Form>
      )}
    </>
  );
}

export default App;

const FieldInput = (props) => {
  const { field, form } = useField(props.name);
  const formHandler = form.formHandler;
  const [local, rest] = splitProps(props, ["label", "type"]);

  console.log(props.name);

  return (
    <label
      classList={{
        [formStyles.label]: formStyles.label,
        [formStyles[props.name]]: props.name,
      }}
    >
      <span className={formStyles.labelText}>{local.label}</span>
      <Input
        classList={{
          [formStyles.labelInput]: formStyles.labelInput,
        }}
        value={field.value()}
        type={local.type || "text"}
        noError
        {...rest}
      />
      <span class={`${formStyles.labelError} ${formStyles.error}`}>
        {field.error()}
      </span>
    </label>
  );
};

const Input = (props) => {
  const { field, form } = useField(props.name);
  const formHandler = form.formHandler;
  const [local, rest] = splitProps(props, ["model", "type", "noError"]);

  return (
    <>
      <input
        classList={{
          [formStyles.input]: formStyles.input,
          [formStyles.hasError]: field.error(),
        }}
        use:model={local.model}
        use:formHandler
        value={field.value()}
        type={local.type || "text"}
        {...rest}
      />
      {!local.noError && (
        <span className={formStyles.error}>{field.error()}</span>
      )}
    </>
  );
};
