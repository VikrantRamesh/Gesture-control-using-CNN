import { Link } from "react-router-dom";


const Instructions = () => {

    return(
        <>
            <div>Home</div>
            <div><Link to="/instructions">Instructions page</Link> </div>
            <div><Link to="/test">Test page</Link> </div>
            <div><Link to="/videofeed">Video Feed page</Link> </div>
        </>
    )

}


export default Instructions;