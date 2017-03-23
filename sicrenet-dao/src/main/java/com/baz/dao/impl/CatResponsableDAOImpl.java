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

import com.baz.commons.domain.CatResponsable;
import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.dao.CatResponsableDAO;

import oracle.jdbc.OracleTypes;

@Named("catResponsableDAOImpl")
public class CatResponsableDAOImpl implements CatResponsableDAO, Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@PersistenceContext(unitName = "panelGlobal", type = PersistenceContextType.EXTENDED)
    private EntityManager entityManager;
   
	private final Logger logger 
    = LoggerFactory.getLogger(CatResponsableDAOImpl.class);
	
	public List<CatResponsable> obtenerResponsable(int opcion, int idResponsable) throws ExcepcionSicrenet {
		List<CatResponsable> listCatResponsable = new ArrayList<CatResponsable>();
		Connection connection = null;
		System.out.println("CatResponsableDAOImpl::obtenerResponsable:::DATE::::::" );
		try {

			if (!entityManager.getTransaction().isActive())
				entityManager.getTransaction().begin();

			connection = getConnection(entityManager);

			// // date = sdf.parse(sdf.format(date));
			
			System.out.println("CatResponsableDAOImpl::obtenerResponsable:::::::::::::");
			
			ResultSet rs = null;
			String sp = "{call USRTABLERO.SP_CAT_RESPONSABLE(?,?,?,?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, opcion);
			callableStatement.setInt(2, idResponsable);
			callableStatement.setString(3, null);
			callableStatement.setString(4, null);
			callableStatement.setString(5, null);
			callableStatement.setString(6, null);
			callableStatement.setInt(7, 1);
			callableStatement.setString(8, null);
			callableStatement.registerOutParameter(9, OracleTypes.CURSOR);
			callableStatement.registerOutParameter(10, OracleTypes.NUMBER);
			callableStatement.registerOutParameter(11, OracleTypes.VARCHAR);
			callableStatement.registerOutParameter(12, OracleTypes.VARCHAR);
			callableStatement.execute();

			rs = (ResultSet) callableStatement.getObject(9);
			
			CatResponsable catResponsable;
			
			while (rs.next()) {
//				System.out.println("Entra al while:::::" + rs.getInt("ID_AGRUPADOR") + "::::" + rs.getInt("ID_ETAPA"));
				catResponsable =  new CatResponsable(rs.getBigDecimal(1),rs.getString(2),rs.getString(3),rs.getString(4),rs.getLong(5),rs.getLong(6));

				listCatResponsable.add(catResponsable);
			}
			callableStatement.close();
			// if(entityManager.getTransaction().isActive())
			// entityManager.getTransaction().commit();
			if (connection != null)
				connection.close();

			System.out.println("Lista despues de la extraccion:::" + listCatResponsable.size());
			
			return listCatResponsable;
			
		} catch (Exception e) {
			logger.warn("Sicrenet::CatResponsableDAOImpl::" + "obtenerResponsable::" + e.getMessage());
			throw new ExcepcionSicrenet("Error en persistencia: " + e);
		}
	}

}
