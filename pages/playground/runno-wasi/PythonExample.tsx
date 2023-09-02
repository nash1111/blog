// YourPage.js
import dynamic from "next/dynamic";

const DynamicRunnoComponent = dynamic(
  () => import("../../../components/RunnoComponent"),
  {
    ssr: false, // Disable SSR
  }
);

const PythonExample = () => {
  return (
    <div>
      <h1>Your Page</h1>
      <DynamicRunnoComponent />
    </div>
  );
};

export default PythonExample;
