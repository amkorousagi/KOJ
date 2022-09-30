import {
  Card,
  Typography,
  Box,
  CardContent,
  CardHeader,
  Button,
  Modal,
  IconButton,
  Grid,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { Cancel } from "@mui/icons-material";
import React from "react";

const Score = ({ open, handleClose }) => {
  const rows = [
    {
      result: "맞았습니다",
      scoreId: 1,
      createDate: new Date("2022-09-17T03:24:00"),
    },
    {
      result: "틀렸습니다",
      scoreId: 2,
      createDate: new Date("2022-09-17T00:24:00"),
    },
  ];
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{
          textAlign: "left",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Card variant="outlined">
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>결과</TableCell>
                    <TableCell>소스코드 보기</TableCell>
                    <TableCell>채점결과 상세 보기</TableCell>
                    <TableCell>제출한 시간</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => {
                    return (
                      <TableRow>
                        <TableCell>{row.result}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => {
                              window.location.href = "/code/" + row.scoreId;
                            }}
                            style={{ fontWeight: 800 }}
                          >
                            소스코드
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => {
                              window.location.href = "/score/" + row.scoreId;
                            }}
                            style={{ fontWeight: 800 }}
                          >
                            채점결과
                          </Button>
                        </TableCell>
                        <TableCell>5분 전</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};
export default Score;
