import { useRouter } from "next/router";
import LanguageToggle from "./LanguageToggle";

export default function Header() {
  const { locale } = useRouter();

  return (
    <header>
      <h1>My Blog</h1>
      <nav>
        {/* 他のナビゲーションリンク */}
        <LanguageToggle currentLocale={locale} />
      </nav>
    </header>
  );
}
