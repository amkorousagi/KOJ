import {
  Card,
  Box,
  CardContent,
  Button,
  Table,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Modal,
} from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";

const TestCase = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
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
            <div style={{ textAlign: "center" }}>테스트케이스 상세</div>
            <hr />
            <div style={{ overflow: "auto", height: "600px" }}>
              ab
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};

const Score = () => {
  const { scoreId } = useParams();
  const [testcaseId, SetTestcaseId] = React.useState(0);
  console.log(scoreId, " ", testcaseId);
  const [open, SetOpen] = React.useState(false);
  const rows = [
    { name: "testcase 1", result: "Pass", testcaseId: 1 },
    { name: "testcase 2", result: "Fail", testcaseId: 2 },
  ];
  return (
    <>
      <TestCase open={open} onClose={() => SetOpen(false)} />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{ textAlign: "left" }}
      >
        <Card variant="outlined">
          <CardContent>
            <div style={{ textAlign: "center" }}>채점 결과 상세</div>
            <hr />
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>테스트케이스</TableCell>
                    <TableCell>결과</TableCell>
                    <TableCell>상세 보기</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => {
                    return (
                      <TableRow>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.result}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => {
                              SetTestcaseId(row.testcaseId);
                              SetOpen(true);
                            }}
                            style={{ fontWeight: 800 }}
                          >
                            상세 보기
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};
export default Score;
