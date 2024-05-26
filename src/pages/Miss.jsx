import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Btn = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  background-color: #0084ff;
  color: white;
  border: none;
  border-radius: 5px;
`

const Img = styled.img`
    width: 300px;
    height: 300px;
`
const Wrapper = styled.div`
    
`

const Miss = ()=>{
    const navigate = useNavigate();
    return(
<>
<h1>잘못된 페이지 입니다!</h1>
<Img src="../chi.jpeg"></Img>
<Btn onClick={() => navigate(-1)}>뒤로 가기</Btn>
</>
    );
};
export default Miss;