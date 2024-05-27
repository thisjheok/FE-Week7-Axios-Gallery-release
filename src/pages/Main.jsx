import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Profile from "../components/Profile";
import Card from "../components/Card";
import axios from "axios";

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 260px);
  gap: 10px; 
  justify-content: center;
  width: 80%;
  margin: auto; 
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