import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from 'styled-components';

const Photo= styled.img`
  width: 260px;
  height: 260px;
`;

const Wrapper = styled.div`
  padding: 6px;
  display: flex;
  flex-direction: column;
  width: 260px;
`;

const Name = styled.h4`
  margin-bottom: 4px; /* Adjust this value to control the spacing */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Text = styled.p`
  margin-top: 0; /* Ensure there's no extra space above the text */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default function Card({ name,img, text, id}) {
  
    const navigate = useNavigate();
    return (
      <Wrapper id={id} onClick={() => navigate(`/post/${id}`)}>
        <Photo src={img} />
        <Name>{name}</Name>
      <Text>{text}</Text>
      </Wrapper>
    );
  }