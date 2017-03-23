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
import com.baz.commons.vo.ProcesoVO;
import com.baz.dao.MantenimientoCatalogoProcesoDao;

import oracle.jdbc.OracleTypes;
@Named("mantenimientoCatalogoProcesoDaoImpl")
public class MantenimientoCatalogoProcesoDaoImpl implements MantenimientoCatalogoProcesoDao, Serializable{
	
	
	/**
	 * 
	 */
	
	
	private static final long serialVersionUID = 1L;
	
	
	@PersistenceContext(unitName = "panelGlobal", type = PersistenceContextType.EXTENDED)
    private EntityManager entityManager;
    private final Logger logger 
	    = LoggerFactory.getLogger(MantenimientoCatalogoFaseDaoImpl.class);
    
    
    
	
	public List<ProcesoVO> cargarCatalogoProceso(int opcion, int idProceso) throws ExcepcionSicrenet {
		try {
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);

			ResultSet rs = null;
			String sp = "{call USRTABLERO.SP_CAT_PROCESO(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, opcion);
			callableStatement.setInt(2, idProceso);
			callableStatement.setInt(3, 0);
			callableStatement.setInt(4, 0);
			callableStatement.setInt(5, 0);
			callableStatement.setInt(6, 0);
			callableStatement.setInt(7, 0);
			callableStatement.setInt(8, 0);
			callableStatement.setInt(9, 0);
			callableStatement.setInt(10, 0);
			callableStatement.setInt(11, 0);
			callableStatement.setString(12, null);
			callableStatement.setString(13, null);
			callableStatement.setString(14, null);
			callableStatement.setString(15, null);
			callableStatement.setFloat(16, 0.0f);
			callableStatement.registerOutParameter(17, OracleTypes.CURSOR);
			callableStatement.registerOutParameter(18,OracleTypes.NUMBER );
			callableStatement.registerOutParameter(19,OracleTypes.VARCHAR );
			callableStatement.registerOutParameter(20,OracleTypes.VARCHAR );
			System.out.println("ejecutando consulta");
			callableStatement.execute();
			rs = (ResultSet) callableStatement.getObject(17);

			List<ProcesoVO> listProcesoVO = new ArrayList<ProcesoVO>(); 
			while (rs.next()) {
				System.out.println("Entra al while:::::");
				ProcesoVO ProcesoVO = new ProcesoVO( 
						rs.getBigDecimal(1),
						rs.getBigDecimal(2),
						rs.getBigDecimal(3),
						rs.getBigDecimal(4),
						rs.getBigDecimal(5),
						rs.getString(6),
						rs.getFloat(7),
						rs.getString(8),
						rs.getString(9)
						);
				listProcesoVO.add(ProcesoVO);
				
				System.out.println("obtenerID_FUENTE:ID_FUENTE:::"+rs.getBigDecimal(1));
			}
			
			
			entityManager.getTransaction().commit();
			return listProcesoVO;
		}  catch (Exception e) {
			logger.warn("Sicrenet::MantenimientoCatalogoProcesoDaoImpl::" 
	                + "cargarCatalogoProceso::" + e.getMessage());
			  throw new ExcepcionSicrenet("ERROR!. Base de Datos");
		}

	}





	public ProcesoVO guardarCatalogoProceso(int opcion, int idProceso, int idNivel, int idCedula, String store, int estatus, String usuario) throws ExcepcionSicrenet {
		try {
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);

			String sp = "{call USRTABLERO.SP_CAT_PROCESO(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, opcion);
			callableStatement.setInt(2, idProceso);
			callableStatement.setInt(3, 0);
			callableStatement.setInt(4, 0);
			callableStatement.setInt(5, idNivel);
			callableStatement.setInt(6, idCedula);
			callableStatement.setInt(7, 0);
			callableStatement.setInt(8, 0);
			callableStatement.setInt(9, 0);
			callableStatement.setInt(10, 0);
			callableStatement.setInt(11, estatus);
			callableStatement.setString(12, usuario);
			callableStatement.setString(13, store);
			callableStatement.setString(14, null);
			callableStatement.setString(15, null);
			callableStatement.setFloat(16, 0.0f);
			callableStatement.registerOutParameter(17, OracleTypes.CURSOR);
			callableStatement.registerOutParameter(18,OracleTypes.NUMBER );
			callableStatement.registerOutParameter(19,OracleTypes.VARCHAR );
			callableStatement.registerOutParameter(20,OracleTypes.VARCHAR );

		callableStatement.execute();
		System.out.println("MantenimientoCatalogoProcesoDaoImpl::guardarCatalogoProceso:::idNivel:::" + idNivel);
		 System.out.println("MantenimientoCatalogoProcesoDaoImpl::guardarCatalogoProceso:::idCedula:::" +  idCedula);
		 System.out.println("MantenimientoCatalogoProcesoDaoImpl::guardarCatalogoProceso:::store:::" + store);
		 System.out.println("MantenimientoCatalogoProcesoDaoImpl::guardarCatalogoProceso:::usuarioDao:::" + usuario);
				
		 System.out.println("Agregado CORRECTAMENTE!!!");
		

		entityManager.getTransaction().commit();
	} catch (Exception e) {
		logger.warn("Sicrenet::MantenimientoCatalogoProcesoDaoImpl::" 
                + "guardarCatalogoProceso::" + e.getMessage());
		  throw new ExcepcionSicrenet("ERROR!. Base de Datos");
	}

	return null;
	}


	
	public ProcesoVO cargarCatalogoProcesoValidateExiste(int opcion, int idProceso, int idCedula) throws ExcepcionSicrenet {
		try { ProcesoVO ProcesoVO = null;
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);

			ResultSet rs = null;
			String sp = "{call USRTABLERO.SP_CAT_PROCESO(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, opcion);
			callableStatement.setInt(2, idProceso);
			callableStatement.setInt(3, 0);
			callableStatement.setInt(4, 0);
			callableStatement.setInt(5, 0);
			callableStatement.setInt(6, idCedula);
			callableStatement.setInt(7, 0);
			callableStatement.setInt(8, 0);
			callableStatement.setInt(9, 0);
			callableStatement.setInt(10, 0);
			callableStatement.setInt(11, 0);
			callableStatement.setString(12, null);
			callableStatement.setString(13, null);
			callableStatement.setString(14, null);
			callableStatement.setString(15, null);
			callableStatement.setFloat(16, 0.0f);
			callableStatement.registerOutParameter(17, OracleTypes.CURSOR);
			callableStatement.registerOutParameter(18,OracleTypes.NUMBER );
			callableStatement.registerOutParameter(19,OracleTypes.VARCHAR );
			callableStatement.registerOutParameter(20,OracleTypes.VARCHAR );
			System.out.println("ejecutando consulta");
			callableStatement.execute();
			rs = (ResultSet) callableStatement.getObject(17);

			
			while (rs.next()) {
				System.out.println("Entra al while:::::");
				ProcesoVO = new ProcesoVO( 
						rs.getInt(1)
						);
				
				System.out.println("obtenerESTATUS:ESTATUS::"+rs.getInt(1));
			}
			
			
			entityManager.getTransaction().commit();
			return ProcesoVO;
		}  catch (Exception e) {
			logger.warn("Sicrenet::MantenimientoCatalogoProcesoDaoImpl::" 
	                + "cargarCatalogoProcesoValidateExiste::" + e.getMessage());
			  throw new ExcepcionSicrenet("ERROR!. Base de Datos");
		}

	}



	

}
