# Bug Tracking System

## User requirements

1. An administrator can add a project.
2. An administrator can add another administrator to the system.
3. A customer/staff member/administrator can open a bug to an existing project.
4. An administrator can add a staff member.
5. An administrator can add/remove a staff member from an existing project.
6. An administrator can assign a staff member to a bug.
7. An administrator can view bugs assigned to a specific staff member.
8. An administrator can view unassigned bugs.
9. A staff member can view bugs assigned to him.
10. A customer/staff member/administrator can view bugs (including their status) of a given project.
11. A staff member/administrator can close a bug as a duplicate, not reproducible, already fixed, or not a bug.
12. Customers, staff members, and administrators have a username and password that they use to login to the system.

## System requirements

1.1. An administrator can create/read/update/delete projects.
1.2. An administrator will enter the project name and description.
1.3. A project name must be unique.
2.1. New administrators can be added to the system by an existing administrator.
2.2. The new administrator will create a regular customer account.
2.3. Existing administrators can promote the account to an administrator.
3.1. New bugs can be opened from any account.
3.2. A title for the bug must be entered.
3.3. An optional description for the bug can be entered.
3.4. An existing project must be chosen for the new bug.
3.5. The bug status must be “new” when it’s opened.
4.1. Staff members can be added to the system by an existing administrator.
4.2. The new staff member will create a regular customer account.
4.3. Existing administrators can promote the account to a staff member.
5.1. An administrator can view a staff member profile page, then add/remove them as a staff member to/from a project.
6.1. For an unassigned bug, an administrator can assign a staff member.
6.2. The assigned staff member must belong to the project where the bug was opened.
6.3. The issue status must change automatically to “assigned”.
7.1. From the staff member profile page, administrators can view the bugs assigned to the staff member.
8.1. The administrator can view all unassigned bugs from all projects, or filter them to a specific project.
9.1. A staff member can view all bugs assigned to them from all projects or filter them to a specific project.
10.1. Any user can view all bugs of any project.
10.2. Bug information includes the assigned staff member (if any), the status of the bug, and, if closed as duplicate, the link to the existing duplicate bug.
11.1. A staff member or administrator can close a bug.
11.2. If the bug is a duplicate of another reported bug, the existing bug must be linked. The status of the bug must change to “duplicate”.
11.3. If the bug is not reproducible, the staff member or administrator must add a comment when marking it as “not reproducible”. The status of the bug must change to “not reproducible”.
11.4. If the bug is already fixed, the staff member or administrator must specify the version of the software when the bug was fixed. The status of the bug must change to “already fixed”.
11.5. If the bug is not really a bug (by design), the staff member or administrator must add a comment when marking it as “not a bug”. The status of the bug must change to “not a bug”.
12.1. Users new to the system can create a new account.
12.2. A newly created account is a “customer” unless promoted by an administrator.
12.3. The customer must specify username, password, and email when creating a new account.
12.4. Users can login with their username and password.
