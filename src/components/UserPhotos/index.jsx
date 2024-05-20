import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import "./styles.css";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import moment from "moment";

function formatDateTime(isoDateString) {
  return moment(isoDateString).format("DD-MM-YYYY HH:mm");
}

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos () {
    const photoUser = useParams();
    const [photos, setPhotos] = useState([])
    const [userName, setUserName] = useState("")
    const [loading,setLoading] = useState(true);
    const token = localStorage.getItem("token")
    const history = useNavigate()
    useEffect(() => {
      const fetchPhotoOfUser = async () => {
        const headers = { 'Authorization': `Bearer ${token}` };
        try{
          const res = await axios.get(
            `https://7y9cdp-8081.csb.app/api/photo/photosOfUser/${photoUser.userId}`,
            {headers: headers}
          )
          setPhotos(res.data)
          const userRes = await axios.get(
            `https://7y9cdp-8081.csb.app/api/user/${photoUser.userId}`,
            {headers: headers}
          )
          setUserName(userRes.data.first_name)
          setLoading(false)
          console.log("Succeed")
        }catch(e){
          console.error("Failed")
          setLoading(false)
        }
      }

      fetchPhotoOfUser()
    },[])

    if(loading){
      return (
        <>
          <Loading />
        </>
      )
    }

    return (
      <div className="photos-area">
        <div className="back" onClick={() => history(`/users/${photoUser.userId}`)}>
          <span className="back-icon">Back</span>
        </div>
        <div className="photos-flex-box">
          {photos?.map(photo => (
            <div key={photo._id} className="photos-container">
              <span className="photo-time"> {formatDateTime(photo.date_time)}</span>
              <Link to={`/photo/${photo._id}`}>
                  <img src={photo.file_name} alt="" className="photo"/>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
}

export default UserPhotos;
