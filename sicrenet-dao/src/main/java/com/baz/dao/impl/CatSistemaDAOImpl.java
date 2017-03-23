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

import com.baz.commons.domain.CatSistema;
import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.dao.CatSistemaDAO;

import oracle.jdbc.OracleTypes;
@Named("catSistemaDAOImpl")
public class CatSistemaDAOImpl implements CatSistemaDAO,Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@PersistenceContext(unitName = "panelGlobal", type = PersistenceContextType.EXTENDED)
    private EntityManager entityManager;
   
	private final Logger logger 
    = LoggerFactory.getLogger(CatSistemaDAOImpl.class);

	public List<CatSistema> obtenerSistema(int opcion, int idSistema) throws ExcepcionSicrenet {
		List<CatSistema> listCatSistema = new ArrayList<CatSistema>();
		Connection connection = null;
		System.out.println("CatSistemaDAOImpl::obtenerSistema:::DATE::::::" );
		try {

			if (!entityManager.getTransaction().isActive())
				entityManager.getTransaction().begin();

			connection = getConnection(entityManager);

			// // date = sdf.parse(sdf.format(date));
			
			System.out.println("CatSistemaDAOImpl::obtenerSistema:::::::::::::");
			
			ResultSet rs = null;
			String sp = "{call USRTABLERO.SP_CAT_SISTEMA(?,?,?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, opcion);
			callableStatement.setInt(2, idSistema);
			callableStatement.setString(3, null);
			callableStatement.setString(4, null);
			callableStatement.setInt(5, 1);
			callableStatement.setString(6, null);
			callableStatement.setString(7, null);
			callableStatement.registerOutParameter(8, OracleTypes.CURSOR);
			callableStatement.registerOutParameter(9, OracleTypes.NUMBER);
			callableStatement.registerOutParameter(10, OracleTypes.VARCHAR);
			callableStatement.registerOutParameter(11, OracleTypes.VARCHAR);
			callableStatement.execute();

			rs = (ResultSet) callableStatement.getObject(8);
			
			CatSistema catSistema;
			
			while (rs.next()) {
				catSistema =  
				new CatSistema(rs.getBigDecimal(1),rs.getString(2),rs.getString(3),rs.getString(4));
				listCatSistema.add(catSistema);
			}
			callableStatement.close();
			// if(entityManager.getTransaction().isActive())
			// entityManager.getTransaction().commit();
			if (connection != null)
				connection.close();

			System.out.println("Lista despues de la extraccion:::" + listCatSistema.size());
			
			return listCatSistema;
			
		} catch (Exception e) {
			logger.warn("Sicrenet::CatSistemaDAOImpl::" + "obtenerSistema::" + e.getMessage());
			throw new ExcepcionSicrenet("Error en persistencia: " + e);
		}
	}

}
