
const e = require('express');
const con = require('../config');



function getData(req, resp) {
    console.log("called");
    con.query("SELECT * FROM emp_info", (err, res) => {
        if (err) {
            resp.status(405).json({ message: "data is not fetched" })
        }
        else {
            resp.send(res);
        }
    })
}


///////for pagination,searching,sorting//////
function getDataBySort(req, resp) {
    const { search, sort, limit, offset } = req.body

    if (sort != '') {
        if (search != '') {
            con.query(`SELECT * FROM emp_info WHERE id like '${search}%' OR name like '${search}%' ORDER BY salary ${sort}  LIMIT ${limit} OFFSET ${offset}`, (err1, empData) => {
                if (err1) {
                    resp.status(405).json({ message: "data is not fetched" });
                }
                else {
                    con.query(`SELECT COUNT(*) AS total FROM emp_info WHERE id like '${search}%' OR name like '${search}%'`, (errr, result1) => {
                        if (errr) {
                            resp.status(407).json({ message: "count of data is not fetched" });
                        }
                        else {
                            resp.json({ data: empData, total: result1[0].total });
                        }
                    })
                }
            })
        }
        else {
            con.query(`SELECT * FROM emp_info  ORDER BY salary ${sort}  LIMIT ${limit} OFFSET ${offset}`, (err, empData) => {
                if (err) {
                    resp.status(405).json({ message: "data is not fetched" })
                }
                else {
                    {
                        con.query(`SELECT COUNT(*) AS total FROM emp_info ORDER BY salary ${sort}`, (errr, result) => {
                            if (errr) {
                                resp.status(407).json({ message: "count of data is not fetched" })
                            }
                            else {
                                resp.json({ data: empData, total: result[0].total });
                            }
                        })
                    }
                }
            })
        }
    }
    if (sort == '') {
        if (search != '') {
            // console.log(3);
            con.query(`SELECT * FROM emp_info where name like '${search}%' OR id like '${search}%' LIMIT ${limit} OFFSET ${offset}`, (err, empData2) => {
                if (err) {
                    resp.status(405).json({ message: "data is not fetched" })
                }
                else {
                    con.query(`SELECT COUNT(*) AS total FROM emp_info WHERE name like '${search}%' OR id like '${search}%'`, (errr, result2) => {
                        if (errr) {
                            resp.status(406).json({ message: "count of data is not fetched" })
                        }
                        else {
                            resp.json({ data: empData2, total: result2[0].total });
                        }
                    })
                }
            })
        }
        else {
            con.query("SELECT * FROM emp_info LIMIT ? OFFSET ?", [+limit, +offset], (err, empData) => {
                if (err) {
                    resp.status(405).json({ message: "data is not fetched" })
                }
                else {
                    con.query("SELECT COUNT(*) AS total FROM emp_info", (errr, result) => {
                        if (errr) {
                            resp.status(406).json({ message: "count of data is not fetched" })
                        }
                        else {
                            resp.json({ data: empData, total: result[0].total });
                        }
                    })
                }
            })
        }
    }

}
// if(sort!='')
// {
//     if(search !='')

//     console.log("2");
//     con.query(`SELECT * FROM emp_info WHERE id like '${search}%' OR name like '${search}%' LIMIT ${limit} OFFSET ${offset} `, (err, empData) => {
//         if (err) {
//             resp.status(405).json({ message: "data is not fetched" })
//         }
//         else {
//             con.query(`SELECT COUNT(*) AS total FROM emp_info WHERE id like '${search}%' OR name like '${search}%'`,(errr,result)=>{
//                 if(errr){
//                     resp.status(407).json({ message: "count of data is not fetched" })  
//                 }
//                 else{
//                     resp.json({data:empData,total:result[0].total});
//                 }
//             })
//         }
//     })
// }
// else if(search=='')
// {
//     console.log("3");
//     con.query(`SELECT * FROM emp_info  ORDER BY salary ${sort}  LIMIT ${limit} OFFSET ${offset}`, (err, empData) => {
//         if (err) {
//             resp.status(405).json({ message: "data is not fetched" })
//         }
//         else {
//             {
//                 con.query(`SELECT COUNT(*) AS total FROM emp_info ORDER BY salary ${sort}`,(errr,result)=>{
//                     if(errr){
//                         resp.status(407).json({ message: "count of data is not fetched" })  
//                     }
//                     else{
//                         resp.json({data:empData,total:result[0].total});
//                     }
//                 })
//             }
//         }
//     })
// }
//     else{
//         let send=true;
//         console.log("4");
//         con.query(`SELECT * FROM emp_info WHERE id like '${search}%' OR name like '${search}%' ORDER BY salary ${sort}  LIMIT ${limit} OFFSET ${offset}`, (err, empData) => {
//             if (err) {
//                 resp.status(405).json({ message: "data is not fetched" });
//             } else {
//                 con.query(`SELECT COUNT(*) AS total FROM emp_info WHERE id like '${search}%' OR name like '${search}%'`, (errr, result) => {
//                     if (errr) {
//                         resp.status(407).json({ message: "count of data is not fetched" });
//                      } 
//                      else {
//                         total=result[0].total;
//                         if(total<offset){
//                             offset=0;
//                             con.query(`SELECT * FROM emp_info WHERE id like '${search}%' OR name like '${search}%' ORDER BY salary ${sort}  LIMIT ${limit} OFFSET ${offset}`, (err1, empData) => {
//                                 if (err1) {
//                                     resp.status(405).json({ message: "data is not fetched" });
//                                 }
//                                 else{
//                                     con.query(`SELECT COUNT(*) AS total FROM emp_info WHERE id like '${search}%' OR name like '${search}%'`, (errr, result1) => {
//                                         if (errr) {
//                                             resp.status(407).json({ message: "count of data is not fetched" });
//                                         }
//                                         else{
//                                             send=false
//                                             resp.json({ data: empData, total: result1[0].total });
//                                         }
//                                     })
//                                 }
//                             })
//                         }
//                         else
//                         {
//                             if(send==true)
//                             resp.json({ data: empData, total: result[0].total });
//                         }
//                     }
//                 });
//             }
//         });
//     }



////////////

function getDataById(req, resp) {
    const id = req.params.id
    con.query("SELECT * FROM emp_info where id=?", id, (err, res) => {
        if (err) {
            resp.status(405).json({ message: "data is not fetched" })
        }
        else if (res.length < 1) {
            resp.status(405).json({ message: "id does not exist" });
        }
        else {
            // resp.send(res);
            resp.status(200).json(res)
        }
    })
}

function updateData(req, resp) {
    const id = req.params.id
    const { name, city, email, salary } = req.body
    if (email == "" || name == "" || salary == "" || city == "") {
        resp.status(408).json({ message: 'Insufficient data' });
    }
    else {
        con.query("SELECT * FROM emp_info where id=?", id, (err, res) => {
            if (err) {
                resp.status(405).json({ message: "data is not fetched" })
            }
            else if (res.length < 1) {
                resp.status(405).json({ message: "id does not exist" });
            }
            else {
                con.query("UPDATE emp_info SET name=? ,city=?,email=?,salary=? WHERE id=?", [name, city, email, salary, id], (err, res) => {
                    if (err) {
                        resp.status(407).json({ message: 'error in db during update' });
                    }
                    else {
                        resp.status(200).json({ message: "successfully Updated" })
                    }
                })
            }
        })

    }
}



function deleteData(req, resp) {
    const id = req.params.id;
    // console.log(id);
    let email = '';
    con.beginTransaction(err => {
        if (err) {
            resp.status(406).json({ message: "error starting transaction" });
            return;
        }
        con.query("SELECT email FROM emp_info WHERE id=?", id, (err, result) => {
            if (err) {
                con.rollback(() => {
                    resp.status(406).json({ message: "error in db" });
                });
                return;
            }

            if (result.length === 0) {
                con.rollback(() => {
                    resp.status(405).json({ message: "id does not exist" });
                });
                return;
            }

            email = result[0].email;
            console.log(email);

            con.query("DELETE FROM emp_info WHERE id=?", id, (err, res) => {
                if (err) {
                    con.rollback(() => {
                        resp.status(406).json({ message: "error in db" });
                    });
                    return;
                }

                // Query to delete from registration table
                con.query("DELETE FROM registration WHERE email=?", [email], (err, result) => {
                    if (err) {
                        con.rollback(() => {
                            resp.status(406).json({ message: "error in db" });
                        });
                        return;
                    }

                    // Commit the transaction if all queries succeed
                    con.commit(err => {
                        if (err) {
                            con.rollback(() => {
                                resp.status(406).json({ message: "error committing transaction" });
                            });
                            return;
                        }
                        else {
                            resp.status(200).json(result);
                        }
                    });
                });
            });
        });
    });
}




function insertData(req, resp) {
    const { id, name, city, email, salary } = req.body;
    const jsonData = req.body;
    con.beginTransaction(function (err) {
        if (err) {
            resp.status(408).json({ message: 'error starting transaction' });
            return;
        }
        con.query("INSERT INTO emp_info VALUE(?,?,?,?,?)", [id, name, city, email, salary], (err, result) => {
            if (err) {
                con.rollback(function () {
                    console.log(err.message);
                    resp.status(408).json({ message: 'error during insert into emp_info' });
                });
                return;
            }

            con.query("INSERT INTO attendance (email) VALUE (?)", [email], (error, result) => {
                if (error) {
                    con.rollback(function () {
                        resp.status(408).json({ message: 'error during insert into attendance' });
                    });
                    return;
                }
                con.query("INSERT INTO registration (name,email) VALUE(?,?)", [name, email], (err, result) => {
                    if (err) {
                        con.rollback(function () {
                            resp.status(409).json({ message: 'error during insert into registration' });
                        });
                        return;
                    }
                    con.commit(function (err) {
                        if (err) {
                            con.rollback(function () {
                                resp.status(408).json({ message: 'error committing transaction' });
                            });
                        }
                        else {
                             resp.status(200).json({ message: 'successfully Inserted' });
                            // fetch('https://hooks.zapier.com/hooks/catch/18794300/3j15qb5/', {
                            //     method: 'POST',
                            //     headers: {
                            //         'Content-Type': 'application/json',
                            //     },
                            //     body: JSON.stringify(jsonData)
                            // })
                            // .then(response => {
                            //     if (response.ok) {
                            //       console.log('Data forwarded to Zapier successfully.');
                            //       resp.send(response.status);
                            //     } else {
                            //       console.error('Failed to forward data to Zapier:', response.statusText);
                            //     }
                            //   })
                            //   .catch(error => {
                            //     console.error('Error forwarding data to Zapier:', error.message);
                            //     resp.status(500).send('Internal Server Error');
                            //   });
                        }
                    });
                });
            });
        });
    });
}


const checkRole = (role) => {
  return (req, res, next) => {
    const email = req.user; 
    con.query(`SELECT role FROM adminRole WHERE email=?`, [email], (err, result) => {

      if (err) {
        return res.status(500).json({ message: 'Error in database' });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: 'Role not found' });
      }
      const userRole = result[0].role;
      if (userRole !== role) {
        return res.status(406).json({ message: 'You do not have permission to perform this action' });
      }
      res.send(true);
    });
  };
};

module.exports = checkRole;







module.exports = {
    getData,
    getDataById,
    updateData,
    insertData,
    deleteData,
    getDataBySort
}