import ThankYouIcon from "../../assets/icon-complete.svg";
import Button from "../Button";
import styles from "./ThankYou.module.scss";

export default function ThankYou(props) {
  return (
    <div class={styles.thankYou}>
      <ThankYouIcon
        class={styles.icon}
        role="presentation"
        aria-hidden="true"
      />
      <div class={styles.title}>Thank you!</div>
      <p class={styles.message}>We've added your card details</p>
      <Button
        classList={{ [styles.continue]: styles.continue }}
        onClick={props.onClick}
      >
        Continue
      </Button>
    </div>
  );
}
