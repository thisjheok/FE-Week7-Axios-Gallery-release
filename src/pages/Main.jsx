import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Profile from "../components/Profile";
import Card from "../components/Card";
import axios from "axios";

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 260px); /* Fixed card width */
  gap: 10px; /* Narrower gap between cards */
  justify-content: center; /* Center the cards */
  width: 80%; /* Adjust width as needed */
  margin: auto; /* Center the CardWrapper */
`;

const Main = ()=>{
    const [postInfo, setPostInfo] = useState([]);

    useEffect(() => {
        axios.get(`http://3.36.127.43:8080/imageAll`)
             .then(res => {
                setPostInfo(res.data);
             })
             .catch(err => {
                console.error(err);
             });
    }, []);
    return(
        <>
          <Profile></Profile>
            <CardWrapper>
                {postInfo.map(post => (
                        <Card name={post.imageName} img={post.imageURL} text={post.imageText} id={post.id} />
                ))}
            </CardWrapper>
        </>
    );
};



export default Main;