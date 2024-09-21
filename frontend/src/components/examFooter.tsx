import styles from "@/styles/components/footer.module.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CONSTANTS } from "@/src/components/lib/constants";
import { useProperties } from "@/src/components/hook/useProperties";
import { faGithub, faDiscord } from "@fortawesome/free-brands-svg-icons";
import clsx from "clsx";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const {
  FOOTER: { FOOTER_LINKS_GITHUB, FOOTER_LINKS_DISCORD, FOOTER_LINKS_IMPRESSUM },
} = CONSTANTS;

const ExamFooter = () => {
  const [github, discord, impressum] = useProperties([
    FOOTER_LINKS_GITHUB,
    FOOTER_LINKS_DISCORD,
    FOOTER_LINKS_IMPRESSUM,
  ]);
  return (
    <footer className={styles.container}>
      <div className={clsx(styles.footerLinks, "defaultText")}>
        <Link href={"https://github.com/sailex428/ccnaexams"} target={"_blank"}>
          <FontAwesomeIcon icon={faGithub} />
          {github}
          <FontAwesomeIcon icon={faArrowRight} className={styles.arrowIcon} />
        </Link>
        <Link href={"https://discord.gg/QvjMkgtw"} target={"_blank"}>
          <FontAwesomeIcon icon={faDiscord} />
          {discord}
          <FontAwesomeIcon icon={faArrowRight} className={styles.arrowIcon} />
        </Link>
      </div>
      <div className={clsx(styles.footerLinks, "defaultText")}>
        <Link href={"/impressum"}>{impressum}</Link>
      </div>
    </footer>
  );
};

export default ExamFooter;
