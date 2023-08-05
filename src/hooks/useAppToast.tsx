import { useToastController } from "@tamagui/toast";

export type AlertType = "success" | "error" | "warning";

export const useAppToast = () => {
  const toast = useToastController();

  interface ShowToastParams {
    message: string;
    title: string;
    type: AlertType;
  }
  const showToast = ({ message, title, type }: ShowToastParams) => {
    toast.show(title, {
      message,
      customData: {
        type,
      },
    });
  };
  return {
    showToast,
  };
};
