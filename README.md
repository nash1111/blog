```
yarn create next-app blog
✔ Would you like to use TypeScript with this project? … No / Yes
✔ Would you like to use ESLint with this project? … No / Yes
✔ Would you like to use Tailwind CSS with this project? … No / Yes
✔ Would you like to use `src/` directory with this project? … No / Yes
✔ Use App Router (recommended)? … No / Yes
✔ Would you like to customize the default import alias? … No / Yes

YYNNN

add favicons
public/favicons
and edited pages/_document.tsx

delete api folder because idont use in this project(SSG)
rm -rf pages/api/

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

```