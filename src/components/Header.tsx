import Link from "next/link";
import React from "react";
import styles from "../styles/Header.module.css";
import 'tailwindcss/tailwind.css';
import SignInButton from "./SignInButton";

export default function Header() {
  return (
    <>
    <div className="flex justify-center items-center shadow-sm shadow-slate-600 mb-2">
      <div className="flex justify-between items-center w-[80%]">
        <div className={styles.left}>
          <Link href={"/"}>
            <img src="/logo.png" alt="logo" className={styles.logo} />
          </Link>

          <Link href={"/create"} className="bg-white bg-opacity-[25%] px-2 py-1 rounded-xl transition-all ease-in-out duration-500 hover:scale-110">Create</Link>
        </div>

        <div className={styles.right}>
          <SignInButton />
        </div>
      </div>
      <div style={{ height: 64 }} />
    
    </div>
    </>
  );
}
