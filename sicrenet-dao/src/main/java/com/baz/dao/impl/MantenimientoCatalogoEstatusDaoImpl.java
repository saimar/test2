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
import com.baz.commons.vo.EstatusVO;
import com.baz.dao.MantenimientoCatalogoEstatusDao;

import oracle.jdbc.OracleTypes;

@Named("mantenimientoCatalogoEstatusDaoImpl")
public class MantenimientoCatalogoEstatusDaoImpl implements MantenimientoCatalogoEstatusDao, Serializable {
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@PersistenceContext(unitName = "panelGlobal", type = PersistenceContextType.EXTENDED)
    private EntityManager entityManager;
    private final Logger logger 
	    = LoggerFactory.getLogger(MantenimientoCatalogoEstatusDaoImpl.class);

	

    public List<EstatusVO> cargarCatalogoEstatus(int opcion, int idEstatus, int estatus) throws ExcepcionSicrenet{
		
    	
    	try {
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);
			
			ResultSet rs = null;
			String sp = "{call USRTABLERO.SP_CAT_ESTATUS(?,?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, opcion);
			callableStatement.setInt(2, idEstatus);
			callableStatement.setString(3, null);
			callableStatement.setString(4, null);
			callableStatement.setInt(5, estatus);
			callableStatement.setString(6, null);
			callableStatement.registerOutParameter(7, OracleTypes.CURSOR);
			callableStatement.registerOutParameter(8, OracleTypes.NUMBER);
			callableStatement.registerOutParameter(9, OracleTypes.VARCHAR);
			callableStatement.registerOutParameter(10, OracleTypes.VARCHAR);
			callableStatement.execute();
			
			rs = (ResultSet) callableStatement.getObject(7);

		List<EstatusVO> listEstatusVO = new ArrayList<EstatusVO>(); 
		while (rs.next()) {
			System.out.println("Entra al while:::::");
			EstatusVO EstatusVO = new EstatusVO( 
					rs.getBigDecimal(1),
					rs.getString(2),
					rs.getString(3),
					rs.getString(4)
					);
			listEstatusVO.add(EstatusVO);
			
			System.out.println("obtenerIDESTATUS:::"+rs.getBigDecimal(1));
		}
		
		
		entityManager.getTransaction().commit();
		return listEstatusVO;
    	} catch (Exception e) {
			logger.warn("Sicrenet::MantenimientoCatalogoEstatusDaoImpl::" 
	                + "cargarCatalogoEstatus::" + e.getMessage());
	        throw new ExcepcionSicrenet("ERROR!. Base de Datos");
		}
    }
	
	

    public void guardarCatalogoEstatus(int opcion, int idEstatus, String nombre, String clase, int estatus, String usuario) throws ExcepcionSicrenet{
		try {
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);
			
			String sp = "{call USRTABLERO.SP_CAT_ESTATUS(?,?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, opcion);
			callableStatement.setInt(2, idEstatus);
			callableStatement.setString(3, nombre);
			callableStatement.setString(4, clase);
			callableStatement.setInt(5, estatus);
			callableStatement.setString(6, usuario);
			callableStatement.registerOutParameter(7, OracleTypes.CURSOR);
			callableStatement.registerOutParameter(8, OracleTypes.NUMBER);
			callableStatement.registerOutParameter(9, OracleTypes.VARCHAR);
			callableStatement.registerOutParameter(10, OracleTypes.VARCHAR);
			callableStatement.execute();
			
			System.out.println("MantenimientoCatalogoEstatusDaoImpl::::guardarCatalogoEstatus::::estatus:::"+ estatus);
			System.out.println("MantenimientoCatalogoEstatusDaoImpl::::guardarCatalogoEstatus::::idEstatus:::"+ idEstatus);
			System.out.println("MantenimientoCatalogoEstatusDaoImpl::::guardarCatalogoEstatus::::nombre:::"+ nombre);
			System.out.println("MantenimientoCatalogoEstatusDaoImpl::::guardarCatalogoEstatus::::usuario:::"+ usuario);
			
			entityManager.getTransaction().commit();
		} catch (Exception e) {
			logger.warn("Sicrenet::MantenimientoCatalogoEstatusDaoImpl::" 
	                + "guardarCatalogoEstatus::" + e.getMessage());
	        throw new ExcepcionSicrenet("ERROR!. Base de Datos");
		}

		
	}

	


    public EstatusVO cargarCatalogoEstatusValidateExiste(int opcion, int idEstatus, String nombre)  throws ExcepcionSicrenet{
	try { EstatusVO EstatusVO = null;
		entityManager.getTransaction().begin();
		Connection connection = getConnection(entityManager);

		ResultSet rs = null;
		String sp = "{call USRTABLERO.SP_CAT_ESTATUS(?,?,?,?,?,?,?,?,?,?)}";
		CallableStatement callableStatement = connection.prepareCall(sp);
		callableStatement.setInt(1, opcion);
		callableStatement.setInt(2, idEstatus);
		callableStatement.setString(3, nombre);
		callableStatement.setString(4, null);
		callableStatement.setInt(5, 1);
		callableStatement.setString(6, null);
		callableStatement.registerOutParameter(7, OracleTypes.CURSOR);
		callableStatement.registerOutParameter(8, OracleTypes.NUMBER);
		callableStatement.registerOutParameter(9, OracleTypes.VARCHAR);
		callableStatement.registerOutParameter(10, OracleTypes.VARCHAR);
		callableStatement.execute();
		
		rs = (ResultSet) callableStatement.getObject(7);
		
		// List<CatPanelView> listCatPanelView = new
		// ArrayList<CatPanelView>();

		
		while (rs.next()) {
			System.out.println("Entra al while:::::");
			EstatusVO = new EstatusVO( 
					rs.getInt(1));
			
			
			System.out.println("obtenerEXISTE:::ESTATUS:::"+rs.getInt(1));
		}
		
		entityManager.getTransaction().commit();
		return EstatusVO;
	}  catch (Exception e) {
		logger.warn("Sicrenet::MantenimientoCatalogoEstatusDaoImpl::" 
                + "cargarCatalogoEstatusValidateExiste::" + e.getMessage());
        throw new ExcepcionSicrenet("ERROR!. Base de Datos");
	}

	
}

}

