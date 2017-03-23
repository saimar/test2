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
import com.baz.commons.vo.CedulaVO;
import com.baz.dao.CatCedulaDao;

import oracle.jdbc.OracleTypes;

@Named("catCedulaDaoImpl")
public class CatCedulaDaoImpl implements CatCedulaDao, Serializable {
	

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@PersistenceContext(unitName = "panelGlobal", type = PersistenceContextType.EXTENDED)
    private EntityManager entityManager;
    private final Logger logger 
	    = LoggerFactory.getLogger(CatCedulaDaoImpl.class);

	
	
	@Override
	public List<CedulaVO> cargarCatalogoCedula() throws ExcepcionSicrenet {
		try {
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);

			ResultSet rs = null;
			String sp = "{call USRTABLERO.SP_CAT_CEDULA(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, 0);
			callableStatement.setInt(2, 0);
			callableStatement.setString(3, null);
			callableStatement.setString(4, null);
			callableStatement.setString(5, null);
			callableStatement.setString(6, null);
			callableStatement.setString(7, null);
			callableStatement.setString(8, null);
			callableStatement.setString(9, null);
			callableStatement.setString(10, null);
			callableStatement.setString(11, null);
			callableStatement.setString(12, null);
			callableStatement.setString(13, null);
			callableStatement.setInt(14, 0);
			callableStatement.setInt(15, 1);
			callableStatement.setInt(16, 0);
			callableStatement.setInt(17, 0);
			callableStatement.setString(18, null);
			callableStatement.setString(19, null);
			callableStatement.setString(20, null);
			callableStatement.registerOutParameter(21, OracleTypes.CURSOR);
			callableStatement.registerOutParameter(22,OracleTypes.NUMBER );
			callableStatement.registerOutParameter(23,OracleTypes.VARCHAR );
			callableStatement.registerOutParameter(24,OracleTypes.VARCHAR );

			callableStatement.execute();
			rs = (ResultSet) callableStatement.getObject(21);

			List<CedulaVO> listCedulaVO = new ArrayList<CedulaVO>(); 
			while (rs.next()) {
				System.out.println("Entra al while:::::");
				CedulaVO cedulaVO = new CedulaVO( 
						rs.getBigDecimal(1),
						rs.getString(2),
						rs.getString(3),
						rs.getString(4),
						rs.getString(5),
						rs.getString(6),
						rs.getString(7),
						rs.getString(8),
						rs.getString(9),
						rs.getString(10),
						rs.getString(11),
						rs.getString(12),
						rs.getInt(13),
						rs.getBigDecimal(14),
						rs.getBigDecimal(15),
						rs.getInt(16),
						rs.getString(17),
						rs.getString(18),
						rs.getString(19),
						rs.getString(20),
						rs.getString(21),
						rs.getString(22)					
						);
				listCedulaVO.add(cedulaVO);
				
				System.out.println("obtenerID_FUENTE:ID_CEDULA:::"+rs.getInt(1));
			}
			
			
			entityManager.getTransaction().commit();
			return listCedulaVO;
		}  catch (Exception e) {
			logger.warn("Sicrenet::CatCedulaDaoImpl::" 
	                + "CargaCatalogoCedula::" + e.getMessage());
	        throw new ExcepcionSicrenet("Error en persistencia: " + e);
		}
	}

}
