import Header from "../components/Header";
import useRedirect from "../customHook/useRedirect";
import "./Library.css";

function Home()
{
    useRedirect();
    return(
        <>
            <Header></Header>
        </>
    );
}

export default Home;