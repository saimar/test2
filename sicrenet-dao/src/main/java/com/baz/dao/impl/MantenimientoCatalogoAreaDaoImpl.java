package com.baz.dao.impl;

import static com.baz.dao.util.Conexion.getConnection;

import java.io.Serializable;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;

import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.AreaVO;
import com.baz.dao.MantenimientoCatalogoAreaDao;

import oracle.jdbc.OracleTypes;

@Named("mantenimientoCatalogoAreaDaoImpl")
public class MantenimientoCatalogoAreaDaoImpl implements MantenimientoCatalogoAreaDao, Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@PersistenceContext(unitName = "panelGlobal", type = PersistenceContextType.EXTENDED)
	private EntityManager entityManager;
	private final Logger logger = LoggerFactory.getLogger(MantenimientoCatalogoAreaDaoImpl.class);

	public void guardarCatalogoArea(int opcion, int idArea, String descripcion, int estatus, String usuario)
			throws ExcepcionSicrenet {

		try {
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);

			String sp = "{call USRTABLERO.SP_CAT_AREA(?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, opcion);
			callableStatement.setInt(2, idArea);
			callableStatement.setString(3, descripcion);
			callableStatement.setInt(4, estatus);
			callableStatement.setString(5, usuario);
			callableStatement.registerOutParameter(6, OracleTypes.CURSOR);
			callableStatement.registerOutParameter(7, OracleTypes.NUMBER);
			callableStatement.registerOutParameter(8, OracleTypes.VARCHAR);
			callableStatement.registerOutParameter(9, OracleTypes.VARCHAR);
			callableStatement.execute();

			System.out.println("MantenimientoCatologoAreaDaoImpl::::guardarCatalogoArea::::estatus:::" + estatus);
			System.out.println("MantenimientoCatologoAreaDaoImpl::::guardarCatalogoArea::::idArea:::" + idArea);
			System.out
					.println("MantenimientoCatologoAreaDaoImpl::::guardarCatalogoArea::::descripcion:::" + descripcion);
			System.out.println("MantenimientoCatologoAreaDaoImpl::::guardarCatalogoArea::::usuario:::" + usuario);

			entityManager.getTransaction().commit();
		} catch (Exception e) {
			logger.warn("Sicrenet::MantenimientoCatologoAreaDaoImpl::" + "guardarCatalogoArea::" + e.getMessage());
			throw new ExcepcionSicrenet("ERROR!. Base de Datos");
		}
			
	
	}

	public AreaVO cargarCatalogoAreaValidateExiste(int opcion, int idArea, String descripcion)
			throws ExcepcionSicrenet {
		try {
			AreaVO etapasVO = null;
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);

			ResultSet rs = null;
			String sp = "{call USRTABLERO.SP_CAT_AREA(?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, opcion);
			callableStatement.setInt(2, idArea);
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
				etapasVO = new AreaVO(rs.getInt(1));

				System.out.println("obtenerEXISTE:::ESTATUS:::" + rs.getInt(1));
			}

			entityManager.getTransaction().commit();
			return etapasVO;
		} catch (Exception e) {
			logger.warn("Sicrenet::MantenimientoCatologoAreaDaoImpl::" + "cargarCatalogoAreaValidateExiste::"
					+ e.getMessage());
			throw new ExcepcionSicrenet("ERROR!. Base de Datos");
		}

	}

}
