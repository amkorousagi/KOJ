import {
  Card,
  Typography,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Icon,
  IconButton,
} from "@material-ui/core";
import { Add } from "@mui/icons-material";
import React from "react";
import { BASE_URL } from "../config.js";

const MaterialList = ({ userType, userId, title, lectureList, isCur }) => {
  const lectures = lectureList.map((item) => (
    <ListItem>
      <Button
        style={{
          width: "100%",
          textAlign: "left",
        }}
        onClick={() => {
          window.location.href = "/material/" + item._id + "/" + item.title;
        }}
      >
        <ListItemText
          primary={item.title + " (" + item.semester + ")"}
          secondary={item.lecturer.name + " 교수님"}
        />
      </Button>
    </ListItem>
  ));
  return (
    <Card variant="outlined">
      <CardContent style={{ minWidth: 500 }}>
        <Typography style={{ fontFamily: "Nanum Gothic" }}>
          <div style={{ textAlign: "center", fontWeight: 700, fontSize: 20 }}>
            {title}
          </div>
          <hr />
        </Typography>
        <List
          style={{
            width: "100%",
            backgroundColor: "#F0F0F0",
          }}
        >
          {lectures}
        </List>
      </CardContent>
    </Card>
  );
};
export default MaterialList;
