import { useState, useEffect } from "react";
import { CssBaseline } from "@mui/material/";
import { ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { updateCityIOtableName } from "./redux/reducers/cityIOdataSlice";
import queryString from "query-string";
import theme from "./theme";
// views
import CityScopeJS from "./views/CityScopeJS";
import CityIOviewer from "./views/CityIOviewer";

/**
get this tab URL and parse as a simple router to show the correct view
 **/

const App = () => {
  const dispatch = useDispatch();
  const [tableName, setTableName] = useState();

  // change the document title to the table name
  useEffect(() => {
    document.title = tableName ? `CityScopeJS | ${tableName}` : "CityScopeJS";
  }, [tableName]);

  const [viewSelectorState, setViewSelectorState] = useState();

  const selectView = (view, tableName) => {
    const cityIOtableName = tableName && tableName.toLowerCase();
    // check if tableName is a valid tableName
    if (cityIOtableName && cityIOtableName !== "") {
      setTableName(cityIOtableName);
      dispatch(updateCityIOtableName(cityIOtableName));
      setViewSelectorState(view);
    } else {
      setViewSelectorState("cityio");
    }
  };

  // on init, get the address URL to search for  a table
  useEffect(() => {
    const location = window.location;
    const parsed = queryString.parse(location.search);

    //a switch for the location.search and the parsed.tableName
    const keys = Object.keys(parsed);

    if (keys.includes("cityscope")) {
      selectView("cityscopejs", parsed.cityscope);
    } else {
      setViewSelectorState("cityio");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <>
        {/* otherwise show the editor  */}
        {viewSelectorState === "cityscopejs" && <CityScopeJS />}

        {/* otherwise, show the cityIOviewer */}
        {viewSelectorState === "cityio" && <CityIOviewer />}
      </>
    </ThemeProvider>
  );
};

export default App;
