const XLSX = require("xlsx");
const fs = require("fs");

const jsonBuffer = fs.readFileSync('practices.json');
const jsonData = jsonBuffer.toString();

const jsonParser = JSON.parse(jsonData);

const jsonDashscore = jsonParser.dashscore;
const jsonMeta = jsonParser.meta;           

const jsonStudents = jsonMeta.students;
const jsonPractices = jsonMeta.practices;


let exelArr = [];
jsonDashscore.forEach(dashScore => {
    let tempObj = {};

    const found = jsonStudents.find(student => student["_id"] === dashScore.student);
    tempObj["이름"] = found["name"];
    tempObj["score"] = dashScore.score;
    
    jsonPractices.forEach(practices => {
        tempObj[practices.title] = dashScore[practices["_id"]];
        if(tempObj[practices.title] === undefined){
            tempObj[practices.title] = 0;
        }
    })

    exelArr = exelArr.concat(tempObj);
});

console.log("practices.json end", exelArr);



// 지금 파일 여는 데에 에러 처리 안 해줌
const sheet = XLSX.utils.json_to_sheet(exelArr);

const xlsxFile = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(xlsxFile, sheet);


/****************************************************/

const jsonBuffer22 = fs.readFileSync('problems.json');
const jsonData22 = jsonBuffer22.toString();

const jsonParser22 = JSON.parse(jsonData22);

const jsonDashscore22 = jsonParser22.dashscore;
const jsonMeta22 = jsonParser22.meta;           

const jsonStudents22 = jsonMeta22.students;
const jsonProblems22 = jsonMeta22.problems;

exelArr = [];
jsonDashscore22.forEach(dashScore => {
    let tempObj = {};

    const found = jsonStudents22.find(student => student["_id"] === dashScore.student);
    tempObj["이름"] = found["name"];
    tempObj["score"] = dashScore.score;
    
    jsonProblems22.forEach(problems => {
        tempObj[problems.title] = dashScore[problems["_id"]];
        if(tempObj[problems.title] === undefined){
            tempObj[problems.title] = 0;
        }
    })

    exelArr = exelArr.concat(tempObj);
});

console.log(exelArr);

// 지금 파일 여는 데에 에러 처리 안 해줌
const sheet22 = XLSX.utils.json_to_sheet(exelArr);

XLSX.utils.book_append_sheet(xlsxFile, sheet22);
XLSX.writeFile(xlsxFile, 'sample.xlsx');

console.log(1);
