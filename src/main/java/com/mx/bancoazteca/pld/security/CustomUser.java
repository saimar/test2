package com.mx.bancoazteca.pld.security;


import java.io.IOException;
import java.io.Serializable;
import java.util.Collection;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mx.bancoazteca.pld.table.manager.TableContainer;

 
public class CustomUser extends User implements Serializable  {
	/**
	 * 
	 */
	
	private static final Logger LOG = LoggerFactory.getLogger(CustomUser.class);
	
	private static final long serialVersionUID = 1L;
	private String noEmpleado;
	private String masterKey;
	private String fullName;
	private String company;
	private String mail;
	private String assignedIP;
	private CustomCredentials credential;
	private TableContainer container;
	private String idPais;
	public int idModuloActual;
	
	
	
	public CustomUser (String username, String password, Collection<? extends GrantedAuthority> authorities) {			
		this(username, password, true, true, true, true, authorities);
	}
	
	public CustomUser(String username, String password, boolean enabled,
			boolean accountNonExpired, boolean credentialsNonExpired,
			boolean accountNonLocked,
			Collection<? extends GrantedAuthority> authorities) {
		super(username, password, enabled, accountNonExpired, credentialsNonExpired,
				accountNonLocked, authorities);		
	}

	public String getNoEmpleado() {
		return noEmpleado;
	}

	public void setNoEmpleado(String noEmpleado) {
		this.noEmpleado = noEmpleado;
	}

	public String getMasterKey() {
		return masterKey;
	}

	public void setMasterKey(String masterKey) {
		this.masterKey = masterKey;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public String getAssignedIP() {
		return assignedIP;
	}

	public void setAssignedIP(String assignedIP) {
		this.assignedIP = assignedIP;
	}

	public CustomCredentials getCredential() {
		return credential;
	}

	public void setCredential(CustomCredentials credential) {
		this.credential = credential;
	}
	
	//public TableContainer getMyContainer() {
	public TableContainer getContainer() {
		/*if(container==null){
			this.container=new TableContainer("168833");
			}*/
		return container;
	}
	public void setContainer(TableContainer container) {
		/*if(container==null){
			this.container=new TableContainer("168833");
			}*/
		this.container=container;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result
				+ ((masterKey == null) ? 0 : masterKey.hashCode());
		return result;
	}
    /* Code Correctness: Class Does Not Implement equals (1 issue) Line 131
     * 
     * El metodo User.equals pertenece a una clase de spring, por lo cual no se puede modificar  
     * el metodo equals de dicha clase.
     * 
     * Se investigo y se verifico que el metodo equals de esta clase no es ocupado en el proyecto
     * */
	@Override
	public boolean equals(Object obj) {
		 if (obj == null){
				return false;
		 }
		if (this == obj){
			return true;
		}
		/*if (!super.equals(obj)){//SE COMENTA ESTA SECCION DE CODIGO PARA VER COMPORTAMIENTO Y VALIDACION FORTIFY
			return false;
			}*/
		if (getClass() != obj.getClass()){
			return false;
		}
		CustomUser other = (CustomUser) obj;
		if (masterKey == null) {
			if (other.masterKey != null)
				return false;
		} else if (!masterKey.equals(other.masterKey))
			return false;
		return true;
	}


	@Override
	public void eraseCredentials() {
		this.credential.eraseCredentials();
		
		this.assignedIP = "";
		this.company = "";		
		this.fullName = "";
		this.mail = "";
		this.masterKey = "";
	}

	@Override
	public String toString() {
		
		String data="";
		
		try {

			///ObjectMapper mapper = new ObjectMapper().writeValueAsString(arg0);
			//data = mapper.writeValueAsString(this.getCredential().getTreeModule());
			data = (new ObjectMapper()).writeValueAsString(this.getCredential().getTreeModule());

//			ObjectMapper mapper = new ObjectMapper();
//			if(mapper!=null)
//				data = mapper.writeValueAsString(this.getCredential().getTreeModule());
			

		} catch (JsonGenerationException e) {
			//e.printStackTrace();
			// TODO Auto-generated catch block
			LOG.info(" @EXCEPTION :: "+this.getClass()+" :: Cause => {}", (e.getCause()==null)?"Error desconocido":e.getCause());
		} catch (JsonMappingException e) {
			//e.printStackTrace();
			// TODO Auto-generated catch block
			LOG.info(" @EXCEPTION :: "+this.getClass()+" :: Cause => {}", (e.getCause()==null)?"Error desconocido":e.getCause());
		} catch (IOException e) {
			//e.printStackTrace();
			// TODO Auto-generated catch block
			LOG.info(" @EXCEPTION :: "+this.getClass()+" :: Cause => {}", (e.getCause()==null)?"Error desconocido":e.getCause());
		}
		
		return  data;
		
		
		/*return "PLDUser [masterKey=" + masterKey + ", fullName=" + fullName
				+ ", company=" + company + ", mail=" + mail + ", assignedIP="
				+ assignedIP + ", credential=" + credential + "]";*/
	}
	
	public String getIdPais() {
		return idPais;
	}

	public void setIdPais(String idPais) {
		this.idPais = idPais;
	}

	public int getIdModuloActual() {
		return idModuloActual;
	}

	public void setIdModuloActual(int idModuloActual) {
		this.idModuloActual = idModuloActual;
	}

}