import { CustomContentProps, SnackbarContent } from "notistack";
import { ForwardedRef, forwardRef } from "react";

type TToastRef = ForwardedRef<HTMLDivElement>;

export const Toast = forwardRef((props: CustomContentProps, ref: TToastRef) => {
  return (
    <SnackbarContent className="Toast toast" style={props.style} ref={ref}>
      <div className="alert whitespace-normal">
        <span>{props.message}</span>
      </div>
    </SnackbarContent>
  );
});
