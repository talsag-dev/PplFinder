import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useDispatch, useSelector } from "react-redux";
import * as S from "./style";

const FavoriteList = () => {
  const [usersToDisplay, setUsersToDisplay] = useState(
    JSON.parse(localStorage.getItem("favoriteUsersReducer"))
  );
  const dispatch = useDispatch();

  const favoritesUsers = useSelector((state) => {
    return state.favoriteUsersReducer;
  });
  useEffect(() => {
    setUsersToDisplay(favoritesUsers);
  }, [usersToDisplay, favoritesUsers]);

  const handleMouseClick = (user) => {
    dispatch({ type: "REMOVE_FAV_USERS", payload: user });
  };

  return (
    <S.UserList>
      <S.List>
        {usersToDisplay?.map((user, index) => {
          return (
            <S.User key={index} onClick={() => handleMouseClick(user)}>
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper isVisible={favoritesUsers.includes(user)}>
                <IconButton>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
      </S.List>
    </S.UserList>
  );
};

export default FavoriteList;
