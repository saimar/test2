package com.baz.dao.util;

import java.sql.Connection;

import javax.persistence.EntityManager;

public class Conexion {
	
public static Connection getConnection(EntityManager entityManager ){

	Connection connection = entityManager.unwrap(java.sql.Connection.class);
	return connection;
}

}
