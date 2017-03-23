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

import com.baz.commons.domain.CatMonitor;
import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.dao.MantenimientoMonitorUsuariosDao;

import oracle.jdbc.OracleTypes;


@Named("mantenimientoMonitorUsuariosDaoImpl")
public class MantenimientoMonitorUsuariosDaoImpl implements MantenimientoMonitorUsuariosDao, Serializable {

	private static final long serialVersionUID = 1L;
	 private final Logger logger 
	    = LoggerFactory.getLogger(MantenimientoMonitorUsuariosDaoImpl.class);

	@PersistenceContext(unitName = "seguridad", type = PersistenceContextType.EXTENDED)
	private EntityManager entityManager;




public List<CatMonitor> cargaMonitorUsuarios() throws ExcepcionSicrenet {
	try {
		entityManager.getTransaction().begin();
		Connection connection = getConnection(entityManager);

		ResultSet rs = null;
		String sp = "{call SEGURIDAD.SP_MANTO_MONITOR(?,?,?,?,?,?,?)}";
		CallableStatement callableStatement = connection.prepareCall(sp);
		callableStatement.setInt(1, 1);
		callableStatement.setInt(2, 0);
		callableStatement.setString(3, null);
		callableStatement.setInt(4, 1);
		callableStatement.registerOutParameter(5,OracleTypes.CURSOR);
		callableStatement.registerOutParameter(6,OracleTypes.VARCHAR );
		callableStatement.registerOutParameter(7,OracleTypes.VARCHAR );

		callableStatement.execute();
		rs = (ResultSet) callableStatement.getObject(5);
		// List<CatPanelView> listCatPanelView = new
		// ArrayList<CatPanelView>();

		List<CatMonitor> listCatMonitor = new ArrayList<CatMonitor>(); 
		while (rs.next()) {
			System.out.println("Entra al while:::::");
			CatMonitor CatMonitor = new CatMonitor( 
					rs.getString(1),
					rs.getString(2),
					rs.getString(3),
					rs.getString(4),
					rs.getString(5),
					rs.getString(6),
					rs.getString(7));
			listCatMonitor.add(CatMonitor);
			
			System.out.println("obtenerID_BIT:id_Bit:::"+rs.getString(2));
		}
		
		
		entityManager.getTransaction().commit();
		return listCatMonitor;
	}  catch (Exception e) {
		logger.warn("Sicrenet::MantenimientoMonitorUsuariosDaoImpl::" 
                + "CargaMonitor::" + e.getMessage());
        throw new ExcepcionSicrenet("Error en persistencia: " + e);
	}

	
}


}

