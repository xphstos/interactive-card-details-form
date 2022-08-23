import { For, mergeProps } from "solid-js";
import Logo from "../../assets/card-logo.svg";
import styles from "./Card.module.scss";

export default function Card(props) {
  const formatNumber = (string) => string.match(/.{1,4}/g);
  const formatDate = (month, year) => (
    <>
      <span>{month.padStart(2, "0")}</span>/<span>{year.padStart(2, "0")}</span>
    </>
  );

  return (
    <div
      className={styles.card}
      classList={{ [styles.front]: props.front, [styles.back]: props.back }}
    >
      {props.front && props.data && (
        <>
          <Logo
            className={styles.logo}
            role="presentation"
            aria-hidden="true"
          />
          <div className={styles.number}>
            <For each={formatNumber(props.data.number || "0000000000000000")}>
              {(numberGroup) => <span>{numberGroup}</span>}
            </For>
          </div>
          <footer className={styles.footer}>
            <div className={styles.name}>
              {props.data.name || "Jane Appleseed"}
            </div>
            <div className={styles.date}>
              {formatDate(props.data.month || "00", props.data.year || "00")}
            </div>
          </footer>
        </>
      )}
      {props.back && props.data && (
        <div className={styles.cvc}>{props.data.cvc || "000"}</div>
      )}
    </div>
  );
}
