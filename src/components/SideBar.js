import React, { useContext, useState, useEffect } from "react";
import * as ROUTES from "../helpers/ROUTES";
import { Link, Routes, useNavigate, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { AuthContext } from "../contexts/authContext";
import PostsService from "../services/PostsService";
import UsersService from "../services/UsersService";

const Container = styled.div`
    width: 70%;
    @media screen and (max-width: 750px) {
        width: 90%;
    }
    @media screen and (max-width: 850px) {
        width: 80%;
    }
`;

const PhotoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    & img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
    }
    & i {
        font-size: 200px;
    }
`;
const NameContainer = styled.div`
    text-align: center;
    margin-top: 20px;
    font-size: 30px;
`;
const ActionsContainer = styled.div`
    margin-top: 20px;
    width: 100%;
    font-size: 30px;
    display: flex;
    justify-content: space-around;
`;

const Action = styled.div`
    cursor: pointer;
    font-size: medium;
    display: flex;
    align-items: center;
    padding: 5px;
    border-radius: 5px;
    color: white;
    background-color: ${(props) => props.theme.buttonColour};
    & i {
        margin-right: 5px;
    }
    margin-right: 10px;
    // min-width: fit-content;
    width: max-content;
`;

const Card = styled.div`
    position: relative;
    background-color: ${(props) => props.theme.cardBg};
    display: flex;

    margin: 20px 0px;
    padding: 20px;
    flex-direction: column;
    box-shadow: ${(props) => props.theme.shadowColour} 0px 1px 2px;
    border-radius: 5px;
`;

const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    white-space: pre-wrap;
    word-wrap: break-word;
    & p {
        white-space: pre-wrap;
        word-wrap: break-word;
    }
`;

const EditProfile = styled.div`
    cursor: pointer;
    position: absolute;
    top: 15px;
    right: 15px;
    &:hover {
        text-decoration: underline;
    }
`;

const FriendsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    text-align: center;
`;

const GridItem = styled.div`
    & i {
        font-size: 70px;
        margin-bottom: 5px;
    }
    & a{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    & img{
        border-radius: 50%;
        margin-bottom: 5px;
        width: 70px;
    }
    display: flex;
    flex-direction: column;
`;

const SideBar = () => {
    const { userID } = useParams();
    const [user, setUser] = useState({});
    const [friends, setFriends] = useState([]);
    const { authState, dispatch } = useContext(AuthContext);

    useEffect(() => {
        async function getUser() {
            let res = await UsersService.getUser(userID);
            console.log(res.data);
            setUser(res.data);
            setFriends(res.data.friends);
        }
        getUser();
        return () => {};
    }, [userID]);
    function handleAddFriend() {}
    function handleSendMessage() {}

    if (user == {}) {
        return <>Loading</>;
    }
    return (
        <Container>
            <PhotoContainer>
                {user.profilePic ? (
                    <img src={user.profilePic} />
                ) : (
                    <i className="fa-regular fa-circle-user"></i>
                )}
            </PhotoContainer>
            <NameContainer>
                {user.firstName} {user.familyName}
            </NameContainer>
            {authState.user._id == userID ? (
                <></>
            ) : (
                <ActionsContainer>
                    <>
                        {user.friends.some(
                            (friend) =>
                                friend.friendId._id == authState.user._id &&
                                friend.status == "accepted"
                        ) ? (
                            <Action>
                                <i className="fa-solid fa-check"></i> friends
                            </Action>
                        ) : (
                            <Action
                                onClick={() => {
                                    handleAddFriend();
                                }}
                            >
                                Add a friend
                            </Action>
                        )}
                    </>
                    <Action
                        onClick={() => {
                            handleSendMessage();
                        }}
                    >
                        <i className="fas fa-envelope"></i>Message
                    </Action>
                </ActionsContainer>
            )}
            <Card>
                {userID == authState.user._id ? (
                    <EditProfile>
                        <Link to="/editprofile">Edit profile</Link>
                    </EditProfile>
                ) : (
                    <></>
                )}
                <ProfileInfo>
                    <b>Location:</b>{" "}
                    <p>{user.profile?.location || "No info"}</p>
                </ProfileInfo>
                <ProfileInfo>
                    <b>Biografy:</b> <p>{user.profile?.bio || "No info"}</p>
                </ProfileInfo>
                <ProfileInfo>
                    <b>Occupation:</b>{" "}
                    <p>{user.profile?.occupation || "No info"}</p>
                </ProfileInfo>
            </Card>
            <Card>
                <FriendsHeader>Friends ({friends.length}) </FriendsHeader>
                <Grid>
                    {friends.map(({ friendId: friend }) => {
                        return (
                            <GridItem>
                                <Link to={`/users/${friend._id}`}>
                                    {friend.profilePic ? (
                                        <img src={friend.profilePic} />
                                    ) : (
                                        <i className="fa-regular fa-circle-user"></i>
                                    )}

                                    {friend.firstName}
                                </Link>
                            </GridItem>
                        );
                    })}
                    {/* <div> fdsf</div>
                    <div> fdsf</div> */}
                </Grid>
            </Card>
        </Container>
    );
};

export default SideBar;