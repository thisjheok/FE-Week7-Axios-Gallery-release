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
  margin: 0;
  font-size: 40px;
  text-align: left; /* 왼쪽 정렬 */
  width: 600px; /* 전체 너비 사용 */
`;

const Text = styled.p`
  font-size: 25px;
  margin: 0;
  text-align: left; /* 왼쪽 정렬 */
  width: 600px;; /* 전체 너비 사용 */
`;

const CommentCnt = styled.p`
  font-size: 15px;
  margin: 0;
  text-align: right; /* 오른쪽 정렬 */
  width: 600px;; /* 전체 너비 사용 */
`

const Input = styled.input`
  margin: 10px;
  padding: 10px;
  font-size: 16px;
  width: 100%;
  text-align: left;
  max-width: 500px;
`;

const PostBtn = styled.button`
  margin: 10px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  width: 20%;
`;

const ReplyWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CommentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: #f1f1f1;
  border-radius: 5px;
  margin-bottom: 10px;
  width: 100%;
`;

const Comment = styled.p`
  margin: 0;
`;

const DeleteBtn = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
`;

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 600px;
  align-items: center;
`;



const Detail = ()=>{
    const [postInfo, setPostInfo] = useState([]);
    const {postId} = useParams();
    const [postComment,setComment] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [commentCount,setCommentCount] = useState(0);
    useEffect(() => {
        axios.get(`http://3.36.127.43:8080/imageAll`)
             .then(res => {
              const post = res.data.find(item => item.id === postId);
              setPostInfo(post);
             })
             .catch(err => {
                console.error(err);
             });
        axios.get(`http://3.36.127.43:8080/${postId}/comments`)
             .then(res => {
              const postComment = res.data;
              setComment(postComment);
              setCommentCount(res.data.length); 
             })
             .catch(err => {
                console.error(err);
             });
    }, [postId]);

    const handleInputChange = (e) => {
      setNewComment(e.target.value);
    };
  
    const handleSubmit = () => {
      if (newComment.trim() !== "") {
        axios.post(`http://3.36.127.43:8080/${postId}/comments`, {
          commentBody: newComment
        })
          .then(res => {
            setComment([...postComment, res.data]);
            setNewComment("");
            setCommentCount(commentCount + 1); 
          })
          .catch(err => {
            console.error(err);
          });
      }
    };
    const handleDelete = (commentId) => {
      axios.delete(`http://3.36.127.43:8080/${postId}/comments/${commentId}`)
        .then(() => {
          setComment(postComment.filter(comment => comment.id !== commentId));//postComment 배열에서 comment.id가 commentId와 일치하지 않는 댓글들만 걸러내어 새로운 배열을 만든다.. 
                                                                              //그 후, 이 새로운 배열을 setComment 함수를 사용하여 상태로 설정 이렇게 하면 삭제된 댓글이 상태에서 제거되어 UI가 업데이트
          setCommentCount(commentCount -1); 
        })
        .catch(err => {
          console.error(err);
        });
    };
    return(
        <>
        <Wrapper>
          <Title>{postInfo.imageName}</Title>
          <Text>{postInfo.imageText}</Text>
          <CommentCnt>댓글 {commentCount}개 </CommentCnt>
          <Photo src={postInfo.imageURL} alt={postInfo.imageName} />

        <ReplyWrapper>
        <InputWrapper>
            <Input 
              placeholder="댓글 작성..." 
              value={newComment} 
              onChange={handleInputChange}
            />
            <PostBtn onClick={handleSubmit}>작성</PostBtn>
          </InputWrapper>
          {postComment.map(comment => (
        <CommentWrapper key={comment.id}>
            <Comment>{comment.commentBody}</Comment>
            <DeleteBtn onClick={() => handleDelete(comment.id)}>삭제</DeleteBtn>
        </CommentWrapper>
        ))}
        </ReplyWrapper>
        </Wrapper>
        </>
    );
};



export default Detail;