# Software process

In this document, we describe the software process type used, which is an iterative model.

## Iterative Model

An iterative life cycle model does not attempt to start with a full specification of
requirements. Instead, development begins by specifying and implementing just part of the
software, which can then be reviewed in order to identify further requirements. This process
is then repeated, producing a new version of the software for each cycle of the model.

We will work **iteratively** through creating a rough product through each iteration, then review it and improve in the next iteration and so until the whole product finished.

### Why an iterative model?

1. Requirements of the complete system are clearly defined and understood.

2. Major requirements must be defined; however, some details can evolve with time.

3. We are building and improving the product step by step. Hence we can track the defects at early stages. This avoids the downward flow of the defects

![diagram of iterative model](https://lh3.googleusercontent.com/XEiOQ-1DXRo6OULpH5wgzkR1ZmP5PUioQO4owqsw_q5eRiOtLFv5l9yzUE6lCP0IkFJu6Z1_MoaogkSyt6uV3TAnwovfzsvBLnziPp8BKTWEqk4s8aXtwnQqXv_XV4-Dk5B3GqgO)

Each iteration is divided into three phases, let’s add some detailed sub-phases.

### Software Phases

#### Phase 0 24/4/2022 ~ 29/4/2022

Design 0

- Write user and system requirements

- Design the system architecture

- Design Application Architecture

- Plan project phases

Implement 0

- Setting up environment

- Install necessary tools

Analysis 0

- Review each other documents

- Approve above documents

#### Phase 1  29/4/2022 ~ 03/5/2022

Design 1

- System Modeling

- UML Diagrams

- Use Case Diagrams

- Activity diagram

- State Machine diagram

- Interaction diagrams

- Detailed Class diagram

Implement 1

- Implement the database schema based on the designed class diagram in phase 1

- Create models relationships

- Setup the react project wireframes

- Create generic react components if present i.e (for CRUD operations)

Analysis 1

- Review each other designs

- Review Class diagram after creating the database

#### Phase 2 3/5/2022 ~ 8/5/2022

Design 2

- Modifications upon evolving new details in requirements

- Choose a primary design scheme for the UI i.e (color palette, button styles, ..etc)

Implement 2 (**Issues details are added upon reaching this phase**)

- \[Backend] User roles and Authentication

- \[Frontend] Registration and Login Pages with backend integration

- \[Testing] Authentication

- \[Backend] CRUD Staff members

- \[Frontend] CRUD Staff members with backend integration

- \[Testing] CRUD staff members

- \[Backend] CRUD Projects

- \[Frontend] CRUD Projects with backend integration

- \[Testing] CRUD Projects

Analysis 2

- Review each other code

- Testing all implemented features in this phase

- Requirements Verification and validation

#### Phase 3 8/5/2022 ~ 13/5/2022

Design 3

- Modifications upon evolving new details in requirements

Implement 3

- \[Backend] CRUD Bugs

- \[Frontend] CRUD Bugs with backend integration
    
- \[Testing] CRUD Bugs

Analysis

- Review All integrated code

- Extract new functions needed to be implemented in both backend and frontend.

#### Phase 4 13/5/2022 ~ 18/5/2022

Design 4

- Modifications upon evolving new details in requirements

- Refine the class diagram

- Refine application components architecture

Implement 4

- \[Testing] Test evolved remaining functions

- \[Backend] Implement the remaining functions reviewed from phase 3

- \[Frontend] Integrate all remaining functions with backend

Analysis 4

- Review Code

- Review Class diagram

#### Phase 5 18/5/2022 ~ 20/5/2022

Implement 5

- \[Testing] Release testing (Test the whole integrated system)

- Fix all bugs
  

#### Submission Phase 20/5/2022 ~ 22/5/2022

- Prepare a presentation video to show work and discuss analysis and design

- Final report
