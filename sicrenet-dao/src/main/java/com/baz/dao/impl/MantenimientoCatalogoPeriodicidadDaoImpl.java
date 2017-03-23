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
import com.baz.commons.vo.PeriodicidadVO;
import com.baz.dao.MantenimientoCatalogoPeriodicidadDao;

import oracle.jdbc.OracleTypes;

@Named("mantenimientoCatalogoPeriodicidadDaoImpl")
public class MantenimientoCatalogoPeriodicidadDaoImpl implements MantenimientoCatalogoPeriodicidadDao, Serializable {
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@PersistenceContext(unitName = "panelGlobal", type = PersistenceContextType.EXTENDED)
    private EntityManager entityManager;
    private final Logger logger 
	    = LoggerFactory.getLogger(MantenimientoCatalogoPeriodicidadDaoImpl.class);

	

    public List<PeriodicidadVO> cargarCatalogoPeriodicidad(int opcion, int IDPeriodicidad, int estatus) throws ExcepcionSicrenet{
    	
    	
    	try {
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);
			
			ResultSet rs = null;
			String sp = "{call USRTABLERO.SP_CAT_PERIODICIDAD(?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, opcion);
			callableStatement.setInt(2, IDPeriodicidad);
			callableStatement.setString(3, null);
			callableStatement.setInt(4, estatus);
			callableStatement.setString(5, null);
			callableStatement.registerOutParameter(6, OracleTypes.CURSOR);
			callableStatement.registerOutParameter(7, OracleTypes.NUMBER);
			callableStatement.registerOutParameter(8, OracleTypes.VARCHAR);
			callableStatement.registerOutParameter(9, OracleTypes.VARCHAR);
			callableStatement.execute();
    	
    	
    	rs = (ResultSet) callableStatement.getObject(6);

		List<PeriodicidadVO> listPeriodicidadVO = new ArrayList<PeriodicidadVO>(); 
		while (rs.next()) {
			System.out.println("Entra al while:::::");
			PeriodicidadVO PeriodicidadVO = new PeriodicidadVO( 
					rs.getBigDecimal(1),
					rs.getString(2),
					rs.getInt(3)
					);
			listPeriodicidadVO.add(PeriodicidadVO);
			
			System.out.println("obtenerID_FACE:ID_FACE:::"+rs.getBigDecimal(1));
		}
		
		
		entityManager.getTransaction().commit();
		return listPeriodicidadVO;
    	} catch (Exception e) {
			logger.warn("Sicrenet::MantenimientoCatalogoPeriodicidadDaoImpl::" 
	                + "cargarCatalogoPeriodicidad::" + e.getMessage());
	        throw new ExcepcionSicrenet("ERROR!. Base de Datos");
		}
    }
	
	

	public PeriodicidadVO guardarCatalogoPeriodicidad(int opcion, int IDPeriodicidad, String descripcion, int estatus, String usuario) throws ExcepcionSicrenet {

		try {
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);
			
			String sp = "{call USRTABLERO.SP_CAT_PERIODICIDAD(?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, opcion);
			callableStatement.setInt(2, IDPeriodicidad);
			callableStatement.setString(3, descripcion);
			callableStatement.setInt(4, estatus);
			callableStatement.setString(5, usuario);
			callableStatement.registerOutParameter(6, OracleTypes.CURSOR);
			callableStatement.registerOutParameter(7, OracleTypes.NUMBER);
			callableStatement.registerOutParameter(8, OracleTypes.VARCHAR);
			callableStatement.registerOutParameter(9, OracleTypes.VARCHAR);
			callableStatement.execute();
			
			
			System.out.println("MantenimientoCatalogoPeriodicidadDaoImpl::::guardarCatalogoPeriodicidad::::estatus:::"+ estatus);
			System.out.println("MantenimientoCatalogoPeriodicidadDaoImpl::::guardarCatalogoPeriodicidad::::idNegocio:::"+ IDPeriodicidad);
			System.out.println("MantenimientoCatalogoPeriodicidadDaoImpl::::guardarCatalogoPeriodicidad::::descripcion:::"+ descripcion);
			System.out.println("MantenimientoCatalogoPeriodicidadDaoImpl::::guardarCatalogoPeriodicidad::::usuario:::"+ usuario);
			
			entityManager.getTransaction().commit();
		} catch (Exception e) {
			logger.warn("Sicrenet::MantenimientoCatalogoPeriodicidadDaoImpl::" 
	                + "guardarCatalogoPeriodicidad::" + e.getMessage());
	        throw new ExcepcionSicrenet("ERROR!. Base de Datos");
		}

		return null;
	}

	


public PeriodicidadVO cargarCatalogoPeriodicidadValidateExiste(int opcion, int IDPeriodicidad, String descripcion) throws ExcepcionSicrenet {
	try { PeriodicidadVO PeriodicidadVO = null;
		entityManager.getTransaction().begin();
		Connection connection = getConnection(entityManager);

		ResultSet rs = null;
		String sp = "{call USRTABLERO.SP_CAT_PERIODICIDAD(?,?,?,?,?,?,?,?,?)}";
		CallableStatement callableStatement = connection.prepareCall(sp);
		callableStatement.setInt(1, opcion);
		callableStatement.setInt(2, IDPeriodicidad);
		callableStatement.setString(3, descripcion);
		callableStatement.setInt(4, 1);
		callableStatement.setString(5, null);
		callableStatement.registerOutParameter(6, OracleTypes.CURSOR);
		callableStatement.registerOutParameter(7, OracleTypes.NUMBER);
		callableStatement.registerOutParameter(8, OracleTypes.VARCHAR);
		callableStatement.registerOutParameter(9, OracleTypes.VARCHAR);
		callableStatement.execute();
		
		rs = (ResultSet) callableStatement.getObject(6);
		
		// List<CatPanelView> listCatPanelView = new
		// ArrayList<CatPanelView>();

		
		while (rs.next()) {
			System.out.println("Entra al while:::::");
			PeriodicidadVO = new PeriodicidadVO( 
					rs.getInt(1));
			
			
			System.out.println("obtenerEXISTE:::ESTATUS:::"+rs.getInt(1));
		}
		
		entityManager.getTransaction().commit();
		return PeriodicidadVO;
	}  catch (Exception e) {
		logger.warn("Sicrenet::MantenimientoCatalogoPeriodicidadDaoImpl::" 
                + "cargarCatalogoPeriodicidadValidateExiste::" + e.getMessage());
        throw new ExcepcionSicrenet("ERROR!. Base de Datos");
	}

	
}

}

