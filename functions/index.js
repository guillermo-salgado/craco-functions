const functions = require('firebase-functions');
const { BigQuery } = require('@google-cloud/bigquery');

const projectId = "craco-dev";
const dataset = "craco";
const employeesTable = "employees";
const projectsTable = "projects";
const checksTable = "checks";

exports.createEmployee = functions.firestore
    .document(`${employeesTable}/{id}`)
    .onCreate((snap, context) => {
        // Gets data
        const row = snap.data();
        console.log(row);

        // Creates a client
        const bigquery = new BigQuery({
            projectId: projectId,
        });

        // Inserts data into a table
        return bigquery
            .dataset(dataset)
            .table(employeesTable)
            .insert([row]);
    });

exports.createProject = functions.firestore
    .document(`${projectsTable}/{id}`)
    .onCreate((snap, context) => {
        // Gets data
        const row = snap.data();
        console.log(row);

        // Creates a client
        const bigquery = new BigQuery({
            projectId: projectId,
        });

        // Inserts data into a table
        return bigquery
            .dataset(dataset)
            .table(projectsTable)
            .insert([row]);
    });

exports.createCheck = functions.firestore
    .document(`${checksTable}/{id}`)
    .onCreate((snap, context) => {
        // Gets data
        const value = snap.data();
        console.log(value);

        const row = {
            id: value.id,
            description: value.description,
            amount: value.amount,
            project: value.project.id,
            employee: value.employee.id,
        }
        console.log(row);

        // Creates a client
        const bigquery = new BigQuery({
            projectId: projectId,
        });

        // Inserts data into a table
        return bigquery
            .dataset(dataset)
            .table(checksTable)
            .insert([row]);
    });