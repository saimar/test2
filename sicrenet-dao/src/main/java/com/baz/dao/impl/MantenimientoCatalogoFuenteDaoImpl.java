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
import com.baz.commons.vo.FuenteVO;
import com.baz.dao.MantenimientoCatalogoFuenteDao;

import oracle.jdbc.OracleTypes;
@Named("mantenimientoCatalogoFuenteDaoImpl")
public class MantenimientoCatalogoFuenteDaoImpl implements MantenimientoCatalogoFuenteDao, Serializable{
	
	
	/**
	 * 
	 */
	
	
	private static final long serialVersionUID = 1L;
	
	
	@PersistenceContext(unitName = "panelGlobal", type = PersistenceContextType.EXTENDED)
    private EntityManager entityManager;
    private final Logger logger 
	    = LoggerFactory.getLogger(MantenimientoCatalogoFuenteDaoImpl.class);
    
    
    
	
	public List<FuenteVO> cargarCatalogoFuente(int opcion, int idFuente) throws ExcepcionSicrenet {
		try {
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);

			ResultSet rs = null;
			String sp = "{call USRTABLERO.SP_CAT_FUENTE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, opcion);
			callableStatement.setInt(2, idFuente);
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

			List<FuenteVO> listFuenteVO = new ArrayList<FuenteVO>(); 
			while (rs.next()) {
				System.out.println("Entra al while:::::");
				FuenteVO fuenteVO = new FuenteVO( 
						rs.getBigDecimal("ID_FUENTE"),
						rs.getString("NOMBRE"),
						rs.getBigDecimal("ID_NIVEL"),
						rs.getString("NIVEL"),
						rs.getBigDecimal("ID_CEDULA"),
						rs.getBigDecimal("ID_FACE"),
						rs.getBigDecimal("ID_ETAPA"),
						rs.getString("ETAPA"),
						rs.getString("STORE"),
						rs.getFloat("ORDEN"),
						rs.getString("TITULO"),
						rs.getInt("ESTATUS"),
						rs.getString("DESESTATUS")
						);
				listFuenteVO.add(fuenteVO);
				
				System.out.println("obtenerID_FUENTE:ID_FUENTE:::"+rs.getInt("ID_FUENTE"));
			}
			
			
			entityManager.getTransaction().commit();
			return listFuenteVO;
		}  catch (Exception e) {
			logger.warn("Sicrenet::MantenimientoCatalogoFuenteDaoImpl::" 
	                + "CargaCatalogoFuente::" + e.getMessage());
			  throw new ExcepcionSicrenet("ERROR!. Base de Datos");
		}

	}





	public FuenteVO guardarCatalogoFuente(int opcion, int idFuente, int idNivel, int idCedula, String store, int estatus, String usuario) throws ExcepcionSicrenet {
		try {
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);

			String sp = "{call USRTABLERO.SP_CAT_FUENTE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, opcion);
			callableStatement.setInt(2, idFuente);
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
		System.out.println("MantenimientoCatalogoFuenteDaoImpl::guardarCatalogoFuente:::idNivel:::" + idNivel);
		 System.out.println("MantenimientoCatalogoFuenteDaoImpl::guardarCatalogoFuente:::idCedula:::" +  idCedula);
		 System.out.println("MantenimientoCatalogoFuenteDaoImpl::guardarCatalogoFuente:::store:::" + store);
		 System.out.println("MantenimientoCatalogoFuenteDaoImpl::guardarCatalogoFuente:::usuarioDao:::" + usuario);
				
		 System.out.println("Agregado CORRECTAMENTE!!!");
		

		entityManager.getTransaction().commit();
	} catch (Exception e) {
		logger.warn("Sicrenet::MantenimientoCatologoFuenteDaoImpl::" 
                + "guardarCatalogoFuente::" + e.getMessage());
		  throw new ExcepcionSicrenet("ERROR!. Base de Datos");
	}

	return null;
	}


	
	public FuenteVO cargarCatalogoFuenteValidateExiste(int opcion, int idCedula) throws ExcepcionSicrenet {
		try { FuenteVO fuenteVO = null;
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);

			ResultSet rs = null;
			String sp = "{call USRTABLERO.SP_CAT_FUENTE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, opcion);
			callableStatement.setInt(2, 0);
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
				fuenteVO = new FuenteVO( 
						rs.getInt("ESTATUS")
						);
				
				System.out.println("obtenerESTATUS:ESTATUS::"+rs.getInt("ESTATUS"));
			}
			
			
			entityManager.getTransaction().commit();
			return fuenteVO;
		}  catch (Exception e) {
			logger.warn("Sicrenet::MantenimientoCatalogoFuenteDaoImpl::" 
	                + "cargarCatalogoFuenteValidateExiste::" + e.getMessage());
			  throw new ExcepcionSicrenet("ERROR!. Base de Datos");
		}

	}



	

}
