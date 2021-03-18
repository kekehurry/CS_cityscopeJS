import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CityIO from "./CityIO";
import Keystone from "./Keystone";
import { Container, Typography, makeStyles, Box } from "@material-ui/core";
import TableNameInput from "./TableNameInput";
import Page from "../../layouts/Page";

export default function CityScopeJS() {
    // wait for 'ready' flag from cityIO when app is ready to start
    const isCityIOready = useSelector((state) => state.READY);
    const useStyles = makeStyles((theme) => ({
        root: {
            "& > *": {
                margin: "auto",
                height: "100%",
                paddingBottom: theme.spacing(3),
                paddingTop: theme.spacing(3),
            },
        },
    }));

    const [selectedTable, setSelectedTable] = useState(null);

    const classes = useStyles();
    return (
        <Page className={classes.root} title="Home">
            <Container maxWidth="lg" className={classes.content}>
                <Typography color="textPrimary" variant="h1">
                    Projection tool
                </Typography>
                <Box mt={"3em"} />
                <Typography color="textPrimary">
                    This tool is used to project and display CityScopeJS tables
                    in passive mode, such as projectors, TVs, or other
                    non-interactive displays.
                </Typography>
                <Box mt={"2em"} />
                <Typography color="textPrimary" variant="caption">
                    start by selecting your CityScopeJS project. Note: Not all CityScope projects below are ready for CityScopeJS. 
                </Typography>
                <Box mt={"2em"} />
                <TableNameInput setSelectedTable={setSelectedTable} />
                {selectedTable && <CityIO tableName={selectedTable} />}
                {isCityIOready && selectedTable && <Keystone />}
            </Container>
        </Page>
    );
}