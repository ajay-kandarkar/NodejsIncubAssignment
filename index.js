const connection = require('./connection');
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
var app = express();
app.use(cors());
app.use(bodyparser.json());
const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Cured operation Express API with Swagger",
            version: "0.1.0",
            description: "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
        },
        servers: [
            {
                url: 'http://localhost:8080'
            },
        ],
    },
    apis: ["./index.js"],
};
const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.get('/patientdetails', (req, res) => {
    connection.query('SELECT * FROM patient_screen', (err, row) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log(row);
            res.status(200).json(row);
        }
    });
});
app.get('/employe/:id', (req, res) => {
    const fetchid = req.params.id;
    connection.query('SELECT * FROM employee WHERE e_id=' + fetchid, (err, row) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log(row);
            res.status(200).json(row);
        }
    });
});
app.delete('/employe/:Id', (req, res) => {
    const deleteid = req.params.Id;
    connection.query('DELETE FROM employee WHERE e_id=' + deleteid, (err, row) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log(row);
            res.status(200).json(row);
        }
    });
});
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
app.post('/add-emp', (req, res) => {
    var name = req.body.e_name;
    var email = req.body.e_email;
    var salary = req.body.e_sal;
    if (!emailRegexp.test(email)) {
        return res.status(500).send('Email is not valid');
    }
    connection.query(
        `INSERT INTO employee (e_name,e_email,e_sal) VALUES (?, ?,?)`,
        [name, email, salary],
        (err, row) => {
            if (err && emailRegexp.test(email)) {
                res.status(500).send('Internal Server Error');
            } else {
                res.status(200).json(row);
            }
        }
    );
});
app.put('/update-emp/:id', (req, res) => {
    const id = req.params.id;
    var name = req.body.e_name;
    var email = req.body.e_email;
    var salary = req.body.e_sal;
    connection.query(
        "UPDATE employee SET e_name = ?,e_email=?,e_sal=? WHERE e_id =" + id,
        [name, email, salary],
        (err, row) => {
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
            } else {
                console.log(row);
                res.status(200).json(row);
            }
        }
    );
});
app.get('/get-doctors', (req, res) => {
    connection.query('SELECT * FROM doctors', (err, row) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log(row);
            res.status(200).json(row);
        }
    });
});
app.get('/get-country', (req, res) => {
    connection.query('SELECT * FROM country', (err, row) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log(row);
            res.status(200).json(row);
        }
    });
});
app.get('/state/:Id', (req, res) => {
    const Country_Id = req.params.Id;
    connection.query('SELECT * FROM state where Country_Id =' + Country_Id, (err, row) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log(row);
            res.status(200).json(row);
        }
    });
});
app.get('/get-allpatient-details', cors(), (req, res) => {
    connection.query(`SELECT * FROM patient`, (err, row) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log(row);
            res.status(200).json(row);
        }
    });
});
app.delete('/delete-patient/:Id', (req, res) => {
    const deleteId = req.params.Id;
    connection.query('DELETE FROM patient WHERE Id=' + deleteId, (err, row) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log(row);
            res.status(200).json(row);
        }
    });
});
app.post('/insert-patient-details', (req, res) => {
    var Name = req.body.Name;
    var Email = req.body.Email;
    var Gender = req.body.Gender;
    var DOB = req.body.DOB;
    var Address = req.body.Address;
    var Note = req.body.Note;
    var Mobile_No = req.body.Mobile_No;
    var IsCheck = req.body.IsChecked;
    var CountryId = req.body.CountryId;
    var DoctorId = req.body.DoctorId;
    connection.query(
        `INSERT INTO patient (Name, Email, Gender, DOB, Address, Note, Mobile_No, IsCheck, CountryId, DoctorId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [Name,Email,Gender,DOB,Address,Note,Mobile_No,IsCheck,CountryId, DoctorId],
        (err, row) => {
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
            } else {
                console.log(row);
                res.status(200).json(row);
            }
        }
    );
});
app.put('/update-patient-details/:Id', (req, res) => {
    var Id = req.params.Id;
    var Name = req.body.Name;
    var Email = req.body.Email;
    var Gender = req.body.Gender;
    var DOB = req.body.DOB;
    var Address =  req.body.Address;
    var Note = req.body.Note;
    var Mobile_No = req.body.Mobile_No;
    var IsCheck = req.body.IsChecked;
    var CountryId =  req.body.CountryId;
    var DoctorId =  req.body.DoctorId;
    connection.query(
        "UPDATE patient SET Name =?,Email=?,Gender=?,Dob=?,Address=?,Note=?,Mobile_no=?,IsCheck=?,countryid=?,doctorid=? WHERE Id =" + Id,
        [Name, Email, Gender, DOB, Address, Note, Mobile_No, IsCheck, CountryId,DoctorId],
        (err, row) => {
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
            } else {
                console.log(row);
                res.status(200).json(row);
            }
        }
    );
});
app.get('/get-Patient-Details-By/:Id', (req, res) => { 
    var Id = req.params.Id;
    connection.query(`SELECT * FROM patient Where Id=`+Id, (err, row) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log(row);
            res.status(200).json(row);
        }
    });
});
app.listen(8080, () => {
    console.log("server is connected");
});
