package com.baz.commons.vo;

import java.io.Serializable;
import java.math.BigDecimal;

public class UsuariosVO implements Serializable {

	
	
	 private static final long serialVersionUID = 1L;
	   
	  
	    private BigDecimal idusuario;
	  
	    private String nombre;

	    private String apaterno;

	    private String amaterno;

	    private String numempleado;

	    private String direccion;

	    private String gerencia;

	    private String centrocostos;

	    private String correo;

	    private Long bloqueo;

	    private Long sesionactiva;


	    private String falta;

	    private String ualta;

	    private String fmodifica;

	    private String umodifica;
	    
	    private Long estatus;
	    
	    private BigDecimal idPais;

	    private BigDecimal idrol;

	    private BigDecimal idPass;
	    
	    private String desEstatus;
	    
	    private String desBloqueo;
	    
	    private int status;

	    public UsuariosVO() {
	    }
	    
	    public UsuariosVO( long estatus) {
	    	this.estatus = estatus;
	    }
	   
	    public UsuariosVO(String numempleado, String centroCostos, String nombre, String direccion,
	    		long bloqueo, BigDecimal idRol, String aPaterno, String aMaterno, String gerencia, String correo,
	    		int estatus, String desEstatus, String desBloqueo, BigDecimal idPais) {
	     this.numempleado = numempleado;
	     this.centrocostos = centroCostos;
	     this.nombre = nombre;
	     this.direccion = direccion;
	     this.bloqueo = bloqueo;
	     this.idrol = idRol;
	     this.apaterno = aPaterno;
	     this.amaterno = aMaterno;
	     this.gerencia = gerencia;
	     this.correo = correo;
	     this.status = estatus;
	     this.desEstatus = desEstatus;
	     this.desBloqueo = desBloqueo;
	     this.idPais = idPais;
	     
	    }


		public BigDecimal getIdusuario() {
			return idusuario;
		}


		public void setIdusuario(BigDecimal idusuario) {
			this.idusuario = idusuario;
		}


		public String getNombre() {
			return nombre;
		}


		public void setNombre(String nombre) {
			this.nombre = nombre;
		}


		public String getApaterno() {
			return apaterno;
		}


		public void setApaterno(String apaterno) {
			this.apaterno = apaterno;
		}


		public String getAmaterno() {
			return amaterno;
		}


		public void setAmaterno(String amaterno) {
			this.amaterno = amaterno;
		}


		public String getNumempleado() {
			return numempleado;
		}


		public void setNumempleado(String numempleado) {
			this.numempleado = numempleado;
		}


		public String getDireccion() {
			return direccion;
		}


		public void setDireccion(String direccion) {
			this.direccion = direccion;
		}


		public String getGerencia() {
			return gerencia;
		}


		public void setGerencia(String gerencia) {
			this.gerencia = gerencia;
		}


		public String getCentrocostos() {
			return centrocostos;
		}


		public void setCentrocostos(String centrocostos) {
			this.centrocostos = centrocostos;
		}


		public String getCorreo() {
			return correo;
		}


		public void setCorreo(String correo) {
			this.correo = correo;
		}


		public Long getBloqueo() {
			return bloqueo;
		}


		public void setBloqueo(Long bloqueo) {
			this.bloqueo = bloqueo;
		}


		public Long getSesionactiva() {
			return sesionactiva;
		}


		public void setSesionactiva(Long sesionactiva) {
			this.sesionactiva = sesionactiva;
		}


		public String getFalta() {
			return falta;
		}


		public void setFalta(String falta) {
			this.falta = falta;
		}


		public String getUalta() {
			return ualta;
		}


		public void setUalta(String ualta) {
			this.ualta = ualta;
		}


		public String getFmodifica() {
			return fmodifica;
		}


		public void setFmodifica(String fmodifica) {
			this.fmodifica = fmodifica;
		}


		public String getUmodifica() {
			return umodifica;
		}


		public void setUmodifica(String umodifica) {
			this.umodifica = umodifica;
		}


		public Long getEstatus() {
			return estatus;
		}


		public void setEstatus(Long estatus) {
			this.estatus = estatus;
		}


		public BigDecimal getIdPais() {
			return idPais;
		}


		public void setIdPais(BigDecimal idPais) {
			this.idPais = idPais;
		}


		public BigDecimal getIdrol() {
			return idrol;
		}


		public void setIdrol(BigDecimal idrol) {
			this.idrol = idrol;
		}


		public BigDecimal getIdPass() {
			return idPass;
		}


		public void setIdPass(BigDecimal idPass) {
			this.idPass = idPass;
		}

		public String getDesEstatus() {
			return desEstatus;
		}

		public void setDesEstatus(String desEstatus) {
			this.desEstatus = desEstatus;
		}

		public int getStatus() {
			return status;
		}

		public void setStatus(int status) {
			this.status = status;
		}

		public String getDesBloqueo() {
			return desBloqueo;
		}

		public void setDesBloqueo(String desBloqueo) {
			this.desBloqueo = desBloqueo;
		}

		@Override
		public int hashCode() {
			final int prime = 31;
			int result = 1;
			result = prime * result + ((amaterno == null) ? 0 : amaterno.hashCode());
			result = prime * result + ((apaterno == null) ? 0 : apaterno.hashCode());
			result = prime * result + ((bloqueo == null) ? 0 : bloqueo.hashCode());
			result = prime * result + ((centrocostos == null) ? 0 : centrocostos.hashCode());
			result = prime * result + ((correo == null) ? 0 : correo.hashCode());
			result = prime * result + ((desBloqueo == null) ? 0 : desBloqueo.hashCode());
			result = prime * result + ((desEstatus == null) ? 0 : desEstatus.hashCode());
			result = prime * result + ((direccion == null) ? 0 : direccion.hashCode());
			result = prime * result + ((estatus == null) ? 0 : estatus.hashCode());
			result = prime * result + ((falta == null) ? 0 : falta.hashCode());
			result = prime * result + ((fmodifica == null) ? 0 : fmodifica.hashCode());
			result = prime * result + ((gerencia == null) ? 0 : gerencia.hashCode());
			result = prime * result + ((idPais == null) ? 0 : idPais.hashCode());
			result = prime * result + ((idPass == null) ? 0 : idPass.hashCode());
			result = prime * result + ((idrol == null) ? 0 : idrol.hashCode());
			result = prime * result + ((idusuario == null) ? 0 : idusuario.hashCode());
			result = prime * result + ((nombre == null) ? 0 : nombre.hashCode());
			result = prime * result + ((numempleado == null) ? 0 : numempleado.hashCode());
			result = prime * result + ((sesionactiva == null) ? 0 : sesionactiva.hashCode());
			result = prime * result + status;
			result = prime * result + ((ualta == null) ? 0 : ualta.hashCode());
			result = prime * result + ((umodifica == null) ? 0 : umodifica.hashCode());
			return result;
		}

		@Override
		public boolean equals(Object obj) {
			if (this == obj)
				return true;
			if (obj == null)
				return false;
			if (getClass() != obj.getClass())
				return false;
			UsuariosVO other = (UsuariosVO) obj;
			if (amaterno == null) {
				if (other.amaterno != null)
					return false;
			} else if (!amaterno.equals(other.amaterno))
				return false;
			if (apaterno == null) {
				if (other.apaterno != null)
					return false;
			} else if (!apaterno.equals(other.apaterno))
				return false;
			if (bloqueo == null) {
				if (other.bloqueo != null)
					return false;
			} else if (!bloqueo.equals(other.bloqueo))
				return false;
			if (centrocostos == null) {
				if (other.centrocostos != null)
					return false;
			} else if (!centrocostos.equals(other.centrocostos))
				return false;
			if (correo == null) {
				if (other.correo != null)
					return false;
			} else if (!correo.equals(other.correo))
				return false;
			if (desBloqueo == null) {
				if (other.desBloqueo != null)
					return false;
			} else if (!desBloqueo.equals(other.desBloqueo))
				return false;
			if (desEstatus == null) {
				if (other.desEstatus != null)
					return false;
			} else if (!desEstatus.equals(other.desEstatus))
				return false;
			if (direccion == null) {
				if (other.direccion != null)
					return false;
			} else if (!direccion.equals(other.direccion))
				return false;
			if (estatus == null) {
				if (other.estatus != null)
					return false;
			} else if (!estatus.equals(other.estatus))
				return false;
			if (falta == null) {
				if (other.falta != null)
					return false;
			} else if (!falta.equals(other.falta))
				return false;
			if (fmodifica == null) {
				if (other.fmodifica != null)
					return false;
			} else if (!fmodifica.equals(other.fmodifica))
				return false;
			if (gerencia == null) {
				if (other.gerencia != null)
					return false;
			} else if (!gerencia.equals(other.gerencia))
				return false;
			if (idPais == null) {
				if (other.idPais != null)
					return false;
			} else if (!idPais.equals(other.idPais))
				return false;
			if (idPass == null) {
				if (other.idPass != null)
					return false;
			} else if (!idPass.equals(other.idPass))
				return false;
			if (idrol == null) {
				if (other.idrol != null)
					return false;
			} else if (!idrol.equals(other.idrol))
				return false;
			if (idusuario == null) {
				if (other.idusuario != null)
					return false;
			} else if (!idusuario.equals(other.idusuario))
				return false;
			if (nombre == null) {
				if (other.nombre != null)
					return false;
			} else if (!nombre.equals(other.nombre))
				return false;
			if (numempleado == null) {
				if (other.numempleado != null)
					return false;
			} else if (!numempleado.equals(other.numempleado))
				return false;
			if (sesionactiva == null) {
				if (other.sesionactiva != null)
					return false;
			} else if (!sesionactiva.equals(other.sesionactiva))
				return false;
			if (status != other.status)
				return false;
			if (ualta == null) {
				if (other.ualta != null)
					return false;
			} else if (!ualta.equals(other.ualta))
				return false;
			if (umodifica == null) {
				if (other.umodifica != null)
					return false;
			} else if (!umodifica.equals(other.umodifica))
				return false;
			return true;
		}

		@Override
		public String toString() {
			return "UsuariosVO [idusuario=" + idusuario + ", nombre=" + nombre + ", apaterno=" + apaterno
					+ ", amaterno=" + amaterno + ", numempleado=" + numempleado + ", direccion=" + direccion
					+ ", gerencia=" + gerencia + ", centrocostos=" + centrocostos + ", correo=" + correo + ", bloqueo="
					+ bloqueo + ", sesionactiva=" + sesionactiva + ", falta=" + falta + ", ualta=" + ualta
					+ ", fmodifica=" + fmodifica + ", umodifica=" + umodifica + ", estatus=" + estatus + ", idPais="
					+ idPais + ", idrol=" + idrol + ", idPass=" + idPass + ", desEstatus=" + desEstatus
					+ ", desBloqueo=" + desBloqueo + ", status=" + status + "]";
		}

		
		
	
	
}
