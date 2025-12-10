# End-to-End Testing Documentation - Technical Officer Tests

## Test Cases

### TC-001: Municipality Role-Based Access

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

### TC-002: External Maintainer Dashboard and Report Assignment

#### Scenario: Technical Officer Assigns Report to External Maintainer
**Description**: Technical officer forwards an approved report to an external maintainer using load-balancing algorithm.

**Test Steps**:
1. Login as municipality user with technical role
2. Navigate to assigned reports dashboard
3. Click on an ASSIGNED report (category: ROADS_URBAN_FURNISHINGS)
4. Click "Assign to External Maintainer" button
5. Verify system selects least-loaded external maintainer
6. Confirm assignment
7. Verify report status remains ASSIGNED
8. Check report now shows external maintainer assignment

**Expected Results**:
- Report can be assigned to external maintainer
- System automatically selects the least-loaded maintainer for that category
- Assignment succeeds with confirmation message
- Report status shows as assigned to external maintainer
- Technical officer can see who it was assigned to

**Actual Results**:
- Report can be assigned to external maintainer
- System automatically selects the least-loaded maintainer for that category
- Assignment succeeds with confirmation message
- Report status shows as assigned to external maintainer
- Technical officer can see who it was assigned to

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

