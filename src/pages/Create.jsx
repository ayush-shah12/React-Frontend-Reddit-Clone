// either reuse this component for creating or create 
// additional files for create post, comments, and community
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import CreateCommunity from "../components/CreateCommunity";
const Create = () =>{
    return(
        <div>
            <Header/>
            <div className = "containerSideMain">
            <Navbar/>
            <div id="main" className = "main">
                <CreateCommunity/>
            </div>

            </div>
        </div>
    );
};

export default Create;
