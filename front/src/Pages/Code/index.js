import {
  Card,
  Typography,
  Box,
  CardContent,
  Paper,
  TextField,
  Tabs,
  Tab,
} from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL, CODE_URL } from "../../config.js";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function allyProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Code = () => {
  const { submissionId } = useParams();
  const [value, setValue] = React.useState(0);
  const [submission, setSubmission] = React.useState({});
  const [codes, setCodes] = React.useState([]);

  useEffect(() => {
    fetch(BASE_URL + "/api/readSubmission", {
      method: "POST",
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: submissionId,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        data.data.code.map((item) => {
          fetch(CODE_URL + "/" + item, {
            method: "GET",
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              console.log(data);
              const c = codes.map((i) => {
                return i;
              });
              c.push(data);
              setCodes(c);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{ textAlign: "left" }}
    >
      <Card variant="outlined">
        <CardContent>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {codes.map((item, index) => {
              return <Tab label={item.file.name} {...allyProps(index)} />;
            })}
          </Tabs>
          {codes.map((item, index) => {
            return (
              <TabPanel
                value={value}
                index={index}
                style={{ whiteSpace: "pre-wrap" }}
              >
                {item.data}
              </TabPanel>
            );
          })}
        </CardContent>
      </Card>
    </Box>
  );
};
export default Code;
