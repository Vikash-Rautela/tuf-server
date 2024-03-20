const connection = require('../config/dbConfig');

class Submission {
    static async create(submissionData) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO submissions SET ?', submissionData, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static async getAll(username) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM submissions WHERE username = ?', username, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
}

module.exports = Submission;