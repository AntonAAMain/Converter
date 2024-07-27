import Image from "next/image";
import styles from "./page.module.css";
import { Converter } from "@/components/widgets/Converter/Converter";

export default function Home() {
  return (
    <main className={styles.main}>
      <Converter />
    </main>
  );
}
