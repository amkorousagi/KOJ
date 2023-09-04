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
  const [blank, setBlank] = React.useState("");

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
      .then(async (data) => {
        console.log(data);
        const c = [];
        for (const item of data.data.code) {
          await fetch(CODE_URL + "/" + item, {
            method: "GET",
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              c.push(data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        setCodes(c);

        await fetch(BASE_URL + "/api/readProblem", {
          method: "POST",
          headers: {
            Authorization: "bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            problem: data.data.problem,
          }),
        })
          .then((res) => {
            return res.json();
          })
          .then((d) => {
            console.log(d);
            let code_string = d.data.blank;
            for (const b of data.data.blank) {
              code_string = code_string.replace("#BLANK#", b);
            }
            setBlank(code_string);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(codes);
  if (codes.length !== 0) {
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
  } else {
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
              <Tab label={"제출한 빈칸"} {...allyProps(0)} />
            </Tabs>

            <TabPanel
              value={value}
              index={0}
              style={{ whiteSpace: "pre-wrap" }}
            >
              {blank}
            </TabPanel>
          </CardContent>
        </Card>
      </Box>
    );
  }
};
export default Code;
