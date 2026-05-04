# Security Specification for ConstructPro Inventory

## Data Invariants
1. A Purchase Order (PO) must reference an existing Purchase Requisition (PR).
2. A GRN must reference an existing PO.
3. Stock updates must only happen when a GRN is 'APPROVED'.
4. Role-Based Access:
   - STORE can create PRs, GRNs (Draft/Pending Approval).
   - MANAGER can approve PRs, POs, and GRNs.
   - ADMIN has full control.
   - QC can add QC Remarks to GRNs.
   - ACCOUNTS can view everything but only modify payment-related fields (if any).

## The Dirty Dozen Payloads
1. Attempt to create a PR as an unauthenticated user.
2. Attempt to approve a PR as a user with 'STORE' role.
3. Attempt to update a PO's `totalAmount` after it is marked 'COMPLETED'.
4. Attempt to create a GRN with a `receivedQuantity` greater than `orderedQuantity` (logical validation, though rules might just check types/presence).
5. Attempt to update stock quantity directly without a reference GRN.
6. Attempt to delete a 'COMPLETED' PO.
7. Attempt to inject a massive string (1MB) into a `qcRemarks` field.
8. Attempt to spoof `ownerId` in a PR.
9. Attempt to read a private `Vendor` profile without being signed in.
10. Attempt to change a User's role to 'ADMIN' from a non-admin account.
11. Attempt to create a Product with a duplicate SKU (rules can't easily check uniqueness without indexed collections, but we'll enforce schema).
12. Attempt to bypass multi-level approval by setting `status` to 'APPROVED' directly on create.

## Test Runner (Conceptual)
Tests will verify that these payloads return `PERMISSION_DENIED`.
