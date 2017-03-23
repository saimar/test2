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
import com.baz.commons.vo.ReporteVO;
import com.baz.dao.MantenimientoCatalogoReporteDao;

import oracle.jdbc.OracleTypes;
@Named("mantenimientoCatalogoReporteDaoImpl")
public class MantenimientoCatalogoReporteDaoImpl implements MantenimientoCatalogoReporteDao, Serializable{
	
	
	/**
	 * 
	 */
	
	
	private static final long serialVersionUID = 1L;
	
	
	@PersistenceContext(unitName = "panelGlobal", type = PersistenceContextType.EXTENDED)
    private EntityManager entityManager;
    private final Logger logger 
	    = LoggerFactory.getLogger(MantenimientoCatalogoReporteDaoImpl.class);
 
    
    public List<ReporteVO> cargarCatalogoReporte(int opcion, int idReporte) throws ExcepcionSicrenet{
    	try {
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);

			ResultSet rs = null;
			String sp = "{call USRTABLERO.SP_CAT_REPORTE(?,?,?,?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, opcion);
			callableStatement.setInt(2, idReporte);
			callableStatement.setString(3, null);
			callableStatement.setString(4, null);
			callableStatement.setInt(5, 0);
			callableStatement.setString(6, null);
			callableStatement.setInt(7, 0);
			callableStatement.setString(8, null);
			callableStatement.registerOutParameter(9, OracleTypes.CURSOR);
			callableStatement.registerOutParameter(10,OracleTypes.NUMBER );
			callableStatement.registerOutParameter(11,OracleTypes.VARCHAR );
			callableStatement.registerOutParameter(12,OracleTypes.VARCHAR );
			System.out.println("ejecutando consulta");
			callableStatement.execute();
			rs = (ResultSet) callableStatement.getObject(9);

			List<ReporteVO> listReporteVO = new ArrayList<ReporteVO>(); 
			while (rs.next()) {
				System.out.println("Entra al while:::::");
				ReporteVO ReporteVO = new ReporteVO( 
						rs.getBigDecimal(1),
						rs.getString(2),
						rs.getString(3),
						rs.getBigDecimal(4),
						rs.getString(5),
						rs.getString(6),
						rs.getString(7),
						rs.getInt(8)
						);
				listReporteVO.add(ReporteVO);
				
				System.out.println("obtenerID_FUENTE:ID_FUENTE:::"+rs.getBigDecimal(1));
			}
			
			
			entityManager.getTransaction().commit();
			return listReporteVO;
		}  catch (Exception e) {
			logger.warn("Sicrenet::MantenimientoCatalogoReporteDaoImpl::" 
	                + "cargarCatalogoReporte::" + e.getMessage());
			  throw new ExcepcionSicrenet("ERROR!. Base de Datos");
		}

	
    }
	
    
    
    public void guardarCatalogoReporte(int opcion, int idReporte, String nombre, String descripcion, int idExtraccion, String store, int estatus, String usuario) throws ExcepcionSicrenet{
		try {
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);

			String sp = "{call USRTABLERO.SP_CAT_REPORTE(?,?,?,?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, opcion);
			callableStatement.setInt(2, idReporte);
			callableStatement.setString(3, nombre);
			callableStatement.setString(4, descripcion);
			callableStatement.setInt(5, idExtraccion);
			callableStatement.setString(6, store);
			callableStatement.setInt(7, estatus);
			callableStatement.setString(8, usuario);
			callableStatement.registerOutParameter(9, OracleTypes.CURSOR);
			callableStatement.registerOutParameter(10,OracleTypes.NUMBER );
			callableStatement.registerOutParameter(11,OracleTypes.VARCHAR );
			callableStatement.registerOutParameter(12,OracleTypes.VARCHAR );

		callableStatement.execute();
				
		 System.out.println("Agregado CORRECTAMENTE!!!");
		

		entityManager.getTransaction().commit();
	} catch (Exception e) {
		logger.warn("Sicrenet::MantenimientoCatalogoReporteDaoImpl::" 
                + "guardarCatalogoReporte::" + e.getMessage());
		  throw new ExcepcionSicrenet("ERROR!. Base de Datos");
	}

	}


	
    public ReporteVO cargarCatalogoReporteValidateExiste(int opcion, int idReporte, String nombre, String descripcion) throws ExcepcionSicrenet{
		try { ReporteVO ReporteVO = null;
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);

			ResultSet rs = null;
			String sp = "{call USRTABLERO.SP_CAT_REPORTE(?,?,?,?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, opcion);
			callableStatement.setInt(2, idReporte);
			callableStatement.setString(3, nombre);
			callableStatement.setString(4, descripcion);
			callableStatement.setInt(5, 0);
			callableStatement.setString(6, null);
			callableStatement.setInt(7, 0);
			callableStatement.setString(8, null);
			callableStatement.registerOutParameter(9, OracleTypes.CURSOR);
			callableStatement.registerOutParameter(10,OracleTypes.NUMBER );
			callableStatement.registerOutParameter(11,OracleTypes.VARCHAR );
			callableStatement.registerOutParameter(12,OracleTypes.VARCHAR );
			System.out.println("ejecutando consulta");
			callableStatement.execute();
			rs = (ResultSet) callableStatement.getObject(9);

			
			while (rs.next()) {
				System.out.println("Entra al while:::::");
				ReporteVO = new ReporteVO( 
						rs.getInt(1)
						);
				
				System.out.println("obtenerESTATUS:ESTATUS::"+rs.getInt(1));
			}
			
			
			entityManager.getTransaction().commit();
			return ReporteVO;
		}  catch (Exception e) {
			logger.warn("Sicrenet::MantenimientoCatalogoReporteDaoImpl::" 
	                + "cargarCatalogoReporteValidateExiste::" + e.getMessage());
			  throw new ExcepcionSicrenet("ERROR!. Base de Datos");
		}

	}



	

}
