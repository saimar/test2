package com.baz.dao.security.impl;

import static com.baz.dao.util.Conexion.getConnection;

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;
import javax.persistence.Query;
import javax.swing.JOptionPane;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.baz.commons.domain.CatMonitor;
import com.baz.commons.domain.CatUsuarios;
import com.baz.commons.domain.MantoPassword;
import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.dao.impl.PanelDeControlDaoImpl;
import com.baz.dao.security.LoginDao;

import oracle.jdbc.OracleTypes;



@Named("LoginDaoImpl")
public class LoginDaoImpl implements LoginDao, Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	 private final Logger logger 
	    = LoggerFactory.getLogger(PanelDeControlDaoImpl.class);
	
	@PersistenceContext(unitName = "seguridad", type = PersistenceContextType.EXTENDED)
    private EntityManager entityManager;

	/*

public CatUsuarios  validate(String user, String password) throws ExcepcionSicrenet{
	try {
		entityManager.getTransaction().begin();
		Connection connection = getConnection(entityManager);

		ResultSet rs = null;
		String sp = "{call SEGURIDAD.SP_MANTO_USUARIOS(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
		CallableStatement callableStatement = connection.prepareCall(sp);
		callableStatement.setInt(1, 7);
		callableStatement.setInt(2, 0);
		callableStatement.setString(3, user);
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

		List<CatUsuarios> listCatUsuarios = new ArrayList<CatUsuarios>(); 
		while (rs.next()) {
			System.out.println("Entra al while:::::");
			CatUsuarios catUsuarios = new CatUsuarios(
					rs.getBigDecimal("IDUSUARIO"),
					rs.getBigDecimal("IDROL"),
					rs.getString("NOMBRE"),
					rs.getString("APATERNO"),
					rs.getString("AMATERNO"),
					rs.getString("NUMEMPLEADO"),
					rs.getString("DIRECCION"),
					rs.getBigDecimal("ID_PAIS"),
					rs.getString("GERENCIA"),
					rs.getString("CENTROCOSTOS"),
					rs.getString("CORREO"),
					rs.getLong("BLOQUEO"),
					rs.getLong("SESIONACTIVA"),
					rs.getString("FALTA"),
					rs.getString("UALTA"),
					rs.getString("FMODIFICA"),
					rs.getString("UMODIFICA"),
					rs.getBigDecimal("ID_PASS")
					
					
					);
			listCatUsuarios.add(catUsuarios);
			
			System.out.println("obtenerIDROL:idRol:::"+rs.getInt(""));
		}
		
		
		
		entityManager.getTransaction().commit();
		return (CatUsuarios) listCatUsuarios;
	}  catch (Exception e) {
		logger.warn("Sicrenet::MantenimientoUserDaoImpl::" 
                + "CargaRoles::" + e.getMessage());
        throw new ExcepcionSicrenet("Error en persistencia: " + e);
	}
}*/	
	
	
	
	public CatUsuarios validate(String user, String password) throws ExcepcionSicrenet{
		
		try{
		// TODO Auto-generated method stub
		System.out.println("DAO execute:::validate:::entityManager:::" +entityManager );
		
		Query query = entityManager.createNamedQuery("CatUsuarios.findByNumempleado", CatUsuarios.class);
//		
		query.setParameter("numempleado", user);
		
		CatUsuarios users = new CatUsuarios();
		List<CatUsuarios> listUsers =new  ArrayList<CatUsuarios>();
		
		listUsers = query.getResultList();
		
		if(0 < listUsers.size())
		users = listUsers.get(0) ;
//		users.setIdUser(BigDecimal.valueOf(1));
//		users.setPassword("regulatorio");
//		users.setPassword("regulatorio");
		return users;
	}catch (Exception e) {
		logger.warn("Sicrenet::LoginDaoImpl::" 
                + "Validate::" + e.getMessage());
        throw new ExcepcionSicrenet("Error en persistencia: " + e);
	}
	}
	

public CatMonitor agregarMonitorSesion(String numEmpleado, String IP) throws ExcepcionSicrenet {

	try {
		entityManager.getTransaction().begin();
		Connection connection = getConnection(entityManager);

		ResultSet rs = null;
		String sp = "{call SEGURIDAD.SP_MANTO_MONITOR(?,?,?,?,?,?,?)}";
		CallableStatement callableStatement = connection.prepareCall(sp);
		callableStatement.setInt(1, 2);
		callableStatement.setString(2, numEmpleado);
		callableStatement.setString(3, IP);
		callableStatement.setInt(4, 1);
		callableStatement.registerOutParameter(5, OracleTypes.CURSOR);
		callableStatement.registerOutParameter(6, OracleTypes.VARCHAR);
		callableStatement.registerOutParameter(7, OracleTypes.VARCHAR);

		callableStatement.execute();
		rs = (ResultSet) callableStatement.getObject(5);
		
		entityManager.getTransaction().commit();
		
		System.out.println("::Ingreso Sesion::: correctamenete");
	}catch (Exception e) {
		logger.warn("Sicrenet::LoginDaoImpl::" 
                + "agregaMonitorIP::" + e.getMessage());
        throw new ExcepcionSicrenet("Error en persistencia: " + e);
	}

	return null;
}

public CatMonitor cerrarSesionMonitor(String numEmpleado) throws ExcepcionSicrenet {

	try {
		entityManager.getTransaction().begin();
		Connection connection = getConnection(entityManager);

		ResultSet rs = null;
		String sp = "{call SEGURIDAD.SP_MANTO_MONITOR(?,?,?,?,?,?,?)}";
		CallableStatement callableStatement = connection.prepareCall(sp);
		callableStatement.setInt(1, 3);
		callableStatement.setString(2, numEmpleado);
		callableStatement.setString(3, null);
		callableStatement.setInt(4, 0);
		callableStatement.registerOutParameter(5, OracleTypes.CURSOR);
		callableStatement.registerOutParameter(6, OracleTypes.VARCHAR);
		callableStatement.registerOutParameter(7, OracleTypes.VARCHAR);

		callableStatement.execute();
		rs = (ResultSet) callableStatement.getObject(5);
		
		entityManager.getTransaction().commit();
		
		System.out.println("::Cerrado de Sesion::: correctamenete");
	}catch (Exception e) {
		logger.warn("Sicrenet::LoginDaoImpl::" 
                + "cerrarsesionMonitor::" + e.getMessage());
        throw new ExcepcionSicrenet("Error en persistencia: " + e);
	}

	return null;
}
	
public MantoPassword actualizarContrasenaNuevo(BigDecimal idPass, String passwordNuevo1, int numeroVigente) throws ExcepcionSicrenet {

	try {
		entityManager.getTransaction().begin();
		Connection connection = getConnection(entityManager);

		ResultSet rs = null;
		String sp = "{call SEGURIDAD.SP_MANTO_PASSWORD(?,?,?,?,?,?,?)}";
		CallableStatement callableStatement = connection.prepareCall(sp);
		callableStatement.setInt(1, 2);
		callableStatement.setInt(2, idPass.intValue());
		callableStatement.setString(3, passwordNuevo1);
		callableStatement.setInt(4, numeroVigente);
		callableStatement.registerOutParameter(5, OracleTypes.VARCHAR);
		callableStatement.registerOutParameter(6, OracleTypes.VARCHAR);
		callableStatement.registerOutParameter(7, OracleTypes.CURSOR);

		System.out.println("LoginDaoImplm:::actualizarContrasenaNuevo:::: idPass" + idPass);
		System.out.println("LoginDaoImplm:::actualizarContrasenaNuevo:::: passwordNuevo1" + passwordNuevo1);
		System.out.println("LoginDaoImplm:::actualizarContrasenaNuevo:::: numeroVigente" + numeroVigente);
		
		callableStatement.execute();
		rs = (ResultSet) callableStatement.getObject(7);
		
		entityManager.getTransaction().commit();
		
		System.out.println("::ActualizacionContraseñaNuevoUsuario::: correctamenete");
		
	}catch (Exception e) {
		logger.warn("Sicrenet::LoginDaoImpl::" 
                + "actualizarContrasenaNuevo::" + e.getMessage());
        throw new ExcepcionSicrenet("Error en persistencia: " + e);
	}

	return null;
}


}
