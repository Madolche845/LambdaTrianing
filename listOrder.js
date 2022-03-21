const mysql = require("mysql");

module.exports.listOrderRDS = async (event) => {
  return new Promise(async (resolver) => {
    try {
      const con = await mysql.createConnection({
        host: "rds-mysql.cx5vkd1hxis9.ap-southeast-1.rds.amazonaws.com",
        user: "admin",
        password: "Mfec1234!",
      });

      con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        let sql = `select * from MyDBTest.orders`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          resolver({
            status: 200,
            success: true,
            data: result,
          });
          con.end();
        });
      });
    } catch (error) {
      console.log("err : ", error);
      resolver({ status: 400, success: false, err: error });
    }
  });
};