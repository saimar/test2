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
import com.baz.commons.vo.EtapasVO;
import com.baz.dao.MantenimientoCatalogoEtapaDao;

import oracle.jdbc.OracleTypes;

@Named("mantenimientoCatalogoEtapaDaoImpl")
public class MantenimientoCatalogoEtapaDaoImpl implements MantenimientoCatalogoEtapaDao, Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@PersistenceContext(unitName = "panelGlobal", type = PersistenceContextType.EXTENDED)
	private EntityManager entityManager;
	private final Logger logger = LoggerFactory.getLogger(MantenimientoCatalogoEtapaDaoImpl.class);

	

	public EtapasVO guardaCalatogoEtapa(int opcion, int idEtapa, String nombre, String descripcion, int estatus,
			String usuario) throws ExcepcionSicrenet {

		try {
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);

			String sp = "{call USRTABLERO.SP_CAT_ETAPA(?,?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, opcion);
			callableStatement.setInt(2, idEtapa);
			callableStatement.setString(3, nombre);
			callableStatement.setString(4, descripcion);
			callableStatement.setInt(5, estatus);
			callableStatement.setString(6, usuario);
			callableStatement.registerOutParameter(7, OracleTypes.CURSOR);
			callableStatement.registerOutParameter(8, OracleTypes.NUMBER);
			callableStatement.registerOutParameter(9, OracleTypes.VARCHAR);
			callableStatement.registerOutParameter(10, OracleTypes.VARCHAR);

			callableStatement.execute();

			System.out.println("MantenimientoCatalogoEtapaDaoImpl::agregaCatalogoEtapa:::nombreDao:::" + nombre);
			System.out.println(
					"MantenimientoCatalogoEtapaDaoImpl::agregaCatalogoEtapa:::descripcionDao:::" + descripcion);
			System.out.println("MantenimientoCatalogoEtapaDaoImpl::agregaCatalogoEtapa:::usuarioDao:::" + usuario);

			System.out.println("INGRESADO CORRECTAMENTE!!!");

			entityManager.getTransaction().commit();
		} catch (Exception e) {
			logger.warn("Sicrenet::MantenimientoCatologoEtapaDaoImpl::" + "guardaCalatogoEtapa::" + e.getMessage());
			throw new ExcepcionSicrenet("ERROR!. Base de Datos");
		}

		return null;
	}

	public EtapasVO cargarCatalogoEtapasValidateExiste(int opcion, int idEtapa, String nombre, String descripcion)
			throws ExcepcionSicrenet {
		try {
			EtapasVO etapasVO = null;
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);

			ResultSet rs = null;
			String sp = "{call USRTABLERO.SP_CAT_ETAPA(?,?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, opcion);
			callableStatement.setInt(2, idEtapa);
			callableStatement.setString(3, nombre);
			callableStatement.setString(4, descripcion);
			callableStatement.setInt(5, 1);
			callableStatement.setString(6, null);
			callableStatement.registerOutParameter(7, OracleTypes.CURSOR);
			callableStatement.registerOutParameter(8, OracleTypes.NUMBER);
			callableStatement.registerOutParameter(9, OracleTypes.VARCHAR);
			callableStatement.registerOutParameter(10, OracleTypes.VARCHAR);

			callableStatement.execute();
			rs = (ResultSet) callableStatement.getObject(7);
			// List<CatPanelView> listCatPanelView = new
			// ArrayList<CatPanelView>();

			while (rs.next()) {
				System.out.println("Entra al while:::::");
				etapasVO = new EtapasVO(rs.getInt(1));

				System.out.println("obtenerEXISTE:::ESTATUS:::" + rs.getInt(1));
			}

			entityManager.getTransaction().commit();
			return etapasVO;
		} catch (Exception e) {
			logger.warn("Sicrenet::MantenimientoCatalogoEtapaDaoImpl::" + "cargarCatalogoEtapasValidateExiste::"
					+ e.getMessage());
			throw new ExcepcionSicrenet("ERROR!. Base de Datos");
		}

	}
}
