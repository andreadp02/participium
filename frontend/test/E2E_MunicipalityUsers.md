# End-to-End Testing Documentation - Municipality User Tests

## Test Cases

### TC-001: Municipal Authority Workflow

#### Scenario: Municipality User Reviews Pending Reports
**Description**: Municipality user views and approves pending reports.

**Test Steps**:
1. Navigate to `/municipality/dashboard`
2. View list of pending reports
3. Click on a pending report
4. Review report details and photos
5. Select "Approve" action

**Expected Results**:
- Dashboard shows pending reports list
- Report detail view shows all information and photos
- Approval succeeds and report status changes to "Assigned"

**Actual Results**:
- Dashboard shows pending reports list
- Report detail view shows all information and photos
- Approval succeeds and report status changes to "Assigned"

**Status**: PASS

#### Scenario: Municipality User Rejects Report
**Description**: Municipality user rejects a report with reason.

**Test Steps**:
1. Access municipality dashboard
2. Select pending report
3. Choose "Reject" action
4. Enter rejection reason
5. Submit rejection

**Expected Results**:
- Report status changes to "Rejected"
- Rejection reason is recorded
- Report removed from pending list

**Actual Results**:
- Report status changes to "Rejected"
- Rejection reason is recorded
- Report removed from pending list

**Status**: PASS

### TC-002: Municipality Role-Based Access

#### Scenario: Public Relations Officer Access
**Description**: Municipality user with public relations role accesses appropriate dashboard.

**Test Steps**:
1. Login as municipality user with "municipal public relations officer" role
2. Verify dashboard shows reports section
3. Check access to pending reports
4. Attempt access to technical reports (should be denied)

**Expected Results**:
- User redirected to reports dashboard
- Can view and manage pending reports
- Access restricted based on role

**Actual Results**:
- User redirected to reports dashboard
- Can view and manage pending reports
- Access restricted based on role

**Status**: PASS

#### Scenario: Technical Office Staff Access
**Description**: Municipality user with technical role accesses assigned reports.

**Test Steps**:
1. Login as municipality user with technical role
2. Verify dashboard shows technical reports section
3. View reports assigned to their office
4. Update report status (In Progress, Resolved)
5. Verify status changes persist

**Expected Results**:
- User redirected to technical dashboard
- Can view office-specific reports
- Status updates work correctly
- Changes visible to citizens

**Actual Results**:
- User redirected to technical dashboard
- Can view office-specific reports
- Status updates work correctly
- Changes visible to citizens

**Status**: PASS

### TC-003: Multi-User Collaboration on Reports

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
