import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Photo = styled.img`
  width: 100%;
  max-width: 600px;
  height: auto;
`;
const Title = styled.h2`
  margin: 20px 0;
  font-size: 40px;
`;

const Text = styled.p`
  font-size: 25px;
  margin: 0;
`;

const Input = styled.input`
  
`

const postBtn = styled.button`
  
`

const replyWrapper = styled.div`
  
`

const Detail = ()=>{
    const [postInfo, setPostInfo] = useState([]);
    const {postId} = useParams();
    useEffect(() => {
        axios.get(`http://3.36.127.43:8080/imageAll`)
             .then(res => {
              const post = res.data.find(item => item.id === postId);
              setPostInfo(post);
             })
             .catch(err => {
                console.error(err);
             });
    }, [postId]);
    return(
        <>
        <Wrapper>
          <Title>{postInfo.imageName}</Title>
          <Text>{postInfo.imageText}</Text>
          <Photo src={postInfo.imageURL} alt={postInfo.imageName} />
        </Wrapper>
        <replyWrapper>
          <Input placeholder="댓글 작성..."></Input>
          <postBtn>작성</postBtn>
        </replyWrapper>
        </>
    );
};



export default Detail;