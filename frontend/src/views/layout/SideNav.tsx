/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";

import ButtonBase from "@mui/material/ButtonBase";
import Drawer from "@mui/material/Drawer";
import { useTheme } from "@mui/material";
import { Link } from "react-router-dom";

import React from "react";

interface ISideNavProps {
    // onClose: () => void;
    // open: boolean;
    // pathname: string;
}

const SideNav: React.FC<ISideNavProps> = () => {

    const items = [
        {
            title: "Home",
            path: "/home",
            icon: (
                <SvgIcon fontSize="small">{/* <Icon path={chartBar} /> */}</SvgIcon>
            ),
        },

        {
            title: "My Playlists",
            path: "/my-playlists",
            icon: <SvgIcon fontSize="small">{/* <Icon path={user} /> */}</SvgIcon>,
        },
        {
            title: "Search",
            path: "/search",
            icon: (
                <SvgIcon fontSize="small">{/* <Icon path={document} /> */}</SvgIcon>
            ),
        },
    ];

    const content = (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
            }}
        >
            <Box sx={{ p: 3 }}>
                <Box
                    sx={{
                        display: "inline-flex",
                    }}
                >
                    <Typography>Spot Music</Typography>
                </Box>
            </Box>
            <Divider sx={{ borderColor: "neutral.700" }} />
            <Box
                component="nav"
                sx={{
                    flexGrow: 1,
                    px: 2,
                    py: 3,
                }}
            >
                <Stack
                    component="ul"
                    spacing={0.5}
                    sx={{
                        listStyle: "none",
                        p: 0,
                        m: 0,
                    }}
                >
                    {items.map((item) => {
                        // const active = item.path ? item.path === props.pathname : false;

                        return (
                            <SideNavItem
                                // active={active}
                                //   disabled={item.disabled}
                                //   external={item.external}
                                icon={item.icon}
                                key={item.title}
                                path={item.path}
                                title={item.title}
                            />
                        );
                    })}
                </Stack>
            </Box>
            <Divider sx={{ borderColor: "neutral.700" }} />
            <Box
                sx={{
                    px: 2,
                    py: 3,
                }}
            >
                <Button
                    component="a"
                    endIcon={
                        <SvgIcon fontSize="small">
                            {/* <Icon path={arrowTopRightOnSquare} /> */}
                        </SvgIcon>
                    }
                    fullWidth
                    href="https://github.com/Poujhit"
                    sx={{ mt: 2, textTransform: "none" }}
                    target="_blank"
                    variant="contained"
                >
                    © Poujhit {new Date().getFullYear()}
                </Button>
            </Box>
        </Box>
    );

    return (
        <>
            <Drawer
                anchor="left"
                open
                PaperProps={{
                    sx: {
                        backgroundColor: "neutral.800",
                        color: "common.white",
                        width: 280,
                    },
                }}
                variant="permanent"
            >
                {content}
            </Drawer>
        </>
    );
};

const SideNavItem = (props: any) => {
    const theme = useTheme();
    return (
        <li>
            <ButtonBase
                disableRipple
                sx={{
                    alignItems: "center",
                    borderRadius: 1,
                    display: "flex",
                    justifyContent: "flex-start",
                    pl: "16px",
                    pr: "16px",
                    py: "6px",
                    textAlign: "left",
                    width: "100%",
                    ...(props.active && {
                        backgroundColor: "rgba(255, 255, 255, 0.04)",
                    }),
                    "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.04)",
                    },
                }}
                component={Link}
                to={props.path}
            // href={props.path}
            >
                {props.icon && (
                    <Box
                        component="span"
                        sx={{
                            alignItems: "center",
                            color: "neutral.400",
                            display: "inline-flex",
                            justifyContent: "center",
                            mr: 2,
                            ...(props.active && {
                                color: "primary.main",
                            }),
                        }}
                    >
                        {props.icon}
                    </Box>
                )}
                <Box
                    component="span"
                    sx={{
                        color: "neutral.400",
                        flexGrow: 1,
                        fontFamily: theme.typography.fontFamily,
                        fontSize: 14,
                        fontWeight: 600,
                        lineHeight: "24px",
                        whiteSpace: "nowrap",
                        ...(props.active && {
                            color: "common.white",
                        }),
                        ...(props.disabled && {
                            color: "neutral.500",
                        }),
                    }}
                >
                    {props.title}
                </Box>
            </ButtonBase>
        </li>
    );
};

export default SideNav;
