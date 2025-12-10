# End-to-End Testing Documentation - Admin User Tests

## Test Cases

### TC-001: Administrative Functions

#### Scenario: Admin Creates Municipality User
**Description**: Admin creates a new municipality user account.

**Test Steps**:
1. Navigate to `/admin/users`
2. Click "Create User"
3. Fill form for municipality user
4. Submit creation

**Expected Results**:
- User creation succeeds
- New user can login with provided credentials
- User has municipality role permissions

**Actual Results**:
- User creation succeeds
- New user can login with provided credentials
- User has municipality role permissions

**Status**: PASS

### TC-002: External Maintainer Management (Admin)

#### Scenario: Admin Creates External Maintainer Account
**Description**: Admin creates a new external maintainer account with company details and category assignment.

**Test Steps**:
1. Navigate to `/admin/external-maintainers`
2. Click "Create External Maintainer"
3. Fill form with
4. Submit creation
5. Verify success message

**Expected Results**:
- External maintainer account created successfully
- Account can be viewed in external maintainer list
- Category assignment is correctly saved
- Success notification displayed

**Actual Results**:
- External maintainer account created successfully
- Account can be viewed in external maintainer list
- Category assignment is correctly saved
- Success notification displayed

**Status**: PASS

#### Scenario: Admin Views External Maintainer List
**Description**: Admin views all external maintainers with their assigned categories.

**Test Steps**:
1. Navigate to `/admin/external-maintainers`
2. View list of all external maintainers

**Expected Results**:
- List displays all external maintainers
- Each maintainer shows correct category assignment
- Information is clearly organized

**Actual Results**:
- List displays all external maintainers
- Each maintainer shows correct category assignment
- Information is clearly organized

**Status**: PASS
