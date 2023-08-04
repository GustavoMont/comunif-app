import { View } from "react-native";
import React from "react";

import { BodyText } from "@src/components/common/Typograph/BodyText";
import { HomeScreenProps } from "@src/types/navigation/protectedRoutes";
import { useQuery } from "@tanstack/react-query";
import { listCommunities } from "@src/services/communities-services";
import { FullScreenContainer } from "@src/components/common/Layout/FullScreenContainer";
import { useAuth } from "@src/hooks/useAuth";
import { Header } from "@src/components/home/Header";

export const Home: React.FC<HomeScreenProps> = ({}) => {
  const { user } = useAuth();
  const { data: communities, isLoading } = useQuery(
    ["my-communities"],
    listCommunities
  );
  return (
    <FullScreenContainer>
      {user ? <Header user={user} /> : <></>}
    </FullScreenContainer>
  );
};
