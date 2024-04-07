"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getDetail } from "@/src/app/api/actions";
import { Button } from "react-bootstrap";
import { DetailType } from "@/types/database";
import { properties } from "@/src/components/lib/static";
import global from "@/styles/globals.module.css";
import styles from "@/styles/pages/modulepage.module.css";

export default function StartExamPage({
  params,
}: {
  params: { moduleId: string };
}) {
  const router = useRouter();
  const [detail, setDetail] = useState<DetailType>({} as DetailType);

  useEffect(() => {
    const fetchDetails = async () => {
      await getDetail(params.moduleId).then((data) => {
        setDetail(data);
      });
    };
    fetchDetails();
  }, [params.moduleId]);

  if (detail == null) {
    return (
      <div className={styles.container}>
        <div className="fw-bold mt-4">An Error occurred</div>
      </div>
    );
  } else if (detail.title != null) {
    return (
      <div className={styles.container}>
        <h2
          className={styles.headline}
        >{`Module ${params.moduleId} : ${detail.title}`}</h2>
        <div className={styles.info}>
          <p>{properties.startExamText.replace("${title}", detail.title)}</p>
          <Button
            variant="primary"
            className={global.button}
            onClick={() => {
              router.push(`/${params.moduleId}/1`);
            }}
          >
            {properties.startExamButton}
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <div className="fw-bold mt-4">Module is loading...</div>
      </div>
    );
  }
}
