import React from "react";
import { fireEvent, render, screen, waitFor } from "@src/test-utils";
import { AllCommunitiesScreen } from "../AllCommunitiesScreen";
import { AllCommunitiesScreenProps } from "@src/types/navigation/protectedRoutes";
import {
  addUserToCommunity,
  listCommunities,
} from "@src/services/communities-services";
import { communityGenerator } from "@src/utils/generators";
import { ListResponse } from "@src/models/ApiResponse";
import { Community } from "@src/models/Community";

jest.mock("@src/services/communities-services", () => ({
  listCommunities: jest.fn(),
  addUserToCommunity: jest.fn(),
}));

const communities = [
  communityGenerator({
    id: 1,
    name: "Comunidade 1",
  }),
  communityGenerator({
    id: 2,
    name: "Comunidade 2",
    isMember: true,
  }),
  communityGenerator({
    id: 3,
    name: "Comunidade 3",
  }),
];

const response: ListResponse<Community> = {
  results: communities,
  meta: {
    page: 1,
    pageCount: 1,
    pages: 1,
    total: communities.length,
  },
};

describe("AllCommunities Screen", () => {
  beforeEach(() => {
    (listCommunities as jest.Mock).mockResolvedValueOnce(response);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should have all content", async () => {
    const goBack = jest.fn();
    const props = {
      navigation: {
        goBack,
      },
    };
    render(
      <AllCommunitiesScreen
        {...(props as unknown as AllCommunitiesScreenProps)}
      />
    );
    await waitFor(() => {
      expect(listCommunities).toBeCalled();
    });

    expect(screen.getByText(/Comunidades/i)).toBeOnTheScreen();
    const backButton = screen.getByLabelText(/Voltar/i);
    expect(backButton).toBeOnTheScreen();
    fireEvent.press(backButton);
    expect(goBack).toBeCalled();
    expect(screen.getByPlaceholderText(/pesquisar/i)).toBeOnTheScreen();
    expect(await screen.findAllByTestId("community-card")).toHaveLength(
      communities.length
    );
  });
  it("should search communities", async () => {
    render(<AllCommunitiesScreen {...({} as AllCommunitiesScreenProps)} />);
    await waitFor(() => {
      expect(listCommunities).toBeCalled();
    });
    const searchText = "comunidade";
    const searchInput = screen.getByPlaceholderText(/pesquisar/i);
    fireEvent.changeText(searchInput, searchText);
    (listCommunities as jest.Mock).mockResolvedValueOnce(response);

    await waitFor(() => {
      expect(listCommunities).toBeCalledTimes(2);
    });
    await waitFor(() => {
      expect(listCommunities).toBeCalledWith({
        name: searchText,
      });
    });
  });
  it("should redirect user to community chat", async () => {
    const navigate = jest.fn();
    const props = {
      navigation: {
        navigate,
      },
    };
    render(
      <AllCommunitiesScreen
        {...(props as unknown as AllCommunitiesScreenProps)}
      />
    );
    await waitFor(() => {
      expect(listCommunities).toBeCalled();
    });
    const accessButton = await screen.findByRole("button", {
      name: /Acessar/i,
    });
    const memberCommunity = communities[1];
    fireEvent.press(accessButton);
    expect(navigate).toBeCalledWith("Community", {
      id: memberCommunity.id,
    });
  });
  describe("Add user in a community", () => {
    it("should not redirect to community screen", async () => {
      const navigate = jest.fn();
      const props = {
        navigation: {
          navigate,
        },
      };
      (addUserToCommunity as jest.Mock).mockRejectedValueOnce({});
      render(
        <AllCommunitiesScreen
          {...(props as unknown as AllCommunitiesScreenProps)}
        />
      );
      await waitFor(() => {
        expect(listCommunities).toBeCalled();
      });
      const memberButtons = await screen.findAllByRole("button", {
        name: /Virar membro/i,
      });
      const [turnMemberButton] = memberButtons;
      const notMemberCommunity = communities[0];
      fireEvent.press(turnMemberButton);
      await waitFor(() => {
        expect(addUserToCommunity).toBeCalledWith({
          communityId: notMemberCommunity.id,
        });
      });
      expect(navigate).not.toBeCalledWith("Community", {
        id: notMemberCommunity.id,
      });
    });
    it("should redirect to community screen", async () => {
      const navigate = jest.fn();
      const props = {
        navigation: {
          navigate,
        },
      };
      const notMemberCommunity = communities[0];

      (addUserToCommunity as jest.Mock).mockResolvedValue(notMemberCommunity);
      render(
        <AllCommunitiesScreen
          {...(props as unknown as AllCommunitiesScreenProps)}
        />
      );
      await waitFor(() => {
        expect(listCommunities).toBeCalled();
      });
      const memberButtons = await screen.findAllByRole("button", {
        name: /Virar membro/i,
      });
      const [turnMemberButton] = memberButtons;
      fireEvent.press(turnMemberButton);
      await waitFor(() => {
        expect(addUserToCommunity).toBeCalledWith({
          communityId: notMemberCommunity.id,
        });
      });
      expect(navigate).toBeCalledWith("Community", {
        id: notMemberCommunity.id,
      });
    });
  });
});
