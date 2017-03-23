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
import com.baz.commons.vo.NivelVO;
import com.baz.dao.CatNivelDao;

import oracle.jdbc.OracleTypes;


@Named("catNivelDaoImpl")
public class CatNivelDaoImpl implements CatNivelDao, Serializable {

	

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@PersistenceContext(unitName = "panelGlobal", type = PersistenceContextType.EXTENDED)
    private EntityManager entityManager;
    private final Logger logger 
	    = LoggerFactory.getLogger(MantenimientoCatalogoEtapaDaoImpl.class);

	
	
	@Override
	public List<NivelVO> cargarCatalogoNivel() throws ExcepcionSicrenet {
		try {
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);

			ResultSet rs = null;
			String sp = "{call USRTABLERO.SP_CAT_NIVEL(?,?,?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, 0);
			callableStatement.setInt(2, 0);
			callableStatement.setString(3, null);
			callableStatement.setString(4, null);
			callableStatement.setString(5, null);
			callableStatement.setInt(6, 1);
			callableStatement.setString(7, null);
			callableStatement.registerOutParameter(8, OracleTypes.CURSOR);
			callableStatement.registerOutParameter(9,OracleTypes.NUMBER );
			callableStatement.registerOutParameter(10,OracleTypes.VARCHAR );
			callableStatement.registerOutParameter(11,OracleTypes.VARCHAR );

			callableStatement.execute();
			rs = (ResultSet) callableStatement.getObject(8);

			List<NivelVO> listNivelVO = new ArrayList<NivelVO>(); 
			while (rs.next()) {
				System.out.println("Entra al while:::::");
				NivelVO nivelVO = new NivelVO( 
						rs.getBigDecimal(1),
						rs.getString(2),
						rs.getString(3),
						rs.getBigDecimal(4),
						rs.getString(5),
						rs.getInt(6)
						);
				listNivelVO.add(nivelVO);
				
				System.out.println("obtenerID_NIVELE:ID_NIVEL:::"+rs.getBigDecimal(1));
			}
			
			
			entityManager.getTransaction().commit();
			return listNivelVO;
		}  catch (Exception e) {
			logger.warn("Sicrenet::MantenimientoCatalogoFuenteDaoImpl::" 
	                + "CargaCatalogoNivel::" + e.getMessage());
	        throw new ExcepcionSicrenet("Error en persistencia: " + e);
		}
	}

}
