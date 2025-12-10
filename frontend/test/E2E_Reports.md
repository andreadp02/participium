# End-to-End Testing Documentation - Report Workflow Tests

## Test Cases

### TC-001: Report Creation Workflow

#### Scenario: Successful Report Submission
**Description**: Authenticated citizen creates and submits a report.

**Test Steps**:
1. Navigate to `/reports/new`
2. Fill report form:
   - Title: "Pothole on Main Street"
   - Description: "Large pothole causing traffic hazard"
   - Category: Select "Roads and Urban Furnishings"
   - Location: Click on map at coordinates (45.123, 7.456)
3. Upload 2 photos
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
- Report is visible in citizen's dashboard

**Actual Results**:
- Form accepts all inputs
- Map shows selected location
- Photos upload successfully with preview
- Submission succeeds with confirmation message
- Report appears on main map with correct details
- Report status shows as "Pending Approval"
- Report is visible in citizen's dashboard

**Status**: PASS

#### Scenario: Report Submission with Validation Errors
**Description**: Report submission fails due to validation errors.

**Test Steps**:
1. Navigate to `/reports/new`
2. Attempt submission with:
   - Empty title
   - Description too short (<10 characters)
   - No photos uploaded
   - Invalid file type for photos (e.g., PDF)
3. Submit form

**Expected Results**:
- Validation errors displayed for each invalid field
- Form prevents submission until errors are fixed
- Clear error messages guide user to correct inputs
- No report is created

**Actual Results**:
- Validation errors displayed for each invalid field
- Form prevents submission until errors are fixed
- Clear error messages guide user to correct inputs
- No report is created

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
- First 3 photos upload successfully with preview
- 4th photo upload is rejected with error message: "Maximum 3 photos allowed"
- Report submits successfully with 3 photos
- All 3 photos are visible in report details

**Actual Results**:
- First 3 photos upload successfully with preview
- 4th photo upload is rejected with error message: "Maximum 3 photos allowed"
- Report submits successfully with 3 photos
- All 3 photos are visible in report details

**Status**: PASS

#### Scenario: Anonymous Report Submission
**Description**: Citizen submits report anonymously.

**Test Steps**:
1. Navigate to `/reports/new`
2. Fill report form with valid data
3. Check "Submit anonymously" checkbox
4. Submit report
5. Verify report appears as anonymous in public view
6. Verify citizen can still see their own report in dashboard

**Expected Results**:
- Anonymous checkbox available and functional
- Report submits successfully
- Report shows as "Anonymous" in public listings
- No citizen name visible to public
- Citizen can see own report in private dashboard
- Municipality staff cannot identify anonymous reporter initially

**Actual Results**:
- Anonymous checkbox available and functional
- Report submits successfully
- Report shows as "Anonymous" in public listings
- No citizen name visible to public
- Citizen can see own report in private dashboard
- Municipality staff cannot identify anonymous reporter initially

**Status**: PASS

### TC-002: Report Details and Status Tracking

#### Scenario: Citizen Views Report Details
**Description**: Citizen examines detailed information about their submitted report.

**Test Steps**:
1. Navigate to dashboard
2. Click on a report from the list
3. View report details page
4. Check all information (title, description, photos, location, status, category)
5. Verify map shows correct location

**Expected Results**:
- Report details page loads completely
- All report information displays correctly:
  - Title, description, category
  - All photos with captions
  - Location on map
  - Status and timestamps
- Map integration shows report location
- Status updates are visible with dates

**Actual Results**:
- Report details page loads completely
- All report information displays correctly:
  - Title, description, category
  - All photos with captions
  - Location on map
  - Status and timestamps
- Map integration shows report location
- Status updates are visible with dates

**Status**: PASS

#### Scenario: Report Status Updates Through Workflow
**Description**: Citizen observes status changes as report progresses through workflow.

**Test Steps**:
1. Submit a new report
2. Note initial status (PENDING_APPROVAL)
3. Have municipality user approve report
4. Check status changes to "ASSIGNED"
5. Have technical user update to "IN_PROGRESS"
6. Have technical user add comment
7. Have technical user update to "RESOLVED"
8. Verify final status and comment history

**Expected Results**:
- Initial status: PENDING_APPROVAL
- After approval: ASSIGNED status
- After work started: IN_PROGRESS status
- After completion: RESOLVED status
- Citizen can see status changes in real-time
- Status history is maintained with timestamps
- All comments visible in timeline

**Actual Results**:
- Initial status: PENDING_APPROVAL
- After approval: ASSIGNED status
- After work started: IN_PROGRESS status
- After completion: RESOLVED status
- Citizen can see status changes in real-time
- Status history is maintained with timestamps
- All comments visible in timeline

**Status**: PASS

### TC-003: Category-Based Report Routing

#### Scenario: Report Routes to Correct Technical Officer by Category
**Description**: Verify each report category routes to the correct technical office.

**Test Steps**:
1. Create reports in each category:
   - WATER_SUPPLY_DRINKING_WATER
   - ARCHITECTURAL_BARRIERS
   - SEWER_SYSTEM
   - PUBLIC_LIGHTING
   - WASTE
   - ROAD_SIGNS_TRAFFIC_LIGHTS
   - ROADS_URBAN_FURNISHINGS
   - PUBLIC_GREEN_AREAS_PLAYGROUNDS
   - OTHER
2. Have municipality user approve each report
3. For each approved report, verify it appears in correct technical officer's queue

**Expected Results**:
- WATER_SUPPLY_DRINKING_WATER → Environmental protection officer
- ARCHITECTURAL_BARRIERS → Urban planning specialist
- SEWER_SYSTEM → Public works project manager
- PUBLIC_LIGHTING → Public works project manager
- WASTE → Sanitation and waste management officer
- ROAD_SIGNS_TRAFFIC_LIGHTS → Traffic and mobility coordinator
- ROADS_URBAN_FURNISHINGS → Public works project manager
- PUBLIC_GREEN_AREAS_PLAYGROUNDS → Parks and green spaces officer
- OTHER → Municipal administrator
- Each category routes correctly
- Reports don't appear in wrong technical officer's queue
- External maintainer category matches report category

**Actual Results**:
- WATER_SUPPLY_DRINKING_WATER → Environmental protection officer
- ARCHITECTURAL_BARRIERS → Urban planning specialist
- SEWER_SYSTEM → Public works project manager
- PUBLIC_LIGHTING → Public works project manager
- WASTE → Sanitation and waste management officer
- ROAD_SIGNS_TRAFFIC_LIGHTS → Traffic and mobility coordinator
- ROADS_URBAN_FURNISHINGS → Public works project manager
- PUBLIC_GREEN_AREAS_PLAYGROUNDS → Parks and green spaces officer
- OTHER → Municipal administrator
- Each category routes correctly
- Reports don't appear in wrong technical officer's queue
- External maintainer category matches report category

**Status**: PASS

### TC-004: Report Approval/Rejection Workflow

#### Scenario: Public Relations Officer Approves Report
**Description**: Municipality public relations officer approves a pending report.

**Test Steps**:
1. Navigate to municipality dashboard (`/municipality/dashboard`)
2. View list of pending reports
3. Click on a pending report
4. Review report details and photos
5. Click "Approve" button
6. Confirm approval action

**Expected Results**:
- Dashboard shows pending reports list with count
- Report detail view shows all information and photos
- Approval button is visible and clickable
- Approval succeeds with confirmation message
- Report status changes to "ASSIGNED"
- Report is assigned to correct technical officer based on category
- Report is removed from pending list
- Citizen receives notification (if enabled)

**Actual Results**:
- Dashboard shows pending reports list with count
- Report detail view shows all information and photos
- Approval button is visible and clickable
- Approval succeeds with confirmation message
- Report status changes to "ASSIGNED"
- Report is assigned to correct technical officer based on category
- Report is removed from pending list
- Citizen receives notification (if enabled)

**Status**: PASS

#### Scenario: Public Relations Officer Rejects Report
**Description**: Municipality public relations officer rejects a report with reason.

**Test Steps**:
1. Access municipality dashboard
2. Select pending report
3. Click "Reject" button
4. Fill rejection form with reason:
   - "Insufficient information - please provide more details about the issue"
5. Submit rejection
6. Verify rejection confirmation
7. Check citizen notification

**Expected Results**:
- Rejection form displays and is required
- Report status changes to "REJECTED"
- Rejection reason is recorded and visible to citizen
- Report removed from pending list in municipality view
- Report marked as rejected in citizen's dashboard
- Citizen can see rejection reason
- Citizen has option to resubmit with more details
- Email/notification sent to citizen

**Actual Results**:
- Rejection form displays and is required
- Report status changes to "REJECTED"
- Rejection reason is recorded and visible to citizen
- Report removed from pending list in municipality view
- Report marked as rejected in citizen's dashboard
- Citizen can see rejection reason
- Citizen has option to resubmit with more details
- Email/notification sent to citizen

**Status**: PASS

#### Scenario: Rejection Reason Visibility
**Description**: Rejection reason is properly stored and displayed to citizen.

**Test Steps**:
1. Have municipality user reject a report with reason
2. Login as citizen who submitted the report
3. Navigate to their dashboard
4. Click on rejected report
5. View rejection details

**Expected Results**:
- Rejection reason clearly visible on report details page
- Reason is complete and unmodified
- Citizen can read why report was rejected
- Option to edit and resubmit is available

**Actual Results**:
- Rejection reason clearly visible on report details page
- Reason is complete and unmodified
- Citizen can read why report was rejected
- Option to edit and resubmit is available

**Status**: PASS

