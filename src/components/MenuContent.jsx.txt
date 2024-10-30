import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Stack from "@mui/material/Stack";
import MenuItem from "./MenuItem";

const secondaryListItems = [
  {
    image: "/images/menu_data.png",
    title: "Data Management",
    link: "/data-management",
  },
  {
    image: "/images/menu_modeltrain.png",
    title: "Model Training",
    link: "/model-training",
  },
  {
    image: "/images/menu_modelmanage.png",
    title: "Model Management",
    link: "/model-management",
  },
  {
    image: "/images/menu_simulation.png",
    title: "Simulation & Prediction",
    link: "/simulation",
  },
  {
    image: "/images/menu_permission.png",
    title: "Permissions",
    link: "/permissions",
  },
];

export default function MenuContent() {
  const navigate = useNavigate();
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List>
        {secondaryListItems.map((item) => {
          return (
            <ListItem key={item.title} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(item.link);
                }}
              >
                <MenuItem image={item.image} title={item.title} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Stack>
  );
}
