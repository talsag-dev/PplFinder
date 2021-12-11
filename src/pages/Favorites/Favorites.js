import React from "react";
import Text from "components/Text";
import FavoriteList from "components/FavoriteList";
import * as S from "./style";

const Favorites = (favorites) => {
  return (
    <S.Favorite>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            Favorites✨
          </Text>
        </S.Header>
        <FavoriteList />
      </S.Content>
    </S.Favorite>
  );
};

export default Favorites;
