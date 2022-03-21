const mysql = require("mysql");
const uuid = require("uuid");

module.exports.createOrderRDS = async (event) => {
  return new Promise(async (resolver) => {
    try {
      const { productName, detail, total } = event.body;
      const id = uuid.v4();
      const con = await mysql.createConnection({
        host: "rds-mysql.cx5vkd1hxis9.ap-southeast-1.rds.amazonaws.com",
        user: "admin",
        password: "Mfec1234!",
      });

      con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        let sql = `insert into MyDBTest.orders (id,productName,detail,total) VALUE("${id}","${productName}","${detail}",${total})`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          resolver({
            status: 200,
            success: true,
            data: { id, productName, detail, total },
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