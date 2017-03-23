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
import com.baz.commons.vo.NegocioVO;
import com.baz.dao.MantenimientoCatalogoNegocioDao;

import oracle.jdbc.OracleTypes;

@Named("mantenimientoCatalogoNegocioDaoImpl")
public class MantenimientoCatalogoNegocioDaoImpl implements MantenimientoCatalogoNegocioDao, Serializable {
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@PersistenceContext(unitName = "panelGlobal", type = PersistenceContextType.EXTENDED)
    private EntityManager entityManager;
    private final Logger logger 
	    = LoggerFactory.getLogger(MantenimientoCatalogoNegocioDaoImpl.class);

	

    public List<NegocioVO> cargarCatalogoNegocio(int opcion, int idNegocio, int estatus) throws ExcepcionSicrenet{
    	
    	
    	try {
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);
			
			ResultSet rs = null;
			String sp = "{call USRTABLERO.SP_CAT_NEGOCIOS(?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, opcion);
			callableStatement.setInt(2, idNegocio);
			callableStatement.setString(3, null);
			callableStatement.setInt(4, estatus);
			callableStatement.setString(5, null);
			callableStatement.registerOutParameter(6, OracleTypes.CURSOR);
			callableStatement.registerOutParameter(7, OracleTypes.NUMBER);
			callableStatement.registerOutParameter(8, OracleTypes.VARCHAR);
			callableStatement.registerOutParameter(9, OracleTypes.VARCHAR);
			callableStatement.execute();
    	
    	
    	rs = (ResultSet) callableStatement.getObject(6);

		List<NegocioVO> listNegocioVO = new ArrayList<NegocioVO>(); 
		while (rs.next()) {
			System.out.println("Entra al while:::::");
			NegocioVO NegocioVO = new NegocioVO( 
					rs.getBigDecimal(1),
					rs.getString(2),
					rs.getInt(3)
					);
			listNegocioVO.add(NegocioVO);
			
			System.out.println("obtenerID_FACE:ID_FACE:::"+rs.getBigDecimal(1));
		}
		
		
		entityManager.getTransaction().commit();
		return listNegocioVO;
    	} catch (Exception e) {
			logger.warn("Sicrenet::MantenimientoCatalogoNegocioDaoImpl::" 
	                + "cargarCatalogoNegocio::" + e.getMessage());
	        throw new ExcepcionSicrenet("ERROR!. Base de Datos");
		}
    }
	
	

	public NegocioVO guardarCatalogoNegocio(int opcion, int idNegocio, String descripcion, int estatus, String usuario) throws ExcepcionSicrenet {

		try {
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);
			
			String sp = "{call USRTABLERO.SP_CAT_NEGOCIOS(?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, opcion);
			callableStatement.setInt(2, idNegocio);
			callableStatement.setString(3, descripcion);
			callableStatement.setInt(4, estatus);
			callableStatement.setString(5, usuario);
			callableStatement.registerOutParameter(6, OracleTypes.CURSOR);
			callableStatement.registerOutParameter(7, OracleTypes.NUMBER);
			callableStatement.registerOutParameter(8, OracleTypes.VARCHAR);
			callableStatement.registerOutParameter(9, OracleTypes.VARCHAR);
			callableStatement.execute();
			
			
			System.out.println("MantenimientoCatalogoNegocioDaoImpl::::guardarCatalogoNegocio::::estatus:::"+ estatus);
			System.out.println("MantenimientoCatalogoNegocioDaoImpl::::guardarCatalogoNegocio::::idNegocio:::"+ idNegocio);
			System.out.println("MantenimientoCatalogoNegocioDaoImpl::::guardarCatalogoNegocio::::descripcion:::"+ descripcion);
			System.out.println("MantenimientoCatalogoNegocioDaoImpl::::guardarCatalogoNegocio::::usuario:::"+ usuario);
			
			entityManager.getTransaction().commit();
		} catch (Exception e) {
			logger.warn("Sicrenet::MantenimientoCatalogoNegocioDaoImpl::" 
	                + "guardarCatalogoNegocio::" + e.getMessage());
	        throw new ExcepcionSicrenet("ERROR!. Base de Datos");
		}

		return null;
	}

	


public NegocioVO cargarCatalogoNegocioValidateExiste(int opcion, int idNegocio, String descripcion) throws ExcepcionSicrenet {
	try { NegocioVO NegocioVO = null;
		entityManager.getTransaction().begin();
		Connection connection = getConnection(entityManager);

		ResultSet rs = null;
		String sp = "{call USRTABLERO.SP_CAT_NEGOCIOS(?,?,?,?,?,?,?,?,?)}";
		CallableStatement callableStatement = connection.prepareCall(sp);
		callableStatement.setInt(1, opcion);
		callableStatement.setInt(2, idNegocio);
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
			NegocioVO = new NegocioVO( 
					rs.getInt(1));
			
			
			System.out.println("obtenerEXISTE:::ESTATUS:::"+rs.getInt(1));
		}
		
		entityManager.getTransaction().commit();
		return NegocioVO;
	}  catch (Exception e) {
		logger.warn("Sicrenet::MantenimientoCatologoNegocioDaoImpl::" 
                + "cargarCatalogoNegocioValidateExiste::" + e.getMessage());
        throw new ExcepcionSicrenet("ERROR!. Base de Datos");
	}

	
}

}

