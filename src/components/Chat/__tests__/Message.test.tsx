import { render, screen } from "@src/test-utils";
import { Message } from "../Message";
import React from "react";
import { messageGenerator, userGenarator } from "@src/utils/generators";
import { useAuth } from "@src/hooks/useAuth";

jest.mock("@src/hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

describe("Message component", () => {
  const content = "Olá, mundo";
  const currentUser = userGenarator({ id: 2 });
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      user: currentUser,
    });
  });
  it("should use current user style", () => {
    render(
      <Message
        message={messageGenerator({ userId: currentUser.id, content })}
        isCurrentUser
      />
    );
    const component = screen.getByTestId("message");
    expect(screen.getByText(content)).toBeOnTheScreen();
    expect(screen.getByText(/Você/i)).toBeOnTheScreen();
    const style = component.props.style[0];
    expect(style.alignSelf).toBe("flex-end");
  });
  it("should use other user style", () => {
    render(<Message message={messageGenerator({ userId: 50, content })} />);
    const component = screen.getByTestId("message");
    expect(screen.getByText(content)).toBeOnTheScreen();
    const style = component.props.style[0];
    expect(style.alignSelf).toBe("flex-start");
  });
});
