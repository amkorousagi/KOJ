# API List

**BACK**

- [(BACK)/token](#001-back_iptoken)
- (BACK)/api/login
- (BACK)/api/createUsers
- (BACK)/api/adminUpdatePassword
- (BACK)/api/createLecture
- (BACK)/api/createEnrollment
- (BACK)/api/createPractice
- (BACK)/api/createProblem
- (BACK)/api/createTestcase
- (BACK)/api/createMaterial
- (BACK)/api/updateLecture
- (BACK)/api/updateMaterial
- (BACK)/api/updatePractice
- (BACK)/api/updateProblem
- (BACK)/api/updateTestcase
- (BACK)/api/deleteLecture
- (BACK)/api/deleteMaterial
- (BACK)/api/deletePractice
- (BACK)/api/deleteProblem
- (BACK)/api/deleteTestcase
- (BACK)/api/deleteUser
- (BACK)/api/createSubmission
- (BACK)/api/readLecture
- (BACK)/api/readPractice
- (BACK)/api/readProblem
- (BACK)/api/readProblem
- (BACK)/api/readTestcase
- (BACK)/api/readSubmission
- (BACK)/api/readProblemScore
- (BACK)/api/checkSubmission
- (BACK)/api/readMaterial
- (BACK)/api/readDashScore
- (BACK)/api/readEnrollment
- (BACK)/api/readUser
- (BACK)/api/updateUserPassword
- (BACK)/api/resubmission

**KOJ**

- (KOJ)/upload_file
- (KOJ)/upload_code
- (KOJ)/build_judge_environment/:testcase_id
- (KOJ)/request_judge/:submission_id

**MEDIA**

- (MEDIA)/file/:filename
- (MEDIA)/filename
- (MEDIA)/code/:filename
- (MEDIA)/string/:filename
- (MEDIA)/download/:filename
- (MEDIA)/file/:filename
- (MEDIA)/file

# #001 (BACK_IP)/token

### Description

get a token with header.
return user if the token is not expired and valid.

### HTTP Request

```
ALL (BACK)/token
```

### Path Parameter

### Query Parameter

### Request Header

| Header Name   | Header Value     |
| ------------- | ---------------- |
| Content-Type  | application/json |
| authorization | bearer token     |

### Request Body

### Response Header

### Response Body

| Where In | Value       |
| -------- | ----------- |
| data     | User object |

```json
{
  "data": {
    "id": "myId",
    "student_id": "20231234",
    "password": "myPassword",
    "name": "myName",
    "user_type": "student"
  }
}
```

---

# #002 (BACK_IP)/api/login

### Description

get id and password.
return new token if matching user.
expiration period of the token is 3 day in default.

### Endpoint

| URL        | HTTP Method |
| ---------- | ----------- |
| /api/login | POST        |

### Parameters

**Query Parameters**

:none

**Path Parmeters**

:none

**Request Body**

| Name     | Value  |
| -------- | ------ |
| id       | String |
| password | String |

**Header**

| Header Name  | Header Value     |
| ------------ | ---------------- |
| Content-Type | application/json |

### Response(json)

| Where In       | Value     |
| -------------- | --------- |
| data.token     | token     |
| data.user_type | user type |

---

# #003 (BACK_IP)/api/createUsers

### Description

for authorized admin user
get users .
return users.
expiration period of the token is 3 day in default.

### Endpoint

| URL              | HTTP Method |
| ---------------- | ----------- |
| /api/createUsers | POST        |

### Parameters

**Query Parameters**

:none

**Path Parmeters**

:none

**Request Body**

| Name     | Value  |
| -------- | ------ |
| id       | String |
| password | String |

**Header**

| Header Name  | Header Value     |
| ------------ | ---------------- |
| Content-Type | application/json |

### Response(json)

| Where In       | Value     |
| -------------- | --------- |
| data.token     | token     |
| data.user_type | user type |
