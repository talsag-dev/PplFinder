import React, { useEffect, useState, useRef, useCallback } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useDispatch, useSelector } from "react-redux";
import * as S from "./style";

const UserList = ({ users, isLoading }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const dispatch = useDispatch();

  const country = useSelector((state) => {
    return state.countryReducer;
  });
  const favoritesUsers = useSelector((state) => {
    return state.favoriteUsersReducer || [];
  });

  useEffect(() => {
    const favoritesUsersFromLocalStorage =
      JSON.parse(localStorage.getItem("favoritesUsersReducer")) || favoritesUsers;
    favoritesUsersFromLocalStorage.forEach((fav) =>
      dispatch({
        type: "GET_FROM_LOCAL_STORAGE",
        payload: favoritesUsersFromLocalStorage,
      })
    );
  }, [users]);

  const UserFiltered = () => {
    return country.length === 0
      ? users
      : users?.filter((item) => country.includes(item.nat));
  };

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };
  const handleMouseLeave = () => {
    setHoveredUserId();
  };
  const handleMouseClick = (user) => {
    dispatch({
      type: favoritesUsers.includes(user) ? "REMOVE_FAV_USERS" : "SAVE_FAV_USERS",
      payload: user,
    });
  };

  const checkboxes = [
    {
      value: "BR",
      label: "Brazil",
    },
    {
      value: "AU",
      label: "Australia",
    },
    {
      value: "CA",
      label: "Canada",
    },
    {
      value: "DE",
      label: "Germany",
    },
    {
      value: "FR",
      label: "France",
    },
  ];
  const handleCheckBoxChange = (checkBoxValue, isChecked) => {
    dispatch({
      type: isChecked ? "ADD_NATION" : "REMOVE_NATION",
      payload: checkBoxValue,
    });
  };
  return (
    <S.UserList>
      <S.Filters>
        {checkboxes.map((nation) => (
          <CheckBox
            value={nation.value}
            label={nation.label}
            key={nation.value}
            onChange={handleCheckBoxChange}
            isChecked={country.includes(nation.value)}
          />
        ))}
      </S.Filters>
      <S.List>
        {UserFiltered().map((user, index) => {
          const isFav = favoritesUsers.some((item) => {
            return item.login.uuid == user.login.uuid;
          });
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleMouseClick(user)}
            >
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
              <S.IconButtonWrapper isVisible={index === hoveredUserId || isFav}>
                <IconButton>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
