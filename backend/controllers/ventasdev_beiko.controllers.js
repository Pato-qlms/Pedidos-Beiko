//_______________________________________________________________________________________
const mysql = require('mysql');

//______________________________________________________________________________________
const ventasdev_beiko = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'patricio177',
  database: 'ventasdev_beiko',
  port: 3306,
});

// const ventasdev_beiko = mysql.createConnection({
// host: 'kayrossistemas.ddns.net',
//   user: 'root',
//   password: 'ka7224',
//   database: 'ventas_lean',
//   port: 3306,
// });

// const ventasdev_beiko = mysql.createConnection({
//   host: 'distleandro.ddns.net',
//   user: 'root',
//   password: 'ka7224',
//   database: 'ventas_lean',
//   port: 3306,
// });

//______________________________________________________________________________________

//_______________________________________________________________________________________
// --- Login Component ---
//_______________________________________________________________________________________
// const UsersListCont = (req, res) => {
//   ventasdev_beiko.query('SELECT Usuario, Pwd FROM Vendedores', (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// };

//_______________________________________________________________________________________
// --- General Context ---
//_______________________________________________________________________________________
// const ActuVendedoresCont = (req, res) => {
//   ventasdev_beiko.query('SELECT Actualizar FROM Vendedores', (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// };

//__________________________________________
// const TablesUpdateDoneCont = (req, res) => {
//   ventasdev_beiko.query(
//     'UPDATE Vendedores SET Actualizar = ? WHERE IdVendedor = ?',
//     [0, 1],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send('Value Updated');
//       }
//     }
//   );
// };

//_______________________________________
// const TablaClientesCont = (req, res) => {
//   ventasdev_beiko.query(
//     'SELECT IdCliente, RazonSocial, ListaPrecios, Descuento FROM Clientes',
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(result);
//       }
//     }
//   );
// };

//________________________________________
// const TablaProductosCont = (req, res) => {
//   ventasdev_beiko.query(
//     'SELECT IdProducto, Descripcion, Precio1, Precio2, Precio3, Precio4, Precio5, Precio6, Precio7 FROM Productos',
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(result);
//       }
//     }
//   );
// };
const ClavesControllers = (req, res) => {
  ventasdev_beiko.query('SELECT * FROM Claves', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};
//_______________________________________________________________________________________
const ClientesControllers = (req, res) => {
  ventasdev_beiko.query('SELECT * FROM Clientes', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};
//_______________________________________________________________________________________
const DatosComptesControllers = (req, res) => {
  ventasdev_beiko.query('SELECT * FROM DatosComptes', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};
//_______________________________________________________________________________________
const DeudaControllers = (req, res) => {
  ventasdev_beiko.query('SELECT * FROM Deuda', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};
//_______________________________________________________________________________________
const OperaItemsControllers = (req, res) => {
  ventasdev_beiko.query('SELECT * FROM Operaitems', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};
//_______________________________________________________________________________________
const ParametrosControllers = (req, res) => {
  ventasdev_beiko.query('SELECT * FROM Parametros', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};
//_______________________________________________________________________________________

//_______________________________________________________________________________________
const ProductosControllers = (req, res) => {
  ventasdev_beiko.query('SELECT * FROM Productos', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};
//_______________________________________________________________________________________
const TransportesControllers = (req, res) => {
  ventasdev_beiko.query('SELECT * FROM Transportes', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};
//_______________________________________________________________________________________
const VendedoresControllers = (req, res) => {
  ventasdev_beiko.query('SELECT * FROM Vendedores', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};
//_______________________________________________________________________________________
const OperaMesControlers = (req, res) => {
  ventasdev_beiko.query('SELECT * FROM Operames', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};
//_______________________________________________________________________________________

//_______________________________________________________________________________________

// const updateCheckControlers = (req, res) => {
//   ventasdev_beiko.query('SELECT * FROM Operames', (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// };
const UpdateCheckRequest = (req, res) => {
  // console.log(req);
  // const IdCompradores = req.params.IdCompradores;
  // console.log(IdCompradores);
  ventasdev_beiko.query(
    'SELECT Actualizar FROM Vendedores WHERE IdVendedores = 2',
    // 'SELECT Actualizar FROM Compradores WHERE IdCompradores = ?',
    // [IdCompradores],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};
//_______________________________________________________________________________________

const TablesUpdateDone = (req, res) => {
  // const IdCompradores = req.body.IdCompradores;
  // console.log(IdCompradores);
  ventasdev_beiko.query(
    'UPDATE Vendedores SET Actualizar = 0 WHERE IdVendedores = 2',
    // 'UPDATE Compradores SET Actualizar = ? WHERE IdCompradores = ?',
    // [0, IdCompradores],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};
//_______________________________________________________________________________________




module.exports = {
  // ActuVendedoresCont,
  // TablaClientesCont,
  // TablaProductosCont,
  // TablesUpdateDoneCont,
  // UsersListCont,
  ClientesControllers,
  ClavesControllers,
  DatosComptesControllers,
  DeudaControllers,
  ProductosControllers,
  OperaItemsControllers,
  VendedoresControllers,
  TransportesControllers,
  ParametrosControllers,
  OperaMesControlers,
 
  UpdateCheckRequest,
  TablesUpdateDone,
  
};

//_______________________________________________________________________________________
