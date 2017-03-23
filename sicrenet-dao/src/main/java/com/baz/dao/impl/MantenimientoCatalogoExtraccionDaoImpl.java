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
import com.baz.commons.vo.ExtraccionVO;
import com.baz.dao.MantenimientoCatalogoExtraccionDao;

import oracle.jdbc.OracleTypes;
@Named("mantenimientoCatalogoExtraccionDaoImpl")
public class MantenimientoCatalogoExtraccionDaoImpl implements MantenimientoCatalogoExtraccionDao, Serializable{
	
	
	/**
	 * 
	 */
	
	
	private static final long serialVersionUID = 1L;
	
	
	@PersistenceContext(unitName = "panelGlobal", type = PersistenceContextType.EXTENDED)
    private EntityManager entityManager;
    private final Logger logger 
	    = LoggerFactory.getLogger(MantenimientoCatalogoExtraccionDaoImpl.class);
 
	public void guardarCatalogoExtraccion(int opcion, int idExtraccion, int idNivel, int idCedula, String store, int estatus, String usuario) throws ExcepcionSicrenet {
		try {
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);

			String sp = "{call USRTABLERO.SP_CAT_FUENTE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, opcion);
			callableStatement.setInt(2, idExtraccion);
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
		System.out.println("MantenimientoCatalogoExtraccionDaoImpl::guardarCatalogoExtraccion:::idNivel:::" + idNivel);
		 System.out.println("MantenimientoCatalogoExtraccionDaoImpl::guardarCatalogoExtraccion:::idCedula:::" +  idCedula);
		 System.out.println("MantenimientoCatalogoExtraccionDaoImpl::guardarCatalogoExtraccion:::store:::" + store);
		 System.out.println("MantenimientoCatalogoExtraccionDaoImpl::guardarCatalogoExtraccion:::usuarioDao:::" + usuario);
				
		 System.out.println("Agregado CORRECTAMENTE!!!");
		

		entityManager.getTransaction().commit();
	} catch (Exception e) {
		logger.warn("Sicrenet::MantenimientoCatalogoExtraccionDaoImpl::" 
                + "guardarCatalogoExtraccion::" + e.getMessage());
		  throw new ExcepcionSicrenet("ERROR!. Base de Datos");
	}

	}


	
	public ExtraccionVO cargarCatalogoExtraccionValidateExiste(int opcion, int idCedula) throws ExcepcionSicrenet {
		try { ExtraccionVO ExtraccionVO = null;
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
				ExtraccionVO = new ExtraccionVO( 
						rs.getInt(1)
						);
				
				System.out.println("obtenerESTATUS:ESTATUS::"+rs.getInt(1));
			}
			
			
			entityManager.getTransaction().commit();
			return ExtraccionVO;
		}  catch (Exception e) {
			logger.warn("Sicrenet::MantenimientoCatalogoExtraccionDaoImpl::" 
	                + "cargarCatalogoExtraccionValidateExiste::" + e.getMessage());
			  throw new ExcepcionSicrenet("ERROR!. Base de Datos");
		}

	}



	

}
