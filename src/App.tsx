// import './styles/styles.scss';
import { client } from "./apolloClient";
import { ApolloProvider } from "@apollo/client";
import { Route } from "react-router-dom";
import { Routes } from "react-router";
import Home from "./pages/Home";
import Project from "./pages/Project";
import NoMatch from "./pages/Nomatch";
import TopNav from "./pages/Topnav";
// import Footer from "./pages/Footer";
import About from "./pages/About";
import theme from "./theme";
import { ThemeProvider } from "@mui/material";

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <TopNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/project/:projectId" element={<Project />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
        {/* <Footer /> */}
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
