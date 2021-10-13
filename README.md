# Hiring-Form

is a simple MVC-based node.js application with the follwoing features:

- applicant answer some basic questions
- applicant uploads his cv
- all answers are uploaded to a shared google sheets sheet anlong with cv link
- CVs are uploaded to a shared google drive folder for recruiters to review

---
## Requirements

For development, you will need Node.js and npm installed in your environement.

## Install

    $ git clone https://github.com/alialaraby/hiring-form.git
    $ cd hiring-form
    $ npm i

## Configure app

For demo purposes, you can use my credentials for google apis (google drive and google spread sheets),
but it`s better to use your own:

- client_secret.json (in the root of the project folder)
- CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN (in the config folders)
- create attachment folder in the root directory

 Save