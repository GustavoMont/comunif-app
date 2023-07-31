import { ToastAlert } from "@src/components/common/Layout/ToastAlert";
import { useToast } from "native-base";
import React from "react";

export type AlertType = "success" | "error" | "warning";

export const useAppToast = () => {
  const toast = useToast();
  interface ShowToastParams {
    message: string;
    title: string;
    type: AlertType;
  }
  const showToast = ({ message, title, type }: ShowToastParams) => {
    toast.show({
      render() {
        return <ToastAlert message={message} title={title} type={type} />;
      },
    });
  };
  return {
    showToast,
  };
};
