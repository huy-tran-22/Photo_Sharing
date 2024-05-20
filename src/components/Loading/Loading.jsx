import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import loading from './loading.gif'

// const Loading = () => {
//   return (
//     <div className="loading-container">
//       <FontAwesomeIcon icon={faSpinner} spin size="3x" className="load-icon"/>
//       <p >Loading...</p>
//     </div>
//   );
// };
// export default Loading;

const Loading = () => <img src={loading} alt ='loading...'/>
export default Loading