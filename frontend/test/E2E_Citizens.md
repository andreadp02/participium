# End-to-End Testing Documentation - Citizen Tests

## Test Cases

### TC-001: User Registration and Authentication

#### Scenario: Successful Citizen Registration
**Description**: A new citizen successfully registers and logs in.

**Test Steps**:
1. Navigate to `/register`
2. Fill registration form with valid data:
   - Username: testuser001
   - Email: testuser001@example.com
   - Password: TestPass123!
   - First Name: John
   - Last Name: Doe
3. Submit registration
4. Navigate to `/login`
5. Enter credentials (username/email and password)
6. Click login button
7. Verify dashboard access

**Expected Results**:
- Registration succeeds with success message
- User is redirected to login page
- Login succeeds and redirects to dashboard

**Actual Results**:
- Registration succeeds with success message
- User is redirected to login page
- Login succeeds and redirects to dashboard

**Status**: PASS

#### Scenario: Registration with Invalid Data
**Description**: Registration fails with invalid input.

**Test Steps**:
1. Navigate to `/register`
2. Attempt registration with:
   - Invalid email format
   - Password too short (<6 characters)
   - Empty required fields
3. Submit form

**Expected Results**:
- Form validation prevents submission
- Error messages displayed for each invalid field
- Registration does not proceed

**Actual Results**:
- Form validation prevents submission
- Error messages displayed for each invalid field
- Registration does not proceed

**Status**: PASS

### TC-002: Report Creation Workflow

#### Scenario: Successful Report Submission
**Description**: Authenticated citizen creates and submits a report.

**Test Steps**:
1. Navigate to `/reports/new`
2. Fill report form:
   - Title: "Pothole on Main Street"
   - Description: "Large pothole causing traffic hazard"
   - Category: Select "Road Damage"
   - Location: Click on map at coordinates (45.123, 7.456)
3. Upload photos
4. Submit report
5. Verify success confirmation
6. Check report appears on map

**Expected Results**:
- Form accepts all inputs
- Map shows selected location
- Photos upload successfully with preview
- Submission succeeds with confirmation message
- Report appears on main map with correct details
- Report status shows as "Pending Approval"

**Actual Results**:
- Form accepts all inputs
- Map shows selected location
- Photos upload successfully with preview
- Submission succeeds with confirmation message
- Report appears on main map with correct details
- Report status shows as "Pending Approval"

**Status**: PASS

#### Scenario: Report Submission with Validation Errors
**Description**: Report submission fails due to validation errors.

**Test Steps**:
1. Navigate to `/reports/new`
2. Attempt submission with:
   - Empty title
   - Description too short (<10 characters)
   - No photos uploaded
   - Invalid file type for photos
3. Submit form

**Expected Results**:
- Validation errors displayed for each invalid field
- Form prevents submission until errors are fixed
- Clear error messages guide user to correct inputs

**Actual Results**:
- Validation errors displayed for each invalid field
- Form prevents submission until errors are fixed
- Clear error messages guide user to correct inputs

**Status**: PASS

#### Scenario: Report with Maximum Photos
**Description**: User uploads maximum allowed photos (3).

**Test Steps**:
1. Navigate to `/reports/new`
2. Fill valid report details
3. Upload exactly 3 photos
4. Attempt to upload 4th photo
5. Submit report

**Expected Results**:
- First 3 photos upload successfully
- 4th photo upload is rejected with error message
- Report submits successfully with 3 photos

**Actual Results**:
- First 3 photos upload successfully
- 4th photo upload is rejected with error message
- Report submits successfully with 3 photos

**Status**: PASS

### TC-003: Citizen Dashboard and Profile Management

#### Scenario: Citizen Views Dashboard Statistics
**Description**: Citizen views their personal dashboard with reports.

**Test Steps**:
1. Login as citizen user
2. Navigate to dashboard
3. View total, approved and rejected reports

**Expected Results**:
- Dashboard loads the correct number of reports and specify which are approved and which are rejected

**Actual Results**:
- Dashboard loads the correct number of reports and specify which are approved and which are rejected

**Status**: PASS

#### Scenario: Citizen Updates Profile Information
**Description**: Citizen modifies their profile settings.

**Test Steps**:
1. Navigate to user settings
2. Update Telegram username
3. Toggle notification preferences
4. Upload profile photo
5. Save changes

**Expected Results**:
- Profile information updates successfully
- Changes persist across sessions
- Photo uploads and displays correctly

**Actual Results**:
- Profile information updates successfully
- Changes persist across sessions
- Photo uploads and displays correctly

**Status**: PASS

### TC-004: Report Details and Status Tracking

#### Scenario: Citizen Views Report Details
**Description**: Citizen examines detailed information about their submitted report.

**Test Steps**:
1. Navigate to dashboard
2. Click on a report from the list
3. View report details page
4. Check all information (title, description, photos, location, status)
5. Verify map shows correct location

**Expected Results**:
- Report details page loads completely
- All report information displays correctly
- Map integration shows report location
- Status updates are visible

**Actual Results**:
- Report details page loads completely
- All report information displays correctly
- Map integration shows report location
- Status updates are visible

**Status**: PASS

#### Scenario: Report Status Updates
**Description**: Citizen observes status changes as report progresses through workflow.

**Test Steps**:
1. Submit a new report
2. Note initial status (Pending Approval)
3. Have municipality user approve report
4. Check status changes to "Assigned"
5. Have technical user update to "In Progress"
6. Verify status reflects current state

**Expected Results**:
- Status updates correctly through workflow
- Citizen can see status changes in real-time
- Status history is maintained

**Actual Results**:
- Status updates correctly through workflow
- Citizen can see status changes in real-time
- Status history is maintained

**Status**: PASS
