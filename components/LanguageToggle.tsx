import { css } from "@emotion/react";
import React, { useState } from "react";
import { useRouter } from "next/router";

type LanguageToggleProps = {
  currentLocale?: string;
};

const LanguageToggle: React.FC<LanguageToggleProps> = ({ currentLocale }) => {
  const router = useRouter();

  const [isEnglish, setIsEnglish] = useState(currentLocale === "en");

  const handleLanguageChange = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const otherLocale = isEnglish ? "jp" : "en";

    const newPath = router.asPath.replace(
      `/${router.locale}`,
      `/${otherLocale}`
    );

    router.push(newPath, newPath, { locale: false });

    setIsEnglish(!isEnglish);
    console.log("isEnglish", isEnglish);
  };

  return (
    <div
      css={css`
        width: 80px;
        height: 25px;
        border-radius: 25px;
        background-color: #bbb;
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: ${isEnglish ? "flex-start" : "flex-end"};
        padding: 2px;
        box-sizing: border-box;
        transition: background-color 0.2s;
      `}
      onClick={handleLanguageChange}
    >
      <div
        css={css`
          width: 21px;
          height: 21px;
          border-radius: 50%;
          background-color: #fff;
          transition: transform 0.2s;
        `}
      />
      <span
        css={css`
          position: absolute;
          ${isEnglish ? "right: 5px;" : "left: 5px;"}
          color: white;
        `}
      >
        {isEnglish ? "JP" : "EN"}
      </span>
    </div>
  );
};

export default LanguageToggle;
