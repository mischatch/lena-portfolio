import {
  getListItemButtonUtilityClass,
  getListItemTextUtilityClass,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import { RenderLink } from "pages/components/RenderLink";
import { useMatch } from "react-router";

interface IListItemLinkProps {
  primary: string;
  to: string;
}

const selected = getListItemButtonUtilityClass("selected");
const listItemTextRoot = getListItemTextUtilityClass("root");

export function NavItemLink({ primary, to }: IListItemLinkProps) {
  const isCurrentPath = useMatch(to) && primary !== "Elena Byalaya";

  return (
    <ListItem
      aria-label={primary}
      sx={theme => ({
        width: "auto",
        display: "inline-flex",
        margin: `0 -${theme.spacing(1)}`,
        padding: "0",
      })}
    >
      <ListItemButton
        selected={Boolean(isCurrentPath)}
        component={RenderLink}
        disableRipple
        to={to}
        sx={theme => ({
          ...theme.typography.nav,
          color: theme.palette.text.primary,
          borderRadius: "1.25rem",
          width: "auto",
          margin: "0",
          padding: `0 ${theme.spacing(1)}`,
          // padding: `${theme.spacing(2.5)} ${theme.spacing(5)}`,
          [`&.${selected}, &.${selected}:hover, &:hover`]: {
            backgroundColor: theme.palette.background.default,
            borderRadius: "1.25rem",
          },

          [`&.${selected} .${listItemTextRoot}, &:hover .${listItemTextRoot}`]:
            {
              color: theme.palette.primary.light,
              borderRadius: "1.25rem",
            },
        })}
      >
        <Stack direction="row" alignItems="center">
          <ListItemText
            primary={primary}
            slotProps={{
              primary: {
                variant: "nav",
              },
            }}
            sx={theme => ({
              color: theme.palette.text.primary,
              fontFamily: "Obviously-Regular",
              margin: "0",
              lineHeight: 1,
              pb: "0.3rem",
            })}
          />
        </Stack>
      </ListItemButton>
    </ListItem>
  );
}
