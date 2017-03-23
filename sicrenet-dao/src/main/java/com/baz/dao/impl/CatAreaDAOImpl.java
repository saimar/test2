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

import com.baz.commons.domain.CatArea;
import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.AreaVO;
import com.baz.dao.CatAreaDAO;

import oracle.jdbc.OracleTypes;

@Named("catAreaDAOImpl")
public class CatAreaDAOImpl implements CatAreaDAO, Serializable {

	
	/**
	 * 
	 */

	private static final long serialVersionUID = 1L;

	@PersistenceContext(unitName = "panelGlobal", type = PersistenceContextType.EXTENDED)
    private EntityManager entityManager;
   
	private final Logger logger 
    = LoggerFactory.getLogger(CatAreaDAOImpl.class);
	
	public List<CatArea> obtenerAreaResponsable(int opcion, int idArea) throws ExcepcionSicrenet {
		List<CatArea> listCatAreResponsable = new ArrayList<CatArea>();
		Connection connection = null;
		System.out.println("CatResponsableDAOImpl::obtenerResponsable:::DATE::::::" );
		try {

			if (!entityManager.getTransaction().isActive())
				entityManager.getTransaction().begin();

			connection = getConnection(entityManager);

			// // date = sdf.parse(sdf.format(date));
			
			System.out.println("CatAreaDAOImpl::obtenerAreaResponsable:::::::::::::");
			
			ResultSet rs = null;
			String sp = "{call USRTABLERO.SP_CAT_AREA(?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, opcion);
			callableStatement.setInt(2, idArea);
			callableStatement.setString(3, null);
			callableStatement.setInt(4, 1);
			callableStatement.setString(5, null);
			callableStatement.registerOutParameter(6, OracleTypes.CURSOR);
			callableStatement.registerOutParameter(7, OracleTypes.NUMBER);
			callableStatement.registerOutParameter(8, OracleTypes.VARCHAR);
			callableStatement.registerOutParameter(9, OracleTypes.VARCHAR);
			callableStatement.execute();

			rs = (ResultSet) callableStatement.getObject(6);
			
			CatArea catResponsable;
			
			while (rs.next()) {

				catResponsable =  new CatArea(rs.getBigDecimal(1),rs.getString(2));
//						new CatRespCatAreaonsable(rs.getBigDecimal(1),rs.getString(2),rs.getString(3),rs.getString(4),rs.getLong(5),rs.getLong(6));

				listCatAreResponsable.add(catResponsable);
			}
			callableStatement.close();
			// if(entityManager.getTransaction().isActive())
			// entityManager.getTransaction().commit();
			if (connection != null)
				connection.close();

			System.out.println("Lista despues de la extraccion:::" + listCatAreResponsable.size());
			
			return listCatAreResponsable;
			
		} catch (Exception e) {
			logger.warn("Sicrenet::CatAreaDAOImpl::" + "obtenerAreaResponsable::" + e.getMessage());
			throw new ExcepcionSicrenet("Error en persistencia: " + e);
		}
	}


	public List<AreaVO> obtenerAreas(int opcion, int idArea, int estatus) throws ExcepcionSicrenet {
		List<AreaVO> listAreaVOResponsable = new ArrayList<AreaVO>();
		Connection connection = null;
		System.out.println("CatAreaDAOImpl::obtenerAreas:::DATE::::::" );
		try {

			if (!entityManager.getTransaction().isActive())
				entityManager.getTransaction().begin();

			connection = getConnection(entityManager);

			// // date = sdf.parse(sdf.format(date));
			
			System.out.println("CatAreaDAOImpl::obtenerAreas:::::::::::::");
			
			ResultSet rs = null;
			String sp = "{call USRTABLERO.SP_CAT_AREA(?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, opcion);
			callableStatement.setInt(2, idArea);
			callableStatement.setString(3, null);
			callableStatement.setInt(4, estatus);
			callableStatement.setString(5, null);
			callableStatement.registerOutParameter(6, OracleTypes.CURSOR);
			callableStatement.registerOutParameter(7, OracleTypes.NUMBER);
			callableStatement.registerOutParameter(8, OracleTypes.VARCHAR);
			callableStatement.registerOutParameter(9, OracleTypes.VARCHAR);
			callableStatement.execute();

			rs = (ResultSet) callableStatement.getObject(6);
			
			AreaVO areaVO;
			
			while (rs.next()) {

				areaVO =  new AreaVO(rs.getBigDecimal(1),rs.getString(2),rs.getInt(3), rs.getString(4));

				listAreaVOResponsable.add(areaVO);
			}
			callableStatement.close();
			// if(entityManager.getTransaction().isActive())
			// entityManager.getTransaction().commit();
			if (connection != null)
				connection.close();

			System.out.println("Lista despues de la extraccion:::" + listAreaVOResponsable.size());
			
			return listAreaVOResponsable;
			
		} catch (Exception e) {
			logger.warn("Sicrenet::CatAreaDAOImpl::" + "obtenerAreas::" + e.getMessage());
			throw new ExcepcionSicrenet("Error en persistencia: " + e);
		}
	}
}
