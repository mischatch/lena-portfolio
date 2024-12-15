/* eslint-disable react/display-name */
import { forwardRef } from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

export const RenderLink = forwardRef<HTMLAnchorElement, RouterLinkProps>(
  (props, ref) => {
    return <RouterLink ref={ref} {...props} />;
  }
);
