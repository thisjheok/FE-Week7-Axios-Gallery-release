import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
const Img = styled.img`
    width: 150px;
    height: 150px;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`

const Title = styled.h2`
    margin-bottom: 10px; 
    padding: 0;
`

const Comment = styled.p`
    margin-top: 0;
    margin-bottom: 10px; 
    padding: 0;
`

const Count = styled.h6`
    margin: 0; 
    padding: 0;
    font-size: 16px;
`

const Profile = () =>{
    const [postInfo, setPostInfo] = useState([]);
    useEffect(() => {
        axios.get(`http://3.36.127.43:8080/imageSize`)
             .then(res => {
                setPostInfo(res.data);
                console.log(res.data);
             })
             .catch(err => {
                console.error(err);
             });
    }, []);
    return(
    <Wrapper>
        <Img src="../chi.jpeg"></Img>
        <infoBox>
        <Title>likelion_12th_frontend</Title>
        <Comment>멋쟁이 사자처럼 12기 여러분 화이팅! 어른사자로 폭풍성장중..</Comment>
        <Count>게시글 {postInfo}개</Count>
        </infoBox>
    </Wrapper>
    )
}

export default Profile