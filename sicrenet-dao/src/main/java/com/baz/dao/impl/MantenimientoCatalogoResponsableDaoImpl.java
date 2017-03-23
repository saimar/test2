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
import com.baz.commons.vo.ResponsableVO;
import com.baz.dao.MantenimientoCatalogoResponsableDao;

import oracle.jdbc.OracleTypes;

@Named("mantenimientoCatalogoResponsableDaoImpl")
public class MantenimientoCatalogoResponsableDaoImpl implements MantenimientoCatalogoResponsableDao, Serializable {
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@PersistenceContext(unitName = "panelGlobal", type = PersistenceContextType.EXTENDED)
    private EntityManager entityManager;
    private final Logger logger 
	    = LoggerFactory.getLogger(MantenimientoCatalogoResponsableDaoImpl.class);

	
    public List<ResponsableVO> cargaResponsableVO(int opcion, int idResponsable) throws ExcepcionSicrenet {
		List<ResponsableVO> listResponsableVO = new ArrayList<ResponsableVO>();
		Connection connection = null;
		
		try {

			if (!entityManager.getTransaction().isActive())
				entityManager.getTransaction().begin();

			connection = getConnection(entityManager);

			// // date = sdf.parse(sdf.format(date));
			
		
			
			ResultSet rs = null;
			String sp = "{call USRTABLERO.SP_CAT_RESPONSABLE(?,?,?,?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, opcion);
			callableStatement.setInt(2, idResponsable);
			callableStatement.setString(3, null);
			callableStatement.setString(4, null);
			callableStatement.setString(5, null);
			callableStatement.setString(6, null);
			callableStatement.setInt(7, 0);
			callableStatement.setString(8, null);
			callableStatement.registerOutParameter(9, OracleTypes.CURSOR);
			callableStatement.registerOutParameter(10, OracleTypes.NUMBER);
			callableStatement.registerOutParameter(11, OracleTypes.VARCHAR);
			callableStatement.registerOutParameter(12, OracleTypes.VARCHAR);
			callableStatement.execute();

			rs = (ResultSet) callableStatement.getObject(9);
			
			ResponsableVO ResponsableVO;
			
			while (rs.next()) {

				ResponsableVO =  new ResponsableVO(
						rs.getBigDecimal(1),
						rs.getString(2),
						rs.getString(3),
						rs.getInt(4),
						rs.getString(5),
						rs.getString(6),
						rs.getString(7));

				listResponsableVO.add(ResponsableVO);
			}
			callableStatement.close();
			// if(entityManager.getTransaction().isActive())
			// entityManager.getTransaction().commit();
			if (connection != null)
				connection.close();

			System.out.println("Lista despues de la extraccion:::" + listResponsableVO.size());
			
			return listResponsableVO;
			
		} catch (Exception e) {
			logger.warn("Sicrenet::MantenimientoCatalogoResponsableDaoImpl::" 
							+ "cargaConceptoVO::" + e.getMessage());
	        throw new ExcepcionSicrenet("ERROR!. Base de Datos");
		}
	}
	

	public ResponsableVO guardarCatalogoResponsable(int opcion, int idResponsable, ResponsableVO agregarResponsable, String usuario) throws ExcepcionSicrenet {

		try {
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);
			
			String sp = "{call USRTABLERO.SP_CAT_RESPONSABLE(?,?,?,?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, opcion);
			callableStatement.setInt(2, idResponsable);
			callableStatement.setString(3, agregarResponsable.getNumEmpleado());
			callableStatement.setString(4, agregarResponsable.getNombre());
			callableStatement.setString(5, agregarResponsable.getExtencion());
			callableStatement.setString(6, agregarResponsable.getUbicacion());
			callableStatement.setInt(7, agregarResponsable.getEstatus());
			callableStatement.setString(8, usuario);
			callableStatement.registerOutParameter(9, OracleTypes.CURSOR);
			callableStatement.registerOutParameter(10, OracleTypes.NUMBER);
			callableStatement.registerOutParameter(11, OracleTypes.VARCHAR);
			callableStatement.registerOutParameter(12, OracleTypes.VARCHAR);
			callableStatement.execute();
			 System.out.println("ingresado correctamente");
			
			entityManager.getTransaction().commit();
		} catch (Exception e) {
			logger.warn("Sicrenet::MantenimientoCatalogoResponsableDaoImpl::" 
	                + "guardarCatalogoResponsable::" + e.getMessage());
	        throw new ExcepcionSicrenet("ERROR!. Base de Datos");
		}

		return null;
	}

	


public ResponsableVO cargarCatalogoResponsableValidateExiste(int opcion, int idResponsable, String numEmpleado) throws ExcepcionSicrenet {
	try { ResponsableVO ResponsableVO = null;
		entityManager.getTransaction().begin();
		Connection connection = getConnection(entityManager);

		ResultSet rs = null;
		String sp = "{call USRTABLERO.SP_CAT_RESPONSABLE(?,?,?,?,?,?,?,?,?,?,?,?)}";
		CallableStatement callableStatement = connection.prepareCall(sp);
		callableStatement.setInt(1, opcion);
		callableStatement.setInt(2, idResponsable);
		callableStatement.setString(3, numEmpleado);
		callableStatement.setString(4, null);
		callableStatement.setString(5, null);
		callableStatement.setString(6, null);
		callableStatement.setInt(7, 0);
		callableStatement.setString(8, null);
		callableStatement.registerOutParameter(9, OracleTypes.CURSOR);
		callableStatement.registerOutParameter(10, OracleTypes.NUMBER);
		callableStatement.registerOutParameter(11, OracleTypes.VARCHAR);
		callableStatement.registerOutParameter(12, OracleTypes.VARCHAR);
		callableStatement.execute();
		
		rs = (ResultSet) callableStatement.getObject(9);
		
		
		while (rs.next()) {
			System.out.println("Entra al while:::::");
			ResponsableVO = new ResponsableVO( 
					rs.getInt(1));
			
			
			
		}
		
		entityManager.getTransaction().commit();
		return ResponsableVO;
	}  catch (Exception e) {
		logger.warn("Sicrenet::MantenimientoCatalogoResponsableDaoImpl::" 
                + "cargarCatalogoConceptoValidateExiste::" + e.getMessage());
        throw new ExcepcionSicrenet("ERROR!. Base de Datos");
	}

	
}
}

