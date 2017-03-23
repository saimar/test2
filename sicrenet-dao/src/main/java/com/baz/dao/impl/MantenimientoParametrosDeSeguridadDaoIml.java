package com.baz.dao.impl;

import static com.baz.dao.util.Conexion.getConnection;

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;
import javax.persistence.Query;

import com.baz.commons.domain.CatMenu;
import com.baz.commons.domain.CatPanelView;
import com.baz.commons.domain.CatParametrosDeSeguridad;
import com.baz.commons.domain.CatRol;
import com.baz.dao.MantenimientoParametrosDeSeguridadDao;
import com.baz.dao.MantenimientoPerfilesDao;
import oracle.jdbc.OracleTypes;

@Named("mantenimientoParametrosDeSeguridadDaoImpl")
public class MantenimientoParametrosDeSeguridadDaoIml implements MantenimientoParametrosDeSeguridadDao, Serializable{

	private static final long serialVersionUID = 1L;
	@SuppressWarnings("null")

	@PersistenceContext(unitName = "seguridad", type = PersistenceContextType.EXTENDED)
    private EntityManager entityManager;

	public List<CatParametrosDeSeguridad> getParametrosDeSeguridad() {
		// TODO Auto-generated method stub
		try{
			
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);
			System.out.println("Llego hasta la consulta");
			ResultSet rs = null;
			String sp = "{call SEGURIDAD.SP_MANTO_PARAMETROS(?,?,?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, 1);
			callableStatement.setInt(2, 1);
			callableStatement.setInt(3, 1);
			callableStatement.setInt(4, 1);
			callableStatement.setInt(5, 1);
			callableStatement.setInt(6, 1);
			callableStatement.setInt(7, 1);
			callableStatement.setInt(8, 1);
			callableStatement.registerOutParameter(9,OracleTypes.CURSOR );
			callableStatement.registerOutParameter(10,OracleTypes.VARCHAR );
			callableStatement.registerOutParameter(11,OracleTypes.VARCHAR );
			callableStatement.execute();
			rs = (ResultSet) callableStatement.getObject(9);
			List<CatParametrosDeSeguridad> listaCatParametrosDeSeguridad= new ArrayList<CatParametrosDeSeguridad>(); 
			while (rs.next()) {
				System.out.println("Entra al while:::::");
				CatParametrosDeSeguridad catParametrosDeSeguridad = 
					/*new CatParametrosDeSeguridad(1, rs.getInt("MAXLONGPASS"),rs.getInt("MINLONGPASS"),
							rs.getInt("DIASVENPASS"),rs.getInt("MAXUSRINTFALLIDOS"),rs.getInt("MAXIPINTFALLIDOS"),rs.getInt("IPDIASBLOQUEO"),rs.getInt("TIMEOUT"));*/
				new CatParametrosDeSeguridad(1, rs.getInt(1),rs.getInt(2),
						rs.getInt(3),rs.getInt(4),rs.getInt(5),rs.getInt(6),rs.getInt(7));
				System.out.println("obtenerParametros::idParametros:::"+rs.getInt(1));
				listaCatParametrosDeSeguridad.add(catParametrosDeSeguridad);
			}
			entityManager.getTransaction().commit();
			return listaCatParametrosDeSeguridad;			
			
		} catch (SQLException e) {
			
			e.printStackTrace();
		}
		return null;
	}

	public void editarParametrosDeSeguridad(BigDecimal idparametros, BigDecimal maxlongpass, BigDecimal minlongpass,
			BigDecimal diasvenpass, BigDecimal maxusrintfallidos, BigDecimal maxipintfallidos, BigDecimal ipdiasbloqueo,
			BigDecimal timeout) {
		System.out.println("Llego hasta la edicion de parametro");
		
		try{
			
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);
			System.out.println("Llegó hasta la edicion.................!!!!!!!");
			String sp = "{call SEGURIDAD.SP_MANTO_PARAMETROS(?,?,?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, 2);
			callableStatement.setInt(2, maxlongpass.intValue());
			callableStatement.setInt(3, minlongpass.intValue());
			callableStatement.setInt(4, diasvenpass.intValue());
			callableStatement.setInt(5, maxusrintfallidos.intValue());
			callableStatement.setInt(6, maxipintfallidos.intValue());
			callableStatement.setInt(7, ipdiasbloqueo.intValue());
			callableStatement.setInt(8, timeout.intValue());
			callableStatement.registerOutParameter(9,OracleTypes.CURSOR );
			callableStatement.registerOutParameter(10,OracleTypes.VARCHAR );
			callableStatement.registerOutParameter(11,OracleTypes.VARCHAR );
			callableStatement.execute();

			entityManager.getTransaction().commit();

		} catch (SQLException e) {
			
			e.printStackTrace();
		}
		// TODO Auto-generated method stub
		
	}
	
	
}
