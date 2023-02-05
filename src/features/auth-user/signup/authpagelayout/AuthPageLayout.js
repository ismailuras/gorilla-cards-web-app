import { Link } from "react-router-dom";
import { CheckCircle } from "react-feather";

import styles from "./authpagelayout.module.css";

import gorilla from "assets/images/gorilla-logo.png";

function AuthPageLayout() {
  return (
    <div className="w-2/3">
      <div className="pr-16">
        <Link to="/signin" className="inline-block">
          <img src={gorilla} alt="Gorilla Cards" className="h-20 mb-16" />
        </Link>
        <div className="flex mb-8">
          <div className="pr-4 pt-1">
            <CheckCircle className={styles.checkIcon} />
          </div>
          <div>
            <h4 className={styles.header}>Lorem, ipsum dolor sit</h4>
            <p className={styles.infoText}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe,
              ipsum?
            </p>
          </div>
        </div>
        <div className="flex mb-8">
          <div className="pr-4 pt-1">
            <CheckCircle className={styles.checkIcon} />
          </div>
          <div>
            <h4 className={styles.header}>Consectetur adipisicing elit</h4>
            <p className={styles.infoText}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus, enim eaque.
            </p>
          </div>
        </div>
        <div className="flex mb-8">
          <div className="pr-4 pt-1">
            <CheckCircle className={styles.checkIcon} />
          </div>
          <div>
            <h4 className={styles.header}>Amet consectetur adipisicing</h4>
            <p className={styles.infoText}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
        <div className="mt-36">
          <ul className={styles.infoList}>
            <li>
              <Link to="/" className={styles.link}>
                About
              </Link>
            </li>
            <li>
              <Link to="/" className={styles.link}>
                Privacy
              </Link>
            </li>
            <li>
              <Link to="/" className={styles.link}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AuthPageLayout;
