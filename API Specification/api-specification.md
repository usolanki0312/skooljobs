# SkoolJobs — API Specification Learning Guide

> Goal: Learn to write the `openapi.yaml` file yourself, one phase at a time.  
> Each phase = one concept + one service. Read, understand, then write.  
> To preview your work: run `npm run swagger` → open `http://localhost:4000/api-docs`

---

## What is an OpenAPI Specification?

It is a standard way to **describe your REST API in a YAML (or JSON) file**.  
It tells everyone:
- What endpoints exist (`/api/login`, `/api/jobs`, etc.)
- What data to send in the request
- What data comes back in the response
- Which endpoints need a login token

No code needed — just a YAML file. Any tool (Swagger UI, Postman, Insomnia) can read it.

---

## Phase 1 — The Skeleton (Start Here)

**What you'll learn:** The basic structure every OpenAPI file must have.

Every `openapi.yaml` starts with these 4 sections:

```yaml
openapi: 3.0.3          # Version of the OpenAPI standard (always use 3.0.3)

info:                   # Basic info about your API
  title: SkoolJobs API
  version: 1.0.0
  description: API for the SkoolJobs teacher hiring platform

servers:                # Where your API runs
  - url: http://localhost:5000
    description: Local development

tags:                   # Group your endpoints by service (shows as sections in Swagger UI)
  - name: Auth & Users
    description: Login, register, OTP
  - name: Teacher Profiles
    description: Teacher profile management
  - name: School Profiles
    description: School profile management
  - name: Jobs
    description: Job posting and search
  - name: Applications
    description: Job applications
```

**Your task:** Create `openapi.yaml` inside the `API Specification/` folder and paste the skeleton above.

---

## Phase 2 — Your First Endpoint

**What you'll learn:** How to write one API endpoint in YAML.

All endpoints go inside a `paths:` section. Each path has one or more HTTP methods (`get`, `post`, `patch`, `delete`).

```yaml
paths:

  /api/auth/login:          # The URL path
    post:                   # HTTP method
      tags: [Auth & Users]  # Which group it belongs to (from tags above)
      summary: Login        # Short description shown in Swagger UI
      requestBody:          # What the caller must send
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [email, password]
              properties:
                email:
                  type: string
                  example: "rahul@gmail.com"
                password:
                  type: string
                  example: "mypassword123"
      responses:
        '200':              # HTTP status code for success
          description: Login successful
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  token:
                    type: string
                    example: "eyJhbGciOiJIUzI1NiJ9..."
        '401':              # HTTP status code for failure
          description: Invalid email or password
```

**Your task:** Add `paths:` to your YAML and write the `/api/auth/login` endpoint.

---

## Phase 3 — Reusable Schemas (components)

**What you'll learn:** How to avoid repeating yourself using `$ref`.

Instead of writing the same response shape 20 times, you define it once in `components/schemas` and reference it with `$ref`.

```yaml
components:
  schemas:

    # A standard error response — used by every endpoint
    ErrorResponse:
      type: object
      properties:
        success:
          type: boolean
          example: false
        message:
          type: string
          example: "Invalid credentials"
        code:
          type: string
          example: "UNAUTHORIZED"

    # A standard success response — used by endpoints that just return a message
    SuccessResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
        data:
          type: object
```

Now in your endpoint, instead of writing the full error shape every time, just reference it:

```yaml
        '401':
          description: Unauthorized
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'   # ← reuse it
```

**Your task:** Add `components/schemas` to your YAML with `ErrorResponse` and `SuccessResponse`. Update your login endpoint to use `$ref` for the 401 response.

---

## Phase 4 — Authentication (Bearer Token)

**What you'll learn:** How to mark endpoints that require login.

First, define the security scheme inside `components`:

```yaml
components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT   # We use JWT tokens
```

Then, on any endpoint that needs login, add:

```yaml
      security:
        - BearerAuth: []
```

Example — logout requires a valid token:

```yaml
  /api/auth/logout:
    post:
      tags: [Auth & Users]
      summary: Logout
      security:
        - BearerAuth: []    # ← This endpoint needs a token
      responses:
        '200':
          description: Logged out
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SuccessResponse'
        '401':
          description: Token missing or invalid
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
```

**Your task:** Add `securitySchemes` to your YAML. Add `security` to the logout endpoint.

---

## Phase 5 — Service 1: skooljobs_user (Auth & Users)

**What you'll learn:** Path parameters, query parameters, and a multi-step flow.

**Concept — Path parameter** (value inside the URL):

```yaml
  /api/users/{user_id}:     # {user_id} is a path parameter
    get:
      tags: [Auth & Users]
      summary: Get user by ID
      security:
        - BearerAuth: []
      parameters:
        - name: user_id       # Must match the name in the path
          in: path            # "path" means it's part of the URL
          required: true
          schema:
            type: string
            example: "USR-0001"
      responses:
        '200':
          description: User found
        '404':
          description: User not found
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
```

**Concept — Soft delete (PATCH, not DELETE)**  
In SkoolJobs, nothing is permanently deleted. We just mark it as inactive.  
So instead of `DELETE /api/users/{user_id}`, we use:

```yaml
  /api/users/{user_id}/status:
    patch:
      tags: [Auth & Users]
      summary: Activate or deactivate a user account
      security:
        - BearerAuth: []
      parameters:
        - name: user_id
          in: path
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [is_active]
              properties:
                is_active:
                  type: boolean
                  example: false     # false = deactivate (soft delete)
      responses:
        '200':
          description: Status updated
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SuccessResponse'
```

**Endpoints to write for this service:**

| Method | Path | Auth? | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Submit name, email, phone (Step 1) |
| POST | `/api/auth/send-otp` | No | Send OTP to phone/email |
| POST | `/api/auth/verify-otp` | No | Verify OTP code (Step 2) |
| POST | `/api/auth/complete-registration` | No | Set password (Step 3) |
| POST | `/api/auth/login` | No | Login, returns token |
| POST | `/api/auth/logout` | Yes | Logout |
| POST | `/api/auth/forgot-password` | No | Send reset link |
| POST | `/api/auth/reset-password` | No | Set new password |
| GET | `/api/users/me` | Yes | Get current user |
| PATCH | `/api/users/me/password` | Yes | Change password |
| GET | `/api/users/{user_id}` | Yes (Admin) | Get any user |
| PATCH | `/api/users/{user_id}/status` | Yes (Admin) | Soft deactivate user |

**Your task:** Write all 12 endpoints above in your YAML under the `Auth & Users` tag.

---

## Phase 6 — Service 2: teacher_profiles

**What you'll learn:** Nested resource endpoints and file upload.

**Concept — Nested resource**  
A teacher's qualifications live inside their profile. The URL reflects this:

```
/api/teacher-profiles/{user_id}/qualifications
```

This means: "the qualifications belonging to teacher with this user_id".

**Concept — Adding to an embedded array (POST)**

```yaml
  /api/teacher-profiles/{user_id}/qualifications:
    post:
      tags: [Teacher Profiles]
      summary: Add a qualification
      security:
        - BearerAuth: []
      parameters:
        - name: user_id
          in: path
          required: true
          schema: { type: string }
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                degree:
                  type: string
                  example: "B.Ed"
                year_passed:
                  type: string
                  example: "2015"
                university:
                  type: string
                  example: "DAVV Indore"
      responses:
        '201':
          description: Qualification added
```

**Concept — Soft delete from embedded array (PATCH)**

```yaml
  /api/teacher-profiles/{user_id}/qualifications/{id}:
    patch:
      tags: [Teacher Profiles]
      summary: Update or soft-delete a qualification
      security:
        - BearerAuth: []
      parameters:
        - name: user_id
          in: path
          required: true
          schema: { type: string }
        - name: id
          in: path
          required: true
          schema: { type: string }
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                is_active:
                  type: boolean
                  example: false    # Pass false to soft-delete this entry
```

**Concept — File upload (`multipart/form-data`)**

```yaml
  /api/teacher-profiles/{user_id}/photo:
    post:
      tags: [Teacher Profiles]
      summary: Upload profile photo
      security:
        - BearerAuth: []
      parameters:
        - name: user_id
          in: path
          required: true
          schema: { type: string }
      requestBody:
        required: true
        content:
          multipart/form-data:      # ← Different from application/json
            schema:
              type: object
              properties:
                photo:
                  type: string
                  format: binary    # ← This means it's a file
      responses:
        '200':
          description: Photo uploaded
```

**Endpoints to write for this service:**

| Method | Path | Description |
|---|---|---|
| POST | `/api/teacher-profiles` | Create profile |
| GET | `/api/teacher-profiles/{user_id}` | Get full profile |
| PATCH | `/api/teacher-profiles/{user_id}` | Update basic info |
| POST | `/api/teacher-profiles/{user_id}/photo` | Upload photo (file upload) |
| POST | `/api/teacher-profiles/{user_id}/qualifications` | Add qualification |
| PATCH | `/api/teacher-profiles/{user_id}/qualifications/{id}` | Edit / soft-delete |
| POST | `/api/teacher-profiles/{user_id}/experiences` | Add experience |
| PATCH | `/api/teacher-profiles/{user_id}/experiences/{id}` | Edit / soft-delete |
| POST | `/api/teacher-profiles/{user_id}/achievements` | Add award or course |
| PATCH | `/api/teacher-profiles/{user_id}/achievements/{id}` | Soft-delete |
| POST | `/api/teacher-profiles/{user_id}/resumes` | Upload or create resume |
| PATCH | `/api/teacher-profiles/{user_id}/resumes/{id}` | Soft-delete resume |
| POST | `/api/teacher-profiles/{user_id}/cover-letters` | Add cover letter |
| PATCH | `/api/teacher-profiles/{user_id}/cover-letters/{id}` | Soft-delete |
| GET | `/api/teacher-profiles/{user_id}/saved-jobs` | List saved jobs |
| POST | `/api/teacher-profiles/{user_id}/saved-jobs` | Save a job |
| PATCH | `/api/teacher-profiles/{user_id}/saved-jobs/{job_id}` | Unsave (soft-delete) |

**Your task:** Write all endpoints above in your YAML under the `Teacher Profiles` tag.

---

## Phase 7 — Service 3: school_profiles

**What you'll learn:** Nothing new here — same patterns as Phase 6. Just different data.

**Endpoints to write:**

| Method | Path | Description |
|---|---|---|
| POST | `/api/school-profiles` | Create school profile |
| GET | `/api/school-profiles/{school_id}` | Get school profile |
| PATCH | `/api/school-profiles/{school_id}` | Update profile |
| POST | `/api/school-profiles/{school_id}/logo` | Upload logo (file upload) |
| POST | `/api/school-profiles/{school_id}/cover` | Upload cover image |
| PATCH | `/api/school-profiles/{school_id}/verify` | Admin: verify school |
| PATCH | `/api/school-profiles/{school_id}/status` | Admin: suspend/restore |

**Your task:** Write all 7 endpoints under the `School Profiles` tag.

---

## Phase 8 — Service 4: jobs

**What you'll learn:** Query parameters for filtering/searching.

**Concept — Query parameters** (filters in the URL `?key=value`):

```yaml
  /api/jobs:
    get:
      tags: [Jobs]
      summary: List all active jobs
      parameters:
        - name: subject
          in: query           # "query" means it goes in the URL as ?subject=Mathematics
          required: false
          schema:
            type: string
            example: "Mathematics"
        - name: location
          in: query
          required: false
          schema:
            type: string
            example: "Bhopal"
        - name: page
          in: query
          required: false
          schema:
            type: integer
            default: 1
        - name: limit
          in: query
          required: false
          schema:
            type: integer
            default: 20
      responses:
        '200':
          description: List of jobs
```

**Concept — Action endpoints** (non-CRUD actions using PATCH):

```yaml
  /api/jobs/{job_id}/submit:    # "submit for review" is an action, not a CRUD update
    patch:
      tags: [Jobs]
      summary: Submit job for admin review
      security:
        - BearerAuth: []
      parameters:
        - name: job_id
          in: path
          required: true
          schema: { type: string }
      responses:
        '200':
          description: Submitted for review
```

**Endpoints to write:**

| Method | Path | Description |
|---|---|---|
| GET | `/api/jobs` | List jobs (with filters) |
| POST | `/api/jobs` | Create job (saves as draft) |
| GET | `/api/jobs/{job_id}` | Get job details |
| PATCH | `/api/jobs/{job_id}` | Update job |
| PATCH | `/api/jobs/{job_id}/submit` | Submit for admin review |
| PATCH | `/api/jobs/{job_id}/close` | Close job |
| PATCH | `/api/jobs/{job_id}/repost` | Repost a closed job |
| PATCH | `/api/jobs/{job_id}/review` | Admin: publish or reject |
| GET | `/api/jobs/recommendations` | Get recommended jobs (by skill) |
| GET | `/api/jobs/school/{school_id}` | Get school's own jobs |

**Your task:** Write all 10 endpoints under the `Jobs` tag.

---

## Phase 9 — Service 5: applications

**What you'll learn:** Status transition endpoints (workflow actions).

In applications, the status flows through a fixed sequence:

```
submitted → viewed_by_school → shortlisted → hired
                             ↘ rejected_by_school
teacher can also → withdraw
admin can override any status
```

Each status change is a separate PATCH action endpoint:

```yaml
  /api/applications/{application_id}/shortlist:
    patch:
      tags: [Applications]
      summary: School shortlists an applicant
      security:
        - BearerAuth: []
      parameters:
        - name: application_id
          in: path
          required: true
          schema: { type: string }
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                school_notes:
                  type: string
                  nullable: true
                  example: "Strong candidate, schedule interview"
      responses:
        '200':
          description: Applicant shortlisted
          content:
            application/json:
              schema:
                type: object
                properties:
                  success: { type: boolean }
                  data:
                    type: object
                    properties:
                      application_id: { type: string }
                      status: { type: string, example: "shortlisted" }
```

**Endpoints to write:**

| Method | Path | Who can call | Description |
|---|---|---|---|
| POST | `/api/applications` | Teacher | Submit application |
| GET | `/api/applications` | All (filtered by role) | List applications |
| GET | `/api/applications/{application_id}` | All | Get single application |
| PATCH | `/api/applications/{application_id}/shortlist` | School | Shortlist |
| PATCH | `/api/applications/{application_id}/reject` | School | Reject |
| PATCH | `/api/applications/{application_id}/hire` | School | Mark as hired |
| PATCH | `/api/applications/{application_id}/withdraw` | Teacher | Withdraw |
| PATCH | `/api/applications/{application_id}/admin-override` | Admin | Override status |

**Your task:** Write all 8 endpoints under the `Applications` tag.

---

## Quick Reference — YAML Patterns

| Concept | YAML key | Where it goes |
|---|---|---|
| Define a schema once | `components/schemas/MySchema` | Under `components` |
| Reuse a schema | `$ref: '#/components/schemas/MySchema'` | Inside any schema |
| URL path param `/users/{id}` | `in: path` under `parameters` | Under the method |
| URL query param `?page=1` | `in: query` under `parameters` | Under the method |
| JSON request body | `requestBody.content.application/json` | Under the method |
| File upload | `requestBody.content.multipart/form-data` | Under the method |
| Require login | `security: - BearerAuth: []` | Under the method |
| Soft delete | `PATCH` with `{ is_active: false }` body | As an endpoint |
| Action (not CRUD) | `PATCH /resource/{id}/action` | Separate path |
| Error response | `$ref: '#/components/schemas/ErrorResponse'` | Under each response code |
