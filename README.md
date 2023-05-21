```
yarn create next-app blog
✔ Would you like to use TypeScript with this project? … No / Yes
✔ Would you like to use ESLint with this project? … No / Yes
✔ Would you like to use Tailwind CSS with this project? … No / Yes
✔ Would you like to use `src/` directory with this project? … No / Yes
✔ Use App Router (recommended)? … No / Yes
✔ Would you like to customize the default import alias? … No / Yes

YYNNN


make .node-version and write
v16.20.0

add favicons
public/favicons
and edited pages/_document.tsx

delete api folder because idont use in this project(SSG)
rm -rf pages/api/

delete styles folder, because i write css with react/emotion
rm -rf styles/

edit index.tsx, like this(because )
export default function Home() {
  return (
    <>
      hello world
    </>
  )
}


add emotion
yarn add @emotion/react

edit tsconfig.json's compilerOption
"jsxImportSource": "@emotion/react"

see hello world get red
import { css } from '@emotion/react'

export default function Home() {
  return (
    <>
    <div css={css`
      color: red;
    `}>
      hello world
      </div>
    </>
  )
}

```