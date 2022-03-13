import React, { useContext, useState, useEffect } from "react";
import * as ROUTES from "../helpers/ROUTES";
import { Link, Routes, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { AuthContext } from "../contexts/authContext";
import PostsService from "../services/PostsService";
import Post from "../components/Post";

const DashboardContainer = styled.div`
    width: 55%;
`;

const TogglePostButton = styled.button`
    cursor: pointer;
    background-color: ${({ theme }) => theme.buttonColour};
    color: white;
    width: 100%;
    padding: 10px;
    border-radius: 10px;
`;
const fadeIn = keyframes`
  0% {
   transform: translateY(0px);
  }
  100% {
   transform: translateY(-100px);
  }
`;
const PostForm = styled.div`
    border: 1px solid ${({ theme }) => theme.mainFontColour};
    border-top: none;
    color: ${({ theme }) => theme.mainFontColour};
    width: 100%;
    padding: 10px;
    box-shadow: ${(props) => props.theme.shadowColour} 0px 1px 1px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transform: ${(props) =>
        props.show ? "translateY(0px)" : "translateY(-150px)"};
    align-items: center;
    animation-iteration-count: 1;
`;

const PostTextArea = styled.textarea`
    background-color: transparent;
    width: 100%;
    resize: none;
    color: ${({ theme }) => theme.mainFontColour};
    border-bottom: 1px solid ${({ theme }) => theme.mainFontColour};
`;
const OverflowHidden = styled.div`
    overflow: hidden;
    margin-bottom: 20px;
`;

const PostSubmit = styled.button`
    cursor: pointer;
    background-color: ${({ theme }) => theme.buttonColour};
    color: white;
    margin-top: 10px;
    width: 20%;
    padding: 10px;
    border-radius: 10px;
`;
const PostsContainer = styled.div`
    transform: ${(props) =>
        props.show ? "translateY(0)" : "translateY(-130px)"};
`;
const Dashboard = () => {
    const [showPostForm, setShowPostForm] = useState(false);
    const [PostValue, setPostValue] = useState("");
    const [posts, setPosts] = useState([]);
    function togglePostForm() {
        return setShowPostForm(!showPostForm);
    }

    useEffect(() => {
        async function getPosts() {
            let response = await PostsService.getPosts();

            // console.log(response.data);
            // comments: [];
            // date: "2022-02-25T14:01:31.206Z";
            // likes: [];
            // name: "Test lavrov";
            // profilePic: "";
            // recipient: "621528c880508134ab2c5072";
            // recipientName: "Yurii cher";
            // text: "to me from test";
            // user: {
            //     _id: "6218dff796dafdb5b408c24a";
            // }
            // __v: 0;
            // _id: "6218e13bb0c8e98b67febaca";
            setPosts(response.data);
        }
        getPosts();

        return () => {};
    }, []);

    return (
        <DashboardContainer>
            <TogglePostButton
                onClick={() => {
                    togglePostForm();
                }}
            >
                {showPostForm ? "Close" : "Post something"}
            </TogglePostButton>

            <OverflowHidden>
                <PostForm show={showPostForm}>
                    <PostTextArea
                        onChange={(e) => {
                            setPostValue(e.target.value);
                        }}
                        value={PostValue}
                        rows={3}
                        placeholder="What's on your mind?"
                    />
                    <PostSubmit>Post</PostSubmit>
                </PostForm>
            </OverflowHidden>
            <PostsContainer show={showPostForm}>
                {posts.map((post) => {
                    return <Post key={post._id} post={post}/>;
                })}
            </PostsContainer>
        </DashboardContainer>
    );
};

export default Dashboard;