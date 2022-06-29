import { Button, Typography, List, ListItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useEffect, useState } from "react";
import TypesMenu from "./TypesMenu";
import LayersMenu from "./LayersMenu";
import VisibilityMenu from "./VisibilityMenu";
import { useSelector, useDispatch } from "react-redux";
import {
  updateMenuState,
  toggleMenuIsPopulated,
} from "../../../redux/reducers/menuSlice";

function MenuContainer() {
  const [localMenuState, setLocalMenuState] = useState({ EDIT_BUTTON: false });

  const dispatch = useDispatch();
  const cityIOdata = useSelector((state) => state.cityIOdataState.cityIOdata);

  // get local states from sub-components (TypesMenu, LayersMenu, VisibilityMenu)
  const [selectedTypeFromMenu, getSelectedTypeFromMenu] = useState({});
  const [layersMenu, getLayersMenu] = useState({});
  const [visibiltyMenu, getVisibilityMenu] = useState({});

  useEffect(() => {
    setLocalMenuState({
      ...localMenuState,
      SELECTED_TYPE: selectedTypeFromMenu,
      LAYERS_MENU: layersMenu,
      VISIBILTY_MENU: visibiltyMenu,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTypeFromMenu, layersMenu, visibiltyMenu]);

  // controls the menu state for the edit button
  const handleEditButtonClicks = (event) => {
    setLocalMenuState({
      ...localMenuState,
      [event.currentTarget.id]: !localMenuState[event.currentTarget.id],
    });
  };
  // dispatch the menu state to the redux store
  dispatch(updateMenuState(localMenuState));
  // flag when the menu is populated with data from the server (cityIOdata) and is ready to be used
  dispatch(toggleMenuIsPopulated(true));

  return (
    <>
      <List>
        <ListItem>
          <Button
            id={"EDIT_BUTTON"}
            variant="outlined"
            endIcon={
              localMenuState.EDIT_BUTTON ? <CloudUploadIcon /> : <EditIcon />
            }
            onClick={(e) => handleEditButtonClicks(e)}
          >
            <Typography>
              {localMenuState.EDIT_BUTTON ? "submit edits" : "start editing"}
            </Typography>
          </Button>
        </ListItem>

        <TypesMenu
          cityIOdata={cityIOdata}
          getSelectedTypeFromMenu={getSelectedTypeFromMenu}
        />

        <ListItem>
          <LayersMenu cityIOdata={cityIOdata} getLayersMenu={getLayersMenu} />
        </ListItem>
        <ListItem>
          <VisibilityMenu getVisibilityMenu={getVisibilityMenu} />
        </ListItem>
      </List>
    </>
  );
}

export default MenuContainer;
