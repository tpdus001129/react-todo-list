import React from "react";
import { Snackbar, Alert as MuiAlert, AlertProps } from "@mui/material";
import { atom, useRecoilState } from "recoil";

export const noticeSnackbarInfoAtom = atom({
  key: "app/noticeSnackbarInfoAtom",
  default: {
    opened: false,
    autoHideDuration: 0,
    severity: "",
    msg: "",
  },
});

export function useNoticeSnackbarStatus() {
  const [noticeSnackbarInfo, setNoticeSnackbarInfo] = useRecoilState(noticeSnackbarInfoAtom);

  const opened = noticeSnackbarInfo.opened;
  const autoHideDuration = noticeSnackbarInfo.autoHideDuration;
  const severity = noticeSnackbarInfo.severity;
  const msg = noticeSnackbarInfo.msg;

  const open = (msg: string, severity = "success", autoHideDuration = 1000) => {
    setNoticeSnackbarInfo({
      opened: true,
      autoHideDuration,
      severity,
      msg,
    });
  };

  const close = () => {
    setNoticeSnackbarInfo({
      ...noticeSnackbarInfo,
      opened: false,
    });
  };

  return {
    opened,
    autoHideDuration,
    severity,
    msg,
    open,
    close,
  };
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <MuiAlert {...props} ref={ref} variant="filled" />;
});

export function NoticeSnackbar() {
  const status = useNoticeSnackbarStatus();

  return (
    <>
      <Snackbar
        open={status.opened}
        autoHideDuration={status.autoHideDuration}
        onClose={status.close}
      >
        <Alert severity={status.severity === "success" ? "success" : "info"}>{status.msg}</Alert>
      </Snackbar>
    </>
  );
}
