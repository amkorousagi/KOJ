import {
  Card,
  Typography,
  Box,
  CardContent,
  CardHeader,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemIcon,
} from "@material-ui/core";
import {
  Add,
  AttachEmailOutlined,
  AttachFileOutlined,
} from "@mui/icons-material";
import { ListItemButton } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import LectureList from "../../Components/LectureList.js";
import MaterialList from "../../Components/MaterialList.js";
import { BASE_URL, DOWNLOAD_URL } from "../../config.js";
import AddMaterial from "./AddMaterial.js";
import MaterialDetail from "./MaterialDetail.js";
const AttachmentsIcon = ({ attachments }) => {
  if (attachments === undefined || attachments.length === 0) {
    return <></>;
  } else {
    async function handleFileDownload() {
      for await (const fileId of attachments) {
        //window.open(DOWNLOAD_URL + "/" + fileId, "_blank");
        const response = await fetch(DOWNLOAD_URL + "/" + fileId, {
          method: "get",
        });

        const filename = response.headers.get("pragma");
        console.log(filename);
        const file = await response.blob();
        const downloadUrl = window.URL.createObjectURL(file);
        const anchorElement = document.createElement("a");
        document.body.appendChild(anchorElement);
        anchorElement.download = filename; // a tag에 download 속성을 줘서 클릭할 때 다운로드가 일어날 수 있도록 하기
        anchorElement.href = downloadUrl; // href에 url 달아주기

        anchorElement.click(); // 코드 상으로 클릭을 해줘서 다운로드를 트리거
        console.log(anchorElement);
        document.body.removeChild(anchorElement); // cleanup - 쓰임을 다한 a 태그 삭제
        window.URL.revokeObjectURL(downloadUrl); // cleanup - 쓰임을 다한 url 객체 삭제
      }
    }
    return (
      <IconButton edge="end" onClick={handleFileDownload}>
        <AttachFileOutlined />
      </IconButton>
    );
  }
};
const Material = ({ userType, userId }) => {
  const { lectureId, lectureTitle } = useParams();
  const [materials, setMaterials] = React.useState([]);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openMaterial, setOpenMaterial] = React.useState(false);
  const [currentMaterial, setCurrentMaterial] = React.useState({});
  useEffect(() => {
    fetch(BASE_URL + "/api/readMaterial", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        lecture: lectureId,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("readMaterial ", data);
        setMaterials(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <MaterialDetail
        open={openMaterial}
        handleClose={() => {
          setOpenMaterial(false);
        }}
        currentMaterial={currentMaterial}
      />
      <AddMaterial
        open={openAdd}
        handleClose={() => {
          setOpenAdd(false);
        }}
        lecture_id={lectureId}
      />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{ textAlign: "left" }}
      >
        <Card variant="outlined">
          <CardContent style={{ minWidth: 500 }}>
            <Typography style={{ fontFamily: "Nanum Gothic" }}>
              <div
                style={{ textAlign: "center", fontWeight: 700, fontSize: 20 }}
              >
                {lectureTitle} 강의 자료
              </div>
            </Typography>
            <hr />
            <List
              style={{
                width: "100%",
                backgroundColor: "#F0F0F0",
              }}
            >
              <ListItemButton
                onClick={() => {
                  setOpenAdd(true);
                }}
              >
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="새로운 강의자료 추가" />
              </ListItemButton>
              <hr />
              {materials.map((item, index) => {
                return (
                  <ListItemButton
                    onClick={() => {
                      setCurrentMaterial(materials[index]);
                      setOpenMaterial(true);
                    }}
                  >
                    <ListItemText
                      primary={item.title}
                      secondary={new Date(item.created_date).toLocaleString(
                        "ko-KR"
                      )}
                    />
                    <AttachmentsIcon attachments={item.attachments} />
                  </ListItemButton>
                );
              })}
            </List>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};
export default Material;
