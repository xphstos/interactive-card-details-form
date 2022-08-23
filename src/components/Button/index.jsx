import styles from "./Button.module.scss";

export default function Button(props) {
  return (
    <button classList={{ [styles.btn]: styles.btn }} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
