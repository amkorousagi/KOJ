import {
  Card,
  Box,
  CardContent,
  Button,
  Modal,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  FormLabel,
  Typography,
  List,
  ListItem,
  IconButton,
} from "@material-ui/core";
import { Add, AttachFileOutlined, Close, Save } from "@mui/icons-material";
import { ListItemButton } from "@mui/material";
import React, { useEffect } from "react";
import { BASE_URL, DOWNLOAD_URL, FILE_URL } from "../../config.js";

const MaterialDetail = ({ open, handleClose, currentMaterial }) => {
  const [at, setAt] = React.useState([]);
  useEffect(() => {
    if (
      currentMaterial !== undefined &&
      Object.keys(currentMaterial).length !== 0
    ) {
      console.log(currentMaterial);

      Promise.all(
        currentMaterial.attachments.map(async (fileId) => {
          const response = await fetch(DOWNLOAD_URL + "/" + fileId, {
            method: "get",
          });
          const filename = decodeURIComponent(
            decodeURIComponent(response.headers.get("pragma"))
          );

          return (
            <ListItemButton
              onClick={async () => {
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
              }}
            >
              {filename}
              <AttachFileOutlined />
            </ListItemButton>
          );
        })
      ).then((values) => {
        setAt(values);
      });
    }
  }, [currentMaterial]);
  //lecture id 보내기

  return (
    <Modal open={open} onClose={handleClose}>
      <Box>
        <Card
          variant="outlined"
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{
            textAlign: "left",
            position: "absolute",
            top: "50%",
            left: "50%",
            minWidth: "500px",
            transform: "translate(-50%, -50%)",
            backfaceVisibility: "hidden",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <IconButton
            style={{ position: "absolute", top: 0, right: 0 }}
            onClick={handleClose}
          >
            <Close />
          </IconButton>
          <br />
          <Typography style={{ textAlign: "center", fontWeight: 800 }}>
            {currentMaterial ? currentMaterial.title : ""}
          </Typography>
          <hr />
          <CardContent>
            <Typography style={{ fontFamily: "Nanum Gothic" }}>
              <div
                style={{ textAlign: "center", fontWeight: 700, marginTop: 5 }}
              >
                {currentMaterial ? currentMaterial.body : ""}
              </div>
            </Typography>
          </CardContent>
          <hr />
          <List className="attachments">{at}</List>
        </Card>
      </Box>
    </Modal>
  );
};
export default MaterialDetail;
