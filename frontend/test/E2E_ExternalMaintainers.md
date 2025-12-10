# End-to-End Testing Documentation - External Maintainer Tests

## Test Cases

### TC-001: External Maintainer Workflow and Report Management

#### Scenario: External Maintainer Views Assigned Reports
**Description**: External maintainer logs in and views their assigned reports.

**Test Steps**:
1. Navigate to `/login`
2. Login as external maintainer (Marco Rossi - marcorossi_em)
3. Verify redirected to external maintainer dashboard
4. View "My Reports" section
5. Verify reports are filtered by assigned category (ROADS_URBAN_FURNISHINGS)
6. Click on a report to view details

**Expected Results**:
- External maintainer dashboard loads with their reports
- Only reports from their assigned category appear
- Report details show full information and photos
- Can see assigned technical officer and citizen details

**Actual Results**:
- External maintainer dashboard loads with their reports
- Only reports from their assigned category appear
- Report details show full information and photos
- Can see assigned technical officer and citizen details

**Status**: PASS

#### Scenario: External Maintainer Updates Report Status
**Description**: External maintainer updates report status as work progresses.

**Test Steps**:
1. Login as external maintainer
2. Navigate to assigned report
3. Change status from ASSIGNED to IN_PROGRESS
4. Add comment: "Work started on pothole repair"
5. Submit status update
6. Later, update status to RESOLVED
7. Add final comment: "Pothole repaired and tested"
8. Verify status change

**Expected Results**:
- Status updates from ASSIGNED → IN_PROGRESS → RESOLVED
- Comments are saved with each update
- Status changes are visible in report history
- Citizen can see real-time status updates
- Report cannot be modified after RESOLVED status

**Actual Results**:
- Status updates from ASSIGNED → IN_PROGRESS → RESOLVED
- Comments are saved with each update
- Status changes are visible in report history
- Citizen can see real-time status updates
- Report cannot be modified after RESOLVED status

**Status**: PASS

### TC-002: Multi-User Collaboration on Reports

#### Scenario: Technical Officer and External Maintainer Collaborate via Comments
**Description**: Technical officer and external maintainer communicate through report comments.

**Test Steps**:
1. Technical officer adds comment: "Please prioritize - main street traffic issue"
2. External maintainer views report and reads comment
3. External maintainer adds comment: "Starting work tomorrow, estimated 2 days"
4. Technical officer sees comment and replies: "Thanks for the update"
5. Both users can see full comment thread
6. Comments persist when status is updated

**Expected Results**:
- Comments visible to both technical officer and external maintainer
- Comment thread shows chronological order
- Author type identified (Municipality vs External Maintainer)
- Comments remain visible through status updates
- Timestamp recorded for each comment

**Actual Results**:
- Comments visible to both technical officer and external maintainer
- Comment thread shows chronological order
- Author type identified (Municipality vs External Maintainer)
- Comments remain visible through status updates
- Timestamp recorded for each comment

**Status**: PASS

#### Scenario: Comments Blocked on Resolved Reports
**Description**: No new comments can be added after report is RESOLVED.

**Test Steps**:
1. View a RESOLVED report
2. Attempt to add comment
3. Try to edit existing comment

**Expected Results**:
- Comment input field is disabled/readonly
- Clear message: "Cannot comment on resolved reports"
- Edit buttons are removed
- Report history is preserved and immutable

**Actual Results**:
- Comment input field is disabled/readonly
- Clear message: "Cannot comment on resolved reports"
- Edit buttons are removed
- Report history is preserved and immutable

**Status**: PASS
