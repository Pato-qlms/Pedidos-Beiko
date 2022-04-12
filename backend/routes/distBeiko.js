//_______________________________________________________________________________________
const { Router } = require('express');
const router = Router();

//_______________________________________________________________________________________
const {
  ActuVendedoresCont,
  TablaClientesCont,
  TablaProductosCont,
  TablesUpdateDoneCont,
  UsersListCont,
  ClientesControllers,
  ClavesControllers,
  DatosComptesControllers,
  DeudaControllers,
  ProductosControllers,
  OperaItemsControllers,
  VendedoresControllers,
  OperaMesControlers,
  TransportesControllers,
  ParametrosControllers,
  TablesUpdateDone,
  UpdateCheckRequest,
  CompradoresControllers
  // UpdateCheckControllers
} = require('../controllers/ventasdev_beiko.controllers');


//_______________________________________________________________________________________
// --- Login Screen ---
//_______________________________________________________________________________________
//router.get('/usersList', UsersListCont);

//_______________________________________________________________________________________
// --- General Context ---
//_______________________________________________________________________________________
// router.get('/updateCheck', ActuVendedoresCont);

// router.put('/tablesUpdateDone', TablesUpdateDoneCont);

// router.get('/tablaClientes', TablaClientesCont);



// router.get('/updateCheck', UpdateCheckControllers);

router.get('/updateCheck', UpdateCheckRequest);

router.put('/tablesUpdateDone', TablesUpdateDone);

router.get('/tablaClientes', ClientesControllers);

router.get('/tablaClaves', ClavesControllers);

router.get('/tablaDatosComptes', DatosComptesControllers);

router.get('/tablaDeuda', DeudaControllers);

router.get('/tablaProductos', ProductosControllers);

router.get('/tablaOperaItems', OperaItemsControllers);

router.get('/tablaOperaMes', OperaMesControlers);

router.get('/tablaTransporte', TransportesControllers);

router.get('/tablaVendedores', VendedoresControllers);



router.get('/tablaParametros', ParametrosControllers);

// router.get('/numPedido', NumPedidoCont);

// router.put('/updateNumPedido', UpdateNumPedidoCont);

// router.post('/pedido', EnviarPedidoCont);

//_______________________________________________________________________________________

//_______________________________________________________________________________________
//_______________________________________________________________________________________
module.exports = router;

//_______________________________________________________________________________________
