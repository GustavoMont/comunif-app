import { act, renderHook } from "@testing-library/react-native";
import { useBoolean } from "../useBoolean";

describe("test useBoolean", () => {
  it("should start with value false", () => {
    const { result } = renderHook(useBoolean);
    const { isOpen } = result.current;
    expect(isOpen).toBeFalsy();
  });
  it("should start with true", () => {
    const { result } = renderHook(() => useBoolean(true));
    const { isOpen } = result.current;
    expect(isOpen).toBeTruthy();
  });
  it("should toggle value", () => {
    const { result } = renderHook(useBoolean);
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBeTruthy();
  });
  it("should turn value into false", () => {
    const { result } = renderHook(() => useBoolean(true));
    act(() => result.current.close());
    expect(result.current.isOpen).toBeFalsy();
  });
  it("should turn value into true", () => {
    const { result } = renderHook(useBoolean);
    act(() => result.current.open());
    expect(result.current.isOpen).toBeTruthy();
  });
});
