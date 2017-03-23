package com.baz.dao.impl;

import static com.baz.dao.util.Conexion.getConnection;

import java.io.Serializable;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.baz.commons.domain.CatCedula;
import com.baz.commons.domain.CatPanelView;
import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.BitFuenteVO;
import com.baz.dao.PanelDeControlDao;

import oracle.jdbc.OracleTypes;

@Named("panelDeControlDaoImpl")
public class PanelDeControlDaoImpl implements PanelDeControlDao, Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@PersistenceContext(unitName = "panelGlobal", type = PersistenceContextType.EXTENDED)
    private EntityManager entityManager;
   
	@PersistenceContext(unitName = "sicrenetMexico", type = PersistenceContextType.EXTENDED)
	private EntityManager entityManagerMexico;
	
	private final Logger logger 
    = LoggerFactory.getLogger(PanelDeControlDaoImpl.class);
	
	
	public List<CatPanelView> obtenerEtapaUno(String usuario, int opcion, int nivel, Date date)
			throws ExcepcionSicrenet {
		List<CatPanelView> listCatPanelView = new ArrayList<CatPanelView>();
		Connection connection = null;
		System.out.println("PanelDeControlDaoImpl::obtenerEtapaUnoFecha:::DATE::::::" + date);
		try {

			if (!entityManager.getTransaction().isActive())
				entityManager.getTransaction().begin();

			connection = getConnection(entityManager);

			SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
			String fecha = "";
			// // date = sdf.parse(sdf.format(date));
			fecha = (date == null) ? null : sdf.format(date);
			System.out.println("PanelDeControlDaoImpl::obtenerEtapaUnoFecha:::::::::::::" + fecha);
			ResultSet rs = null;
			String sp = "{call USRTABLERO.SP_PANEL(?,?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, opcion);
			callableStatement.setString(2, null);
			callableStatement.setString(3, null);
			callableStatement.setString(4, fecha);
			callableStatement.setInt(5, 1);
			callableStatement.setInt(6, nivel);
			callableStatement.setString(7, usuario);
			callableStatement.registerOutParameter(8, OracleTypes.CURSOR);
			callableStatement.registerOutParameter(9, OracleTypes.VARCHAR);
			callableStatement.registerOutParameter(10, OracleTypes.VARCHAR);
			callableStatement.execute();

			rs = (ResultSet) callableStatement.getObject(8);
			CatPanelView catPanelView;
			while (rs.next()) {
				System.out.println("Entra al while:::::" + rs.getInt("ID_AGRUPADOR") + "::::" + rs.getInt("ID_ETAPA"));
				catPanelView = // new CatPanelView();
						new CatPanelView(rs.getInt(opcion == 1 ? "ID_FUENTE" : "ID"), rs.getInt("ID_AGRUPADOR"),
								rs.getInt("ID_NIVEL"), rs.getInt("ID_CEDULA"), rs.getString("ESTATUS"),
								rs.getInt("ID_ETAPA"), rs.getInt("ID_FASE"), rs.getString("NOMBRE"),
								rs.getString("CLASE"));
				listCatPanelView.add(catPanelView);
			}
			callableStatement.close();
			// if(entityManager.getTransaction().isActive())
			// entityManager.getTransaction().commit();
			if (connection != null)
				connection.close();

			System.out.println("Lista despues de la extraccion:::" + listCatPanelView.size());
			return listCatPanelView;
		} catch (Exception e) {
			logger.warn("Sicrenet::PanelDeControlDaoImpl::" + "obtenerEtapaUno::" + e.getMessage());
			throw new ExcepcionSicrenet("Error en persistencia: " + e);
		}
	}


	
	public List<CatCedula> obtenerCedula(int opcion,  int id) throws ExcepcionSicrenet {
		Connection connection = null;
		CatCedula catCedula = null ;
//		opcion = 1;
		List<CatCedula> listCatCedula = new ArrayList<CatCedula>();
		try {
			System.out.println("Valor del ID Cedula Proceso::::" + id);
			if (!entityManager.getTransaction().isActive())
				entityManager.getTransaction().begin();
			connection = getConnection(entityManager);
			
			ResultSet rs = null;
			String sp = "{call USRTABLERO.SP_CONSULTA_CEDULA(?,?,?,?,?)}";
			
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, opcion);
			callableStatement.setInt(2, id);

			callableStatement.registerOutParameter(3, OracleTypes.CURSOR);
//			callableStatement.registerOutParameter(4, OracleTypes.NUMBER);
			callableStatement.registerOutParameter(4, OracleTypes.VARCHAR);
			callableStatement.registerOutParameter(5, OracleTypes.VARCHAR);
			
			callableStatement.execute();
			rs = (ResultSet) callableStatement.getObject(3);
			
			while (rs.next()) {
//				System.out.println("Entra al while:::::" + rs.getInt("ID_AGRUPADOR") + "::::" + rs.getInt("ID_ETAPA"));
				if(opcion == 1){
				catCedula = // new CatPanelView();
//						new CatCedula(rs.getBigDecimal(0),rs.getString(1),rs.getString(2),rs.getString(3),rs.getString(4),rs.getString(5),rs.getString(6),
//								rs.getString(7),rs.getString(8),rs.getString(9),rs.getString(10),rs.getString(11),rs.getShort(12),rs.getBigDecimal(13),rs.getBigDecimal(14),rs.getBigDecimal(15),
//								rs.getString(16),rs.getString(17),rs.getBlob(18).getBytes(1, (int)rs.getBlob(18).length()),rs.getBlob(19).getBytes(1, (int)rs.getBlob(19).length()));
				new CatCedula(rs.getBigDecimal(1),rs.getString(2),rs.getString(3),rs.getString(4), rs.getBigDecimal(5),rs.getString(6),rs.getString(7),
						rs.getString(8),rs.getString(9),rs.getString(10),
						rs.getString(11),rs.getString(12),rs.getString(13),rs.getString(14),rs.getString(15), rs.getShort(16),
						rs.getBigDecimal(17),rs.getBigDecimal(18),rs.getString(19),
						 rs.getString(20));
				}else if(opcion == 2){
					catCedula = new CatCedula(rs.getBigDecimal(1),
							rs.getString(2) == null || "".equals(rs.getString(2).trim()) ? "00,00:00:00" : rs.getString(2),
							rs.getString(3),rs.getString(4));
				
				}
				listCatCedula.add(catCedula);
			}
			callableStatement.close();

		if (connection != null)
			connection.close();

		System.out.println("Lista despues de la extraccion:::" +  listCatCedula.size());
		
	} catch (Exception e) {
		logger.warn("Sicrenet::PanelDeControlDaoImpl::" + "obtenerCedula::" + e.getMessage());
		e.printStackTrace();
		throw new ExcepcionSicrenet("Error en persistencia: " + e);
	}
		return listCatCedula;
	}


	public void guardarCambiosCedula(CatCedula catCedula) throws ExcepcionSicrenet {
		Connection connection = null;

		try {

			if (!entityManager.getTransaction().isActive())
				entityManager.getTransaction().begin();
			connection = getConnection(entityManager);
			
			ResultSet rs = null;
			String sp = "{call USRTABLERO.SP_CAT_CEDULA(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
			
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, 5);
			callableStatement.setInt(2, catCedula.getIdCedula().intValue());
			callableStatement.setString(3, catCedula.getTitulo());
			callableStatement.setString(4, catCedula.getNombre());
			callableStatement.setString(5, catCedula.getContenido());
			callableStatement.setString(6, catCedula.getFactor());
			callableStatement.setString(7, catCedula.getProceso());
			callableStatement.setString(8, catCedula.getDescProc());
			callableStatement.setString(9, catCedula.getFdescarga());
			callableStatement.setString(10, catCedula.getFdespredefinida());
			callableStatement.setString(11, catCedula.getRfinicio());
			callableStatement.setString(12, catCedula.getRffin());
			callableStatement.setString(13, catCedula.getHistorico());
			callableStatement.setInt(14, catCedula.getIdRespnsable().intValue());
			callableStatement.setInt(15, catCedula.getIdArea().intValue());
			callableStatement.setInt(16, catCedula.getIdSistema().intValue());
			callableStatement.setInt(17, catCedula.getEstatus());
			callableStatement.setString(18, catCedula.getUsrMod());
			callableStatement.setString(19, catCedula.getLayout());
			callableStatement.setString(20, catCedula.getArchivoMaestro());
//			callableStatement.setString(21, null);
//			callableStatement.setString(22, null);
			callableStatement.registerOutParameter(21, OracleTypes.CURSOR);
			callableStatement.registerOutParameter(22, OracleTypes.NUMBER);
			callableStatement.registerOutParameter(23, OracleTypes.VARCHAR);
			callableStatement.registerOutParameter(24, OracleTypes.VARCHAR);
					callableStatement.execute();
		callableStatement.close();

	if (connection != null)
		connection.close();

	System.out.println("Lista despues de la extraccion:::" );
	
} catch (Exception e) {
	logger.warn("Sicrenet::PanelDeControlDaoImpl::" + "obtenerCedula::" + e.getMessage());
	e.printStackTrace();
	throw new ExcepcionSicrenet("Error en persistencia: " + e);
}
	}

	public void realizarCarga() throws ExcepcionSicrenet {
		Connection connection = null;

		try {

			if (!entityManager.getTransaction().isActive())
				entityManager.getTransaction().begin();
			connection = getConnection(entityManager);

			ResultSet rs = null;
			String sp = "{call MEXICO.SP_SUBIR_ARCHIVO(?,?,?)}";

			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, 1);
			// callableStatement.setString(22, null);
			callableStatement.registerOutParameter(2, OracleTypes.VARCHAR);
			callableStatement.registerOutParameter(3, OracleTypes.VARCHAR);
			callableStatement.execute();
			callableStatement.close();

			if (connection != null)
				connection.close();

			System.out.println("Lista despues de la extraccion:::");

		} catch (Exception e) {
			logger.warn("Sicrenet::PanelDeControlDaoImpl::" + "obtenerCedula::" + e.getMessage());
			e.printStackTrace();
			throw new ExcepcionSicrenet("Error en persistencia: " + e);
		}
	}



	@Override
	public List<BitFuenteVO> obtenerDetalleReproceso(int opcion, int idFuente) throws ExcepcionSicrenet {
		Connection connection = null;
		List<BitFuenteVO> listBitFuentes = new ArrayList<BitFuenteVO>();
		try {

			if (!entityManager.getTransaction().isActive())
				entityManager.getTransaction().begin();
			connection = getConnection(entityManager);

			ResultSet rs = null;
			String sp = "{call USRTABLERO.SP_BIT_FUENTES(?,?,?,?,?,?)}";

			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, opcion);
			callableStatement.setInt(2, idFuente);
			// callableStatement.setString(22, null);
			callableStatement.registerOutParameter(3, OracleTypes.CURSOR);
			callableStatement.registerOutParameter(4, OracleTypes.NUMBER);
			callableStatement.registerOutParameter(5, OracleTypes.VARCHAR);
			callableStatement.registerOutParameter(6, OracleTypes.VARCHAR);
			callableStatement.execute();
			
			rs = (ResultSet) callableStatement.getObject(3);
			BitFuenteVO bitFuenteVO;
			
			while (rs.next()) {

				bitFuenteVO = new BitFuenteVO(rs.getBigDecimal(1),rs.getString(2), rs.getString(3), 
						rs.getString(4),
						rs.getString(5),
						rs.getString(6),
						rs.getBigDecimal(7),
						rs.getBigDecimal(8),
						rs.getBigDecimal(9),
						rs.getString(10));
				listBitFuentes.add(bitFuenteVO);
				
			}
			callableStatement.close();

			if (connection != null)
				connection.close();

			System.out.println("Lista despues de la extraccion:::");
			return listBitFuentes;
		} catch (Exception e) {
			logger.warn("Sicrenet::PanelDeControlDaoImpl::" + "obtenerCedula::" + e.getMessage());
			e.printStackTrace();
			throw new ExcepcionSicrenet("Error en persistencia: " + e);
		}
	}
}
