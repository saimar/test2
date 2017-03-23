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
import com.baz.commons.vo.EtapasVO;
import com.baz.dao.CatEtapaDao;

import oracle.jdbc.OracleTypes;

@Named("catEtapaDaoImpl")
public class CatEtapaDaoImpl implements CatEtapaDao , Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@PersistenceContext(unitName = "panelGlobal", type = PersistenceContextType.EXTENDED)
    private EntityManager entityManager;
	
	private final Logger logger 
    = LoggerFactory.getLogger(CatEtapaDaoImpl.class);
	
	public List<EtapasVO> cargarCatalogoEtapas(int opcion, int idEtapa, int estatus) throws ExcepcionSicrenet {
		try {
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);

			ResultSet rs = null;
			String sp = "{call USRTABLERO.SP_CAT_ETAPA(?,?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, opcion);
			callableStatement.setInt(2, idEtapa);
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
			// List<CatPanelView> listCatPanelView = new
			// ArrayList<CatPanelView>();

			List<EtapasVO> listCatEtapa = new ArrayList<EtapasVO>();
			while (rs.next()) {
				System.out.println("Entra al while:::::");
				EtapasVO catEtapa = new EtapasVO(rs.getBigDecimal(1), rs.getString(2), rs.getString(3), rs.getInt(4),
						rs.getString(5));
				listCatEtapa.add(catEtapa);

				System.out.println("obtenerID_ETAPA:ID_ETAPA:::" + rs.getInt(1));
			}

			entityManager.getTransaction().commit();
			return listCatEtapa;
		} catch (Exception e) {
			logger.warn("Sicrenet::CatEtapaDaoImpl::" + "cargarCatalogoEtapas::" + e.getMessage());
			throw new ExcepcionSicrenet("ERROR!. Base de Datos");
		}

	}

}
