import "./App.css";
import Layout from "./components/layout";

interface AppProps {
  apiKey: string | null;
}

function App({ apiKey }: AppProps) {
  return (
    <>
      <Layout apiKey={apiKey} />
    </>
  );
}

export default App;
