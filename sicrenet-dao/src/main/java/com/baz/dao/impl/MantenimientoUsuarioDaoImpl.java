package com.baz.dao.impl;

import static com.baz.dao.util.Conexion.getConnection;

import java.io.Serializable;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.PaisVO;
import com.baz.commons.vo.RolesVO;
import com.baz.commons.vo.UsuarioPaisVO;
import com.baz.commons.vo.UsuariosVO;
import com.baz.dao.MantenimientoUsuarioDao;

import oracle.jdbc.OracleTypes;

@Named("mantenimientoUsuarioDaoImpl")
public class MantenimientoUsuarioDaoImpl implements MantenimientoUsuarioDao, Serializable {

	private static final long serialVersionUID = 1L;
	 private final Logger logger 
	    = LoggerFactory.getLogger(MantenimientoUsuarioDaoImpl.class);

	@PersistenceContext(unitName = "seguridad", type = PersistenceContextType.EXTENDED)
	private EntityManager entityManager;

	
	

public List<UsuariosVO> getUsers() throws ExcepcionSicrenet {
	try {
		entityManager.getTransaction().begin();
		Connection connection = getConnection(entityManager);

		ResultSet rs = null;
		String sp = "{call SEGURIDAD.SP_MANTO_USUARIOS(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
		CallableStatement callableStatement = connection.prepareCall(sp);
		callableStatement.setInt(1, 8);
		callableStatement.setInt(2, 0);
		callableStatement.setString(3, null);
		callableStatement.setBigDecimal(4, null);
		callableStatement.setString(5, null);
		callableStatement.setString(6, null);
		callableStatement.setString(7, null);
		callableStatement.setString(8, null);
		callableStatement.setString(9, null);
		callableStatement.setString(10, null);
		callableStatement.setString(11, null);
		callableStatement.setInt(12, 0);
		callableStatement.setString(13, null);
		callableStatement.setInt(14, 0);
		callableStatement.setString(15, null);
		callableStatement.setInt(16, 0);
		callableStatement.setInt(17, 1);
		callableStatement.registerOutParameter(18, OracleTypes.VARCHAR);
		callableStatement.registerOutParameter(19, OracleTypes.VARCHAR);
		callableStatement.registerOutParameter(20, OracleTypes.VARCHAR);
		callableStatement.registerOutParameter(21, OracleTypes.CURSOR);

		callableStatement.execute();
		rs = (ResultSet) callableStatement.getObject(21);
		// List<CatPanelView> listCatPanelView = new
		// ArrayList<CatPanelView>();

		List<UsuariosVO> listusuarios = new ArrayList<UsuariosVO>(); 
		while (rs.next()) {
			System.out.println("Entra al while:::::");
			UsuariosVO usuarios = new UsuariosVO(
					rs.getString("NUMEMPLEADO"),
					rs.getString("CENTROCOSTOS"),
					rs.getString("NOMBRE"),
					rs.getString("DIRECCION"),
					rs.getLong("BLOQUEO"),
					rs.getBigDecimal("IDROL"),
					rs.getString("APATERNO"),
					rs.getString("AMATERNO"),
					rs.getString("GERENCIA"),
					rs.getString("CORREO"),
					rs.getInt("ESTATUS"),
					rs.getString("DESESTATUS"),
					rs.getString("DESBLOQUEO"),
					rs.getBigDecimal("ID_PAIS")
					);
			listusuarios.add(usuarios);
			
			System.out.println("getUsuer:::numemeplado:::"+rs.getString("DESESTATUS"));
		}
		
		
		entityManager.getTransaction().commit();
		return listusuarios;
	}  catch (Exception e) {
		logger.warn("Sicrenet::MantenimientoUserDaoImpl::" 
                + "getUsuer::" + e.getMessage());
		throw new ExcepcionSicrenet("ERROR!. Base de Datos",e);
	}

	
}



	
	/*
	public List<CatUsuarios> getUsers(int Status) {
		Query query = entityManager.createNamedQuery("CatUsuarios.findByEstatus", CatUsuarios.class);
		 query.setParameter("estatus", Status);
		// query.setParameter("password", password);
		CatUsuarios users = new CatUsuarios();
		List<CatUsuarios> listUsers = new ArrayList<CatUsuarios>();
		query.setHint("javax.persistence.cache.storeMode", "REFRESH");
		listUsers = query.getResultList();
		
		// entityManager.persist(arg0);
		// entityManager.merge(arg0)
		return listUsers;

	}*/

	public UsuariosVO agregaUsers(UsuariosVO AgregarUsuarios, RolesVO rol, int bloqueo, String usuario, PaisVO pais, List<String> listaIdPais) throws ExcepcionSicrenet {

		try {
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);

			String sp = "{call SEGURIDAD.SP_MANTO_USUARIOS(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, 1);
			callableStatement.setInt(2, 0);
			callableStatement.setString(3, AgregarUsuarios.getNumempleado());
			callableStatement.setBigDecimal(4, rol.getIdrol());
			callableStatement.setString(5, AgregarUsuarios.getNombre());
			callableStatement.setString(6, AgregarUsuarios.getApaterno());
			callableStatement.setString(7, AgregarUsuarios.getAmaterno());
			callableStatement.setString(8, AgregarUsuarios.getDireccion());
			callableStatement.setString(9, AgregarUsuarios.getGerencia());
			callableStatement.setString(10, AgregarUsuarios.getCentrocostos());
			callableStatement.setString(11, AgregarUsuarios.getCorreo());
			callableStatement.setInt(12, 0);
			callableStatement.setString(13, usuario);
			callableStatement.setInt(14, bloqueo);
			callableStatement.setString(15, null);
			callableStatement.setInt(16, pais.getIdPais().intValue());
			callableStatement.setInt(17, 1);
			callableStatement.registerOutParameter(18, OracleTypes.VARCHAR);
			callableStatement.registerOutParameter(19, OracleTypes.VARCHAR);
			callableStatement.registerOutParameter(20, OracleTypes.VARCHAR);
			callableStatement.registerOutParameter(21, OracleTypes.CURSOR);
			callableStatement.execute();

			//rs = (ResultSet) callableStatement.getObject(21);
			
//			if(rs.next()){
//				String numEmpleado = rs.getString("NUMEMPLEADO");
			System.out.println("MantenimientoUserDaoImpl::::listaIdPaisDAO::::::"+ listaIdPais.size());
			System.out.println("MantenimientoUserDaoImpl::::numEmpleadoDAO::::::"+ AgregarUsuarios.getNumempleado());
			
			
				for( Integer i = 0; i < listaIdPais.size(); i++){
					String sp2 = "{call SEGURIDAD.SP_MANTO_USR_PAIS(?,?,?,?,?,?,?,?)}";
					CallableStatement callableStatement2 = connection.prepareCall(sp2);
					callableStatement2.setInt(1, 2);
					callableStatement2.setInt(2, 0);
					callableStatement2.setString(3, AgregarUsuarios.getNumempleado());
					callableStatement2.setInt(4, Integer.valueOf(listaIdPais.get(i)));
					callableStatement2.setInt(5, 1);
					callableStatement2.registerOutParameter(6,OracleTypes.CURSOR );
					callableStatement2.registerOutParameter(7,OracleTypes.VARCHAR );
					callableStatement2.registerOutParameter(8,OracleTypes.VARCHAR );
					callableStatement2.execute();
					System.out.println("MantenimientoUserDaoImpl::::Paises Seleccionados::::listaIdPais::::::"+ listaIdPais.get(i));
					}
				System.out.println("MantenimientoUserDaoImpl::::Paises Seleccionados::::LISTO!!!::::::");
				//}
			

			entityManager.getTransaction().commit();
		} catch (Exception e) {
			logger.warn("Sicrenet::MantenimientoUserDaoImpl::" 
	                + "agregaUsers::" + e.getMessage());
			 e.printStackTrace();
			throw new ExcepcionSicrenet("ERROR!. Base de Datos" );
		}

		return null;
	}

	public UsuariosVO actualizaUsers(UsuariosVO ActualizaUsuarios, RolesVO rol, int bloqueo, String usuario, PaisVO pais) throws ExcepcionSicrenet {

		try {
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);

		
			String sp = "{call SEGURIDAD.SP_MANTO_USUARIOS(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, 2);
			callableStatement.setInt(2, 0);
			callableStatement.setString(3, ActualizaUsuarios.getNumempleado());
			callableStatement.setBigDecimal(4, rol.getIdrol());
			callableStatement.setString(5, ActualizaUsuarios.getNombre());
			callableStatement.setString(6, ActualizaUsuarios.getApaterno());
			callableStatement.setString(7, ActualizaUsuarios.getAmaterno());
			callableStatement.setString(8, ActualizaUsuarios.getDireccion());
			callableStatement.setString(9, ActualizaUsuarios.getGerencia());
			callableStatement.setString(10, ActualizaUsuarios.getCentrocostos());
			callableStatement.setString(11, ActualizaUsuarios.getCorreo());
			callableStatement.setInt(12, 0);
			callableStatement.setString(13, null);
			callableStatement.setInt(14, bloqueo);
			callableStatement.setString(15,  usuario);
			callableStatement.setBigDecimal(16, pais.getIdPais());
			callableStatement.setInt(17, ActualizaUsuarios.getStatus());
			callableStatement.registerOutParameter(18, OracleTypes.VARCHAR);
			callableStatement.registerOutParameter(19, OracleTypes.VARCHAR);
			callableStatement.registerOutParameter(20, OracleTypes.VARCHAR);
			callableStatement.registerOutParameter(21, OracleTypes.CURSOR);

			callableStatement.execute();
//
//			System.out.println("MantenimientoUserDaoImpl::::listaIdPaisDAO::::::" + listaIdPaisActualiza.size());
//			System.out.println("MantenimientoUserDaoImpl::::numEmpleadoDAO::::::" + ActualizaUsuarios.getNumempleado());
//			
//			
//				for( Integer i = 0; i < listaIdPaisActualiza.size(); i++){
//					String sp2 = "{call SEGURIDAD.SP_MANTO_USR_PAIS(?,?,?,?,?,?,?,?)}";
//					CallableStatement callableStatement2 = connection.prepareCall(sp2);
//					callableStatement2.setInt(1, 3);
//					callableStatement2.setInt(2, 0);
//					callableStatement2.setString(3, ActualizaUsuarios.getNumempleado());
//					callableStatement2.setInt(4, Integer.valueOf(listaIdPaisActualiza.get(i)));
//					callableStatement2.setInt(5, 0);
//					callableStatement2.registerOutParameter(6,OracleTypes.CURSOR );
//					callableStatement2.registerOutParameter(7,OracleTypes.VARCHAR );
//					callableStatement2.registerOutParameter(8,OracleTypes.VARCHAR );
//					callableStatement2.execute();
//					System.out.println("MantenimientoUserDaoImpl::::Paises Seleccionados::::listaIdPais::::::"+ listaIdPaisActualiza.get(i));
//					}
//				System.out.println("MantenimientoUserDaoImpl::::Paises Seleccionados::::LISTO!!!::::::");
//			
			entityManager.getTransaction().commit();
		}catch (Exception e) {
			logger.warn("Sicrenet::MantenimientoUserDaoImpl::" 
	                + "actualizaUsers::" + e.getMessage());
			throw new ExcepcionSicrenet("ERROR!. Base de Datos");
		}

		return null;
	}
	
	public void EditarMantoUsuarioPais(int opcion, UsuariosVO ActualizaUsuarios, List<String> listaIdPaisActualiza, int estatus ) throws ExcepcionSicrenet{
		try {
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);

			
			System.out.println("MantenimientoUserDaoImpl::::listaIdPaisDAO::::::"+ listaIdPaisActualiza.size());
			System.out.println("MantenimientoUserDaoImpl::::numEmpleadoDAO::::::"+ ActualizaUsuarios.getNumempleado());
			
			
				for( Integer i = 0; i < listaIdPaisActualiza.size(); i++){
					String sp2 = "{call SEGURIDAD.SP_MANTO_USR_PAIS(?,?,?,?,?,?,?,?)}";
					CallableStatement callableStatement2 = connection.prepareCall(sp2);
					callableStatement2.setInt(1, opcion);
					callableStatement2.setInt(2, 0);
					callableStatement2.setString(3, ActualizaUsuarios.getNumempleado());
					callableStatement2.setInt(4, Integer.valueOf(listaIdPaisActualiza.get(i)));
					callableStatement2.setInt(5,  estatus);
					callableStatement2.registerOutParameter(6,OracleTypes.CURSOR );
					callableStatement2.registerOutParameter(7,OracleTypes.VARCHAR );
					callableStatement2.registerOutParameter(8,OracleTypes.VARCHAR );
					callableStatement2.execute();
					System.out.println("MantenimientoUserDaoImpl::::Paises Seleccionados::::listaIdPais::::::"+ listaIdPaisActualiza.get(i));
					}
				System.out.println("MantenimientoUserDaoImpl::::Paises Seleccionados::::LISTO!!!::::::");
				

			entityManager.getTransaction().commit();
		} catch (Exception e) {
			logger.warn("Sicrenet::MantenimientoUserDaoImpl::" 
	                + "EditarMantoUsuarioPaisNoExixtente::" + e.getMessage());
			 e.printStackTrace();
			throw new ExcepcionSicrenet("ERROR!. Base de Datos" );
		}
	}
	public void EditarMantoUsuarioPaisInserta(int opcion, UsuariosVO ActualizaUsuarios, String listaIdPaisActualiza, int estatus) throws ExcepcionSicrenet{
		try {
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);

			
			System.out.println("MantenimientoUserDaoImpl::::listaIdPaisDAO::::::"+ listaIdPaisActualiza);
			System.out.println("MantenimientoUserDaoImpl::::numEmpleadoDAO::::::"+ ActualizaUsuarios.getNumempleado());
			
			
//				for( Integer i = 0; i < listaIdPaisActualiza.size(); i++){
					String sp2 = "{call SEGURIDAD.SP_MANTO_USR_PAIS(?,?,?,?,?,?,?,?)}";
					CallableStatement callableStatement2 = connection.prepareCall(sp2);
					callableStatement2.setInt(1, opcion);
					callableStatement2.setInt(2, 0);
					callableStatement2.setString(3, ActualizaUsuarios.getNumempleado());
					callableStatement2.setInt(4, Integer.valueOf(listaIdPaisActualiza));
					callableStatement2.setInt(5, estatus);
					callableStatement2.registerOutParameter(6,OracleTypes.CURSOR );
					callableStatement2.registerOutParameter(7,OracleTypes.VARCHAR );
					callableStatement2.registerOutParameter(8,OracleTypes.VARCHAR );
					callableStatement2.execute();
					System.out.println("MantenimientoUserDaoImpl::::Paises Seleccionados::::listaIdPais::::::"+ listaIdPaisActualiza);
//					}
				System.out.println("MantenimientoUserDaoImpl::::Paises Seleccionados::::LISTO!!!::::::");
				

			entityManager.getTransaction().commit();
		} catch (Exception e) {
			logger.warn("Sicrenet::MantenimientoUserDaoImpl::" 
	                + "EditarMantoUsuarioPaisNoExixtente::" + e.getMessage());
			 e.printStackTrace();
			throw new ExcepcionSicrenet("ERROR!. Base de Datos" );
		}
	}
	
	public UsuarioPaisVO ValidaExisteEditarMantoUP(UsuariosVO ActualizaUsuarios, String listaIdPaisActualiza) throws ExcepcionSicrenet {
		try { UsuarioPaisVO UsuarioPaisVO = null;
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);
	
			
		
			ResultSet rs = null;
			String sp2 = "{call SEGURIDAD.SP_MANTO_USR_PAIS(?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp2);
			callableStatement.setInt(1, 4);
			callableStatement.setInt(2, 0);
			callableStatement.setString(3, ActualizaUsuarios.getNumempleado());
			callableStatement.setInt(4, Integer.valueOf(listaIdPaisActualiza));
			callableStatement.setInt(5, 1);
			callableStatement.registerOutParameter(6,OracleTypes.CURSOR );
			callableStatement.registerOutParameter(7,OracleTypes.VARCHAR );
			callableStatement.registerOutParameter(8,OracleTypes.VARCHAR );
			callableStatement.execute();
			rs = (ResultSet) callableStatement.getObject(6);
			// List<CatPanelView> listCatPanelView = new
			// ArrayList<CatPanelView>();
			
			
			while (rs.next()) {
				System.out.println("Entra al while:::::");
				UsuarioPaisVO = new UsuarioPaisVO(
						rs.getInt("ESTATUS")
						
						);
				System.out.println("cargarUsuariosExisteAgregar:::ESTATUS:::"+rs.getInt("ESTATUS"));
			
			}
			
			entityManager.getTransaction().commit();
			return UsuarioPaisVO;
		}  catch (Exception e) {
			logger.warn("Sicrenet::MantenimientoUserDaoImpl::" 
	                + "ValidaExisteEditarMantoUP::" + e.getMessage());
			throw new ExcepcionSicrenet("ERROR!. Base de Datos");
		}

	}

//	public String eliminaUsers(String NumeroEmpleado) throws ExcepcionSicrenet {
//
//		try {
//			entityManager.getTransaction().begin();
//			Connection connection = getConnection(entityManager);
//
//			ResultSet rs = null;
//			String sp = "{call SEGURIDAD.SP_MANTO_USUARIOS(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
//			CallableStatement callableStatement = connection.prepareCall(sp);
//			callableStatement.setInt(1, 3);
//			callableStatement.setInt(2, 0);
//			callableStatement.setString(3, NumeroEmpleado);
//			callableStatement.setInt(4, 1);
//			callableStatement.setString(5, null);
//			callableStatement.setString(6, null);
//			callableStatement.setString(7, null);
//			callableStatement.setString(8, null);
//			callableStatement.setString(9, null);
//			callableStatement.setString(10, null);
//			callableStatement.setString(11, null);
//			callableStatement.setInt(12, 0);
//			callableStatement.setString(13, null);
//			callableStatement.setInt(14, 0);
//			callableStatement.setString(15, null);
//			callableStatement.setInt(16, 1);
//			callableStatement.setInt(17, 0);
//			callableStatement.registerOutParameter(18, OracleTypes.VARCHAR);
//			callableStatement.registerOutParameter(19, OracleTypes.VARCHAR);
//			callableStatement.registerOutParameter(20, OracleTypes.VARCHAR);
//
//			callableStatement.registerOutParameter(21, OracleTypes.CURSOR);
//
//			callableStatement.execute();
//
//			// rs = (ResultSet) callableStatement.getObject(18);
//			// rs = (ResultSet) callableStatement.getObject(19);
//
//			rs = (ResultSet) callableStatement.getObject(21);
//			// List<CatPanelView> listCatPanelView = new
//			// ArrayList<CatPanelView>();
//
//			entityManager.getTransaction().commit();
//		} catch (Exception e) {
//			logger.warn("Sicrenet::MantenimientoUserDaoImpl::" 
//	                + "eliminaUsers::" + e.getMessage());
//			throw new ExcepcionSicrenet("ERROR!. Base de Datos");
//		}
//
//
//		return null;
//	}

	


public List<RolesVO> CargaRoles() throws ExcepcionSicrenet {
	try {
		entityManager.getTransaction().begin();
		Connection connection = getConnection(entityManager);

		ResultSet rs = null;
		String sp = "{call SEGURIDAD.SP_MANTO_ROLES(?,?,?,?,?,?,?,?)}";
		CallableStatement callableStatement = connection.prepareCall(sp);
		callableStatement.setInt(1, 1);
		callableStatement.setInt(2, 0);
		callableStatement.setString(3, null);
		callableStatement.setString(4, null);
		callableStatement.setInt(5, 1);
		callableStatement.registerOutParameter(6, OracleTypes.CURSOR);
		callableStatement.registerOutParameter(7,OracleTypes.VARCHAR );
		callableStatement.registerOutParameter(8,OracleTypes.VARCHAR );

		callableStatement.execute();
		rs = (ResultSet) callableStatement.getObject(6);
		// List<CatPanelView> listCatPanelView = new
		// ArrayList<CatPanelView>();

		List<RolesVO> listRolesVO = new ArrayList<RolesVO>(); 
		while (rs.next()) {
			System.out.println("Entra al while:::::");
			RolesVO rolesVO = new RolesVO(
					rs.getBigDecimal("IDROL"),
					rs.getString("DESCRIPCION"));
			listRolesVO.add(rolesVO);
			
			//System.out.println("obtenerIDROL:idRol:::"+rs.getInt("IDROL"));
		}
		
		
		entityManager.getTransaction().commit();
		return listRolesVO;
	}  catch (Exception e) {
		logger.warn("Sicrenet::MantenimientoUserDaoImpl::" 
                + "CargaRoles::" + e.getMessage()); 
		e.printStackTrace();
		throw new ExcepcionSicrenet("ERROR!. Base de Datos");
	}

	
}



public UsuariosVO cargarUsuariosExisteAgregar(UsuariosVO existeAgregar) throws ExcepcionSicrenet {
	try { UsuariosVO usuarios = null;
		entityManager.getTransaction().begin();
		Connection connection = getConnection(entityManager);

		ResultSet rs = null;
		String sp = "{call SEGURIDAD.SP_MANTO_USUARIOS(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
		CallableStatement callableStatement = connection.prepareCall(sp);
		callableStatement.setInt(1, 7);
		callableStatement.setInt(2, 0);
		callableStatement.setString(3, existeAgregar.getNumempleado());
		callableStatement.setBigDecimal(4, null);
		callableStatement.setString(5, null);
		callableStatement.setString(6, null);
		callableStatement.setString(7, null);
		callableStatement.setString(8, null);
		callableStatement.setString(9, null);
		callableStatement.setString(10, null);
		callableStatement.setString(11, null);
		callableStatement.setInt(12, 0);
		callableStatement.setString(13, null);
		callableStatement.setInt(14, 0);
		callableStatement.setString(15, null);
		callableStatement.setInt(16, 0);
		callableStatement.setInt(17, 1);
		callableStatement.registerOutParameter(18, OracleTypes.VARCHAR);
		callableStatement.registerOutParameter(19, OracleTypes.VARCHAR);
		callableStatement.registerOutParameter(20, OracleTypes.VARCHAR);
		callableStatement.registerOutParameter(21, OracleTypes.CURSOR);

		callableStatement.execute();
		rs = (ResultSet) callableStatement.getObject(21);
		// List<CatPanelView> listCatPanelView = new
		// ArrayList<CatPanelView>();

		
		while (rs.next()) {
			System.out.println("Entra al while:::::");
			 usuarios = new UsuariosVO(
					rs.getLong("ESTATUS")
					
					);
			System.out.println("cargarUsuariosExisteAgregar:::ESTATUS:::"+rs.getInt("ESTATUS"));
		}
		
		
		entityManager.getTransaction().commit();
		return usuarios;
	}  catch (Exception e) {
		logger.warn("Sicrenet::MantenimientoUserDaoImpl::" 
                + "cargarUsuariosExisteAgregar::" + e.getMessage());
		throw new ExcepcionSicrenet("ERROR!. Base de Datos");
	}

}

public UsuariosVO cargarUsuariosExisteActualiza(UsuariosVO existeAgregar) throws ExcepcionSicrenet {
	try { UsuariosVO usuarios = null;
		entityManager.getTransaction().begin();
		Connection connection = getConnection(entityManager);

		ResultSet rs = null;
		String sp = "{call SEGURIDAD.SP_MANTO_USUARIOS(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
		CallableStatement callableStatement = connection.prepareCall(sp);
		callableStatement.setInt(1, 7);
		callableStatement.setInt(2, 0);
		callableStatement.setString(3, null);
		callableStatement.setBigDecimal(4, null);
		callableStatement.setString(5, null);
		callableStatement.setString(6, null);
		callableStatement.setString(7, null);
		callableStatement.setString(8, null);
		callableStatement.setString(9, null);
		callableStatement.setString(10, null);
		callableStatement.setString(11, null);
		callableStatement.setInt(12, 0);
		callableStatement.setString(13, null);
		callableStatement.setInt(14, 0);
		callableStatement.setString(15, null);
		callableStatement.setInt(16, 0);
		callableStatement.setInt(17, 1);
		callableStatement.registerOutParameter(18, OracleTypes.VARCHAR);
		callableStatement.registerOutParameter(19, OracleTypes.VARCHAR);
		callableStatement.registerOutParameter(20, OracleTypes.VARCHAR);
		callableStatement.registerOutParameter(21, OracleTypes.CURSOR);

		callableStatement.execute();
		rs = (ResultSet) callableStatement.getObject(21);
		// List<CatPanelView> listCatPanelView = new
		// ArrayList<CatPanelView>();

		
		while (rs.next()) {
			System.out.println("Entra al while:::::");
			 usuarios = new UsuariosVO(
					rs.getLong("ESTATUS")
					
					);
			System.out.println("cargarUsuariosExisteAgregar:::ESTATUS:::"+rs.getInt("ESTATUS"));
		}
		
		
		entityManager.getTransaction().commit();
		return usuarios;
	}  catch (Exception e) {
		logger.warn("Sicrenet::MantenimientoUserDaoImpl::" 
                + "cargarUsuariosExisteAgregar::" + e.getMessage());
		throw new ExcepcionSicrenet("ERROR!. Base de Datos");
	}

}





public List<PaisVO> CargaPais() throws ExcepcionSicrenet {
	try {
		entityManager.getTransaction().begin();
		Connection connection = getConnection(entityManager);

		ResultSet rs = null;
		String sp = "{call SEGURIDAD.SP_CAT_PAIS(?,?,?,?,?,?,?,?,?)}";
		CallableStatement callableStatement = connection.prepareCall(sp);
		callableStatement.setInt(1, 1);
		callableStatement.setInt(2, 0);
		callableStatement.setString(3, null);
		callableStatement.setString(4, null);
		callableStatement.setString(5, null);
		callableStatement.setInt(6, 1);
		callableStatement.registerOutParameter(7, OracleTypes.CURSOR);
		callableStatement.registerOutParameter(8,OracleTypes.VARCHAR );
		callableStatement.registerOutParameter(9,OracleTypes.VARCHAR );

		callableStatement.execute();
		rs = (ResultSet) callableStatement.getObject(7);
		// List<CatPanelView> listCatPanelView = new
		// ArrayList<CatPanelView>();

		List<PaisVO> listPaisVO = new ArrayList<PaisVO>(); 
		while (rs.next()) {
			System.out.println("Entra al while:::::");
			PaisVO PaisVO = new PaisVO(
					rs.getBigDecimal("ID_PAIS"),
					rs.getString("PAIS"),
					rs.getString("URL"),
					rs.getString("PATH"));
			listPaisVO.add(PaisVO);
			
			System.out.println("obtenerPAIS:::"+rs.getString("PAIS"));
		}
		
		
		entityManager.getTransaction().commit();
		return listPaisVO;
	}  catch (Exception e) {
		logger.warn("Sicrenet::MantenimientoUserDaoImpl::" 
                + "CargaPais::" + e.getMessage()); 
		e.printStackTrace();
		throw new ExcepcionSicrenet("ERROR!. Base de Datos");
	}

}


public List<UsuarioPaisVO> CargaUsuarioPais(int opcion, String numEmpleado, int estatus) throws ExcepcionSicrenet{
	try {
		entityManager.getTransaction().begin();
		Connection connection = getConnection(entityManager);

		ResultSet rs = null;
		String sp = "{call SEGURIDAD.SP_MANTO_USR_PAIS(?,?,?,?,?,?,?,?)}";
		CallableStatement callableStatement = connection.prepareCall(sp);
		callableStatement.setInt(1, opcion);
		callableStatement.setInt(2, 0);
		callableStatement.setString(3, numEmpleado);
		callableStatement.setInt(4, 0);
		callableStatement.setInt(5, estatus);
		callableStatement.registerOutParameter(6, OracleTypes.CURSOR);
		callableStatement.registerOutParameter(7, OracleTypes.VARCHAR );
		callableStatement.registerOutParameter(8, OracleTypes.VARCHAR );

		callableStatement.execute();
		rs = (ResultSet) callableStatement.getObject(6);
		

		List<UsuarioPaisVO> listUsuarioPaisVO = new ArrayList<UsuarioPaisVO>(); 
		System.out.println("Entra al while:::::");
		while (rs.next()) {
					UsuarioPaisVO UsuarioPaisVO = new UsuarioPaisVO(
					rs.getBigDecimal(1),
					rs.getString(2),
					rs.getString(3),
					rs.getString(4));
			listUsuarioPaisVO.add(UsuarioPaisVO);
			
			System.out.println("obtenerPAIS:::"+rs.getString(2));
		}
		
		
		entityManager.getTransaction().commit();
		return listUsuarioPaisVO;
	}  catch (Exception e) {
		logger.warn("Sicrenet::MantenimientoUserDaoImpl::" 
                + "CargaUsuarioPais::" + e.getMessage()); 
		e.printStackTrace();
		throw new ExcepcionSicrenet("ERROR!. Base de Datos");
	}
}

}

