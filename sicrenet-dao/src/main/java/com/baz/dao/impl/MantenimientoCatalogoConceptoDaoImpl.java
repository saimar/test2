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
import com.baz.commons.vo.ConceptoVO;
import com.baz.dao.MantenimientoCatalogoConceptoDao;

import oracle.jdbc.OracleTypes;

@Named("mantenimientoCatalogoConceptoDaoImpl")
public class MantenimientoCatalogoConceptoDaoImpl implements MantenimientoCatalogoConceptoDao, Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@PersistenceContext(unitName = "panelGlobal", type = PersistenceContextType.EXTENDED)
	private EntityManager entityManager;
	private final Logger logger = LoggerFactory.getLogger(MantenimientoCatalogoConceptoDaoImpl.class);

	public List<ConceptoVO> cargaConceptoVO(int opcion, int idConcepto, int estatus) throws ExcepcionSicrenet {
		List<ConceptoVO> listConceptoVOResponsable = new ArrayList<ConceptoVO>();
		Connection connection = null;

		try {

			if (!entityManager.getTransaction().isActive())
				entityManager.getTransaction().begin();

			connection = getConnection(entityManager);

			// // date = sdf.parse(sdf.format(date));

			ResultSet rs = null;
			String sp = "{call USRTABLERO.SP_CAT_CONCEPTO(?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, opcion);
			callableStatement.setInt(2, idConcepto);
			callableStatement.setString(3, null);
			callableStatement.setInt(4, estatus);
			callableStatement.setString(5, null);
			callableStatement.registerOutParameter(6, OracleTypes.CURSOR);
			callableStatement.registerOutParameter(7, OracleTypes.VARCHAR);
			callableStatement.registerOutParameter(8, OracleTypes.VARCHAR);
			callableStatement.execute();

			rs = (ResultSet) callableStatement.getObject(6);

			ConceptoVO conceptoVO;

			while (rs.next()) {

				conceptoVO = new ConceptoVO(rs.getBigDecimal(1), rs.getString(2), rs.getInt(3), rs.getString(4));

				listConceptoVOResponsable.add(conceptoVO);
			}
			callableStatement.close();
			// if(entityManager.getTransaction().isActive())
			// entityManager.getTransaction().commit();
			if (connection != null)
				connection.close();

			System.out.println("Lista despues de la extraccion:::" + listConceptoVOResponsable.size());

			return listConceptoVOResponsable;

		} catch (Exception e) {
			logger.warn("Sicrenet::MantenimientoCatalogoConceptoDaoImpl::" + "cargaConceptoVO::" + e.getMessage());
			throw new ExcepcionSicrenet("ERROR!. Base de Datos");
		}
	}

	public void guardarCambiosAgregarActualizar(int opcion, int idConcepto, String descripcion, int estatus,
			String usuario) throws ExcepcionSicrenet {

		try {
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);

			String sp = "{call USRTABLERO.SP_CAT_CONCEPTO(?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, opcion);
			callableStatement.setInt(2, idConcepto);
			callableStatement.setString(3, descripcion);
			callableStatement.setInt(4, estatus);
			callableStatement.setString(5, usuario);
			callableStatement.registerOutParameter(6, OracleTypes.CURSOR);
			callableStatement.registerOutParameter(7, OracleTypes.VARCHAR);
			callableStatement.registerOutParameter(8, OracleTypes.VARCHAR);
			callableStatement.execute();

			entityManager.getTransaction().commit();
		} catch (Exception e) {
			logger.warn("Sicrenet::MantenimientoCatalogoConceptoDaoImpl::" + "guardarCambiosAgregarActualizar::"
					+ e.getMessage());
			throw new ExcepcionSicrenet("ERROR!. Base de Datos");
		}

		
	}

	public ConceptoVO cargarCatalogoConceptoValidateExiste(int opcion, int idConcepto, String descripcion)
			throws ExcepcionSicrenet {
		try {
			ConceptoVO ConceptoVO = null;
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);

			ResultSet rs = null;
			String sp = "{call USRTABLERO.SP_CAT_CONCEPTO(?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, opcion);
			callableStatement.setInt(2, idConcepto);
			callableStatement.setString(3, descripcion);
			callableStatement.setInt(4, 1);
			callableStatement.setString(5, null);
			callableStatement.registerOutParameter(6, OracleTypes.CURSOR);
			callableStatement.registerOutParameter(7, OracleTypes.VARCHAR);
			callableStatement.registerOutParameter(8, OracleTypes.VARCHAR);
			callableStatement.execute();
			rs = (ResultSet) callableStatement.getObject(6);

			// List<CatPanelView> listCatPanelView = new
			// ArrayList<CatPanelView>();

			while (rs.next()) {
				System.out.println("Entra al while:::::");
				ConceptoVO = new ConceptoVO(rs.getInt(1));

				System.out.println("obtenerEXISTE:::ESTATUS:::" + rs.getInt(1));
			}

			entityManager.getTransaction().commit();
			return ConceptoVO;
		} catch (Exception e) {
			logger.warn("Sicrenet::MantenimientoCatalogoConceptoDaoImpl::" + "cargarCatalogoConceptoValidateExiste::"
					+ e.getMessage());
			throw new ExcepcionSicrenet("ERROR!. Base de Datos");
		}

	}
}
