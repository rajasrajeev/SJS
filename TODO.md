# TODO

## Earnings & Deduction CRU(D) for month tables
- [ ] Fix/implement CRUD for **EarningMonthlyMaster** and **EarningMonthlyMonthly** (master applies always; monthly applies only when payroll month entry exists).
- [ ] Fix/implement CRUD for **DeductionMonthlyMaster**, **DeductionMonthlyMonthly** (same master+monthly rule) and ensure advances follow existing models.

- [ ] Update/verify controllers and routes for any new endpoints or parameter expectations.
- [ ] Update frontend pages that currently show wrong data (MasterEarnings.jsx currently wired to deductions).
- [ ] Run quick sanity checks (start backend, hit endpoints, verify no runtime errors).

