import { css } from "@emotion/react";
import React, { useState } from "react";
import { useRouter } from "next/router";

type LanguageToggleProps = {
  currentLocale?: string;
};

const LanguageToggle: React.FC<LanguageToggleProps> = ({ currentLocale }) => {
  const router = useRouter();

  const [isEnglish, setIsEnglish] = useState(currentLocale === "en");

  const handleLanguageChange = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const otherLocale = isEnglish ? "jp" : "en";

    const newPath = router.asPath.replace(
      `/${router.locale}`,
      `/${otherLocale}`
    );

    await router.push(newPath, newPath, { locale: otherLocale });

    setIsEnglish(!isEnglish);
  };

  return (
    <div
      css={css`
        width: 5rem; // Use rem unit
        height: 1.5rem; // Use rem unit
        border-radius: 25px;
        background-color: #0000ff;
        position: absolute;
        top: 1rem; // Add this
        right: 1rem; // Change margin-right to right and use rem unit
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 2px;
        box-sizing: border-box;
      `}
      onClick={handleLanguageChange}
    >
      <div
        css={css`
          width: 21px;
          height: 21px;
          border-radius: 50%;
          background-color: #fff;
          transition: transform 0.3s ease;
          transform: ${isEnglish ? "translateX(0)" : "translateX(55px)"};
        `}
      />
      <span
        css={css`
          color: white;
          transition: transform 0.5s ease;
          position: absolute;
          ${isEnglish ? "right: 5px;" : "left: 5px;"};
        `}
      >
        {isEnglish ? "JP" : "EN"}
      </span>
    </div>
  );
};

export default LanguageToggle;
