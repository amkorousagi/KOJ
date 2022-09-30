import {
  Card,
  Typography,
  Box,
  CardContent,
  CardHeader,
  Button,
  Table,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";

const Score = () => {
  const { scoreId } = useParams();
  const [testcaseId, SetTestcaseId] = React.useState(0);
  const [open, SetOpen] = React.useState(false);
  const rows = [
    { name: "testcase 1", result: "Pass", testcaseId: 1 },
    { name: "testcase 2", result: "Fail", testcaseId: 2 },
  ];
  return (
    <>
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
