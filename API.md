# #001 (BACK_IP)/token

### Description

get a token with header.
return user if the token is not expired and valid.

### Endpoint

| URL    | HTTP Method |
| ------ | ----------- |
| /token | Any         |

### Parameters

**Query Parameters**

:none

**Path Parmeters**

:none

**Request Body**

:none

**Header**

| Header Name   | Header Value     |
| ------------- | ---------------- |
| Content-Type  | application/json |
| authorization | bearer token     |

### Response(json)

| Where In | Value       |
| -------- | ----------- |
| data     | User object |

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
