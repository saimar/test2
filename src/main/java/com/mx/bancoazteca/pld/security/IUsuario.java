package com.mx.bancoazteca.pld.security;

public interface IUsuario {

    public static final long serialVersionUID = 3L;

    public abstract void setUsrLLaveMaestra(String s);

    public abstract String getUsrLLaveMaestra();

    public abstract void setNombreCompleto(String s);

    public abstract String getNombreCompleto();

    public abstract void setNumeroEmpleado(String s);

    public abstract String getNumeroEmpleado();

    public abstract void setCompania(String s);

    public abstract String getCompania();

    public abstract void setMail(String s);

    public abstract String getMail();

    public abstract void setIpAsignada(String s);

    public abstract String getIpAsignada();

    public abstract void setNombre(String s);

    public abstract String getNombre();

    public abstract void setApPaterno(String s);

    public abstract String getApPaterno();

    public abstract void setApMaterno(String s);

    public abstract String getApMaterno();

    public abstract void setApCasada(String s);

    public abstract String getApCasada();

    /*public abstract void setCredencial(Credencial credencial);

    public abstract Credencial getCredencial();

    public abstract RolUsuario autentifica()
        throws InfoCredencialNoValidaException, InfoUsuarioNoDisponibleException;

    public abstract void registrarSalida()
        throws UsuarioException;
*/
    public abstract boolean credencialExpiro();
}
