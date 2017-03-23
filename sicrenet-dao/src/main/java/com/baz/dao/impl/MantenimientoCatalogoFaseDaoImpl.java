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
import com.baz.commons.vo.FasesVO;
import com.baz.dao.MantenimientoCatalogoFaseDao;

import oracle.jdbc.OracleTypes;

@Named("mantenimientoCatalogoFaseDaoImpl")
public class MantenimientoCatalogoFaseDaoImpl implements MantenimientoCatalogoFaseDao, Serializable {
	
	
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@PersistenceContext(unitName = "panelGlobal", type = PersistenceContextType.EXTENDED)
	private EntityManager entityManager;
	private final Logger logger = LoggerFactory.getLogger(MantenimientoCatalogoFaseDaoImpl.class);

	public List<FasesVO> cargarCatalogoFase(int opcion, int idFase, int estatus) throws ExcepcionSicrenet {
		try {
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);

			ResultSet rs = null;
			String sp = "{call USRTABLERO.SP_CAT_FACE(?,?,?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, opcion);
			callableStatement.setInt(2, idFase);
			callableStatement.setString(3, null);
			callableStatement.setString(4, null);
			callableStatement.setString(5, null);
			callableStatement.setInt(6, estatus);
			callableStatement.setString(7, null);
			callableStatement.registerOutParameter(8, OracleTypes.CURSOR);
			callableStatement.registerOutParameter(9, OracleTypes.NUMBER);
			callableStatement.registerOutParameter(10, OracleTypes.VARCHAR);
			callableStatement.registerOutParameter(11, OracleTypes.VARCHAR);

			callableStatement.execute();
			rs = (ResultSet) callableStatement.getObject(8);

			List<FasesVO> listCatFace = new ArrayList<FasesVO>();
			while (rs.next()) {
				System.out.println("Entra al while:::::");
				FasesVO catFace = new FasesVO(rs.getBigDecimal(1), rs.getString(2), rs.getString(3), rs.getInt(4),
						rs.getBigDecimal(5), rs.getString(6));
				listCatFace.add(catFace);

				System.out.println("obtenerID_FASE:ID_FASE:::" + rs.getBigDecimal(1));
			}

			entityManager.getTransaction().commit();
			return listCatFace;
		} catch (Exception e) {
			logger.warn("Sicrenet::MantenimientoCatalogoFaseDaoImpl::" + "cargarCatalogoFase::" + e.getMessage());
			throw new ExcepcionSicrenet("ERROR!. Base de Datos");
		}

	}

	public FasesVO guardarCatalogoFase(int opcion, int idFase, String nombre, String descripcion, int idEtapa,
			int estatus, String usuario) throws ExcepcionSicrenet {

		try {
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);

			String sp = "{call USRTABLERO.SP_CAT_FACE(?,?,?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, opcion);
			callableStatement.setInt(2, idFase);
			callableStatement.setString(3, nombre);
			callableStatement.setString(4, descripcion);
			callableStatement.setString(5, String.valueOf(idEtapa));
			callableStatement.setInt(6, estatus);
			callableStatement.setString(7, usuario);
			callableStatement.registerOutParameter(8, OracleTypes.CURSOR);
			callableStatement.registerOutParameter(9, OracleTypes.NUMBER);
			callableStatement.registerOutParameter(10, OracleTypes.VARCHAR);
			callableStatement.registerOutParameter(11, OracleTypes.VARCHAR);

			callableStatement.execute();
			System.out.println("MantenimientoCatalogoFaceDaoImpl::agregarCatFace:::nombreDao:::" + nombre);
			System.out.println("MantenimientoCatalogoFaceDaoImpl::agregarCatFace:::descripcionDao:::" + descripcion);
			System.out.println("MantenimientoCatalogoFaceDaoImpl::agregarCatFace:::usuarioDao:::" + usuario);
			System.out.println("MantenimientoCatalogoFaceDaoImpl::agregarCatFace:::idEtapaDao:::" + idEtapa);

			System.out.println("INGRESADO CORRECTAMENTE!!!");

			entityManager.getTransaction().commit();
		} catch (Exception e) {
			logger.warn("Sicrenet::MantenimientoCatologoFaseDaoImpl::" + "guardarCatalogoFase::" + e.getMessage());
			throw new ExcepcionSicrenet("ERROR!. Base de Datos");
		}

		return null;
	}

	public FasesVO cargarCatalogoFaseValidateExiste(int opcion, int idFase, String nombre, String descripcion)
			throws ExcepcionSicrenet {
		try {
			FasesVO catFace = null;
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);

			ResultSet rs = null;
			String sp = "{call USRTABLERO.SP_CAT_FACE(?,?,?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, opcion);
			callableStatement.setInt(2, idFase);
			callableStatement.setString(3, nombre);
			callableStatement.setString(4, descripcion);
			callableStatement.setString(5, null);
			callableStatement.setInt(6, 1);
			callableStatement.setString(7, null);
			callableStatement.registerOutParameter(8, OracleTypes.CURSOR);
			callableStatement.registerOutParameter(9, OracleTypes.NUMBER);
			callableStatement.registerOutParameter(10, OracleTypes.VARCHAR);
			callableStatement.registerOutParameter(11, OracleTypes.VARCHAR);

			callableStatement.execute();
			rs = (ResultSet) callableStatement.getObject(8);

			while (rs.next()) {
				System.out.println("Entra al while:::::");
				catFace = new FasesVO(rs.getInt(1));

				System.out.println("obtenerESTATUS:::::ESTATUS:::" + rs.getInt(1));
			}

			entityManager.getTransaction().commit();
			return catFace;
		} catch (Exception e) {
			logger.warn("Sicrenet::MantenimientoCatalogoFaseDaoImpl::" + "cargarCatalogoFaseValidateExiste::"
					+ e.getMessage());
			throw new ExcepcionSicrenet("ERROR!. Base de Datos");
		}

	}

}
