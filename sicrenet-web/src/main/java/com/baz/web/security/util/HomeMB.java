package com.baz.web.security.util;

import java.awt.Graphics;
import java.awt.Image;
import java.awt.datatransfer.SystemFlavorMap;
import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.Serializable;
import java.util.Calendar;
import java.util.Date;

import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;
import javax.imageio.ImageIO;
import javax.swing.ImageIcon;

import org.primefaces.model.DefaultStreamedContent;
import org.primefaces.model.StreamedContent;

import com.baz.commons.domain.CatUsuarios;
import com.baz.ejb.service.LoginService;


@ManagedBean(name="home")
@SessionScoped
public class HomeMB implements Serializable{
	
	@EJB
	LoginService loginService;
	
	private CatUsuarios usuario;  
	
	private String mexico;
	private String honduras;
	private String guatemala;
	private String panama;
	private String elSalvador;
	private String peru;
	
	private String pais;
	
	private Date fecha;
	
	
	
	
	
//	
//	public void decrementMonth() throws Exception {  
//	    Calendar c = Calendar.getInstance();
//	    c.setTime(this.selectedDate);
//	    c.add(Calendar.MONTH, -1);
//
//	            //... business logic to update date dependent data
//	} 
//	
//	
//	public void incrementMonth() throws Exception {  
//	    Calendar c = Calendar.getInstance();
//	    c.setTime(this.selectedDate);
//	    c.add(Calendar.MONTH, 1);
//
//	            //... business logic to update date dependent data
//	}
	
	@PostConstruct
	public void HomeMB(){
		usuario = loginService.getUsers();
		
		switch (usuario.getIdPais().getIdPais().intValue()) {
		case 1:
			System.out.println("MEXICO");
			setPais("../Images/PanelDeControl/BanderasRect/mexico.gif");
			break;
		case 2:
			System.out.println("HONDURAS");
			setPais("../Images/PanelDeControl/BanderasRect/honduras.gif");
			break;
		case 21:
			System.out.println("GUATEMALA");
			setPais("../Images/PanelDeControl/BanderasRect/guatemala.gif");
			break;
		case 4:
			System.out.println("PANAMA");
			setPais("../Images/PanelDeControl/BanderasRect/panama.gif");
			break;
		case 5:
			System.out.println(" EL SALVADOR");
			setPais("../Images/PanelDeControl/BanderasRect/elsalvador.gif");
			break;
		case 6:
			System.out.println("PERU");
			setPais("../Images/PanelDeControl/BanderasRect/peru.gif");
			break;
		default:
			System.out.println("ERROR");
			break;
		}
	}
	

	public void home() throws IOException{
	FacesContext.getCurrentInstance().
    getExternalContext().redirect("../pages/Bienvenida.xhtml");
	}
	
	public void decrementMonth() throws Exception {  
	    Calendar c = Calendar.getInstance();
	    c.setTime(this.fecha);
	    c.add(Calendar.MONTH, -1);
	    
	    

	    System.out.println("Fecha::::" + fecha);
	    System.out.println("Fecha::::c:::" + c);

	            //... business logic to update date dependent data
	} 
	
	public void incrementMonth() throws Exception {  
	    Calendar c = Calendar.getInstance();
	    c.setTime(this.fecha);
	    c.add(Calendar.MONTH, 1);
	    System.out.println("Fecha::::" + fecha);
	    System.out.println("Fecha::::c:::" + c);

	            //... business logic to update date dependent data
	}
	
	public CatUsuarios getUsuario() {
		return usuario;
	}
	public void setUsuario(CatUsuarios usuario) {
		this.usuario = usuario;
	}


	public String getMexico() {
		return mexico;
	}


	public void setMexico(String mexico) {
		this.mexico = mexico;
	}


	public String getHonduras() {
		return honduras;
	}


	public void setHonduras(String honduras) {
		this.honduras = honduras;
	}


	public String getGuatemala() {
		return guatemala;
	}


	public void setGuatemala(String guatemala) {
		this.guatemala = guatemala;
	}


	public String getPanama() {
		return panama;
	}


	public void setPanama(String panama) {
		this.panama = panama;
	}


	public String getElSalvador() {
		return elSalvador;
	}


	public void setElSalvador(String elSalvador) {
		this.elSalvador = elSalvador;
	}


	public String getPeru() {
		return peru;
	}


	public void setPeru(String peru) {
		this.peru = peru;
	}


	public String getPais() {
		return pais;
	}


	public void setPais(String pais) {
		this.pais = pais;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	
	
//	
//
//	 
//	public StreamedContent getPhoto1() {
//	        byte[] myByteArray = meFacade.find(selected).getPhotoOne();//code for MeFacade not shown here
//	        photo1 = new DefaultStreamedContent(new ByteArrayInputStream(myByteArray) , "image/jpeg");
//	       if(photo1!=null){
//	        System.out.print("photo1 is NOT null");
//	      }
//	        return photo1;
//	    }
//
//	    public void setPhoto1(StreamedContent photo1) {
//	        this.photo1 = photo1;
//	    }
//
//	
//	    public StreamedContent getImage() {
//	    	ImageIcon ii = getTestEmployee().getImageIcon();
//	    	if (ii == null) return null;
//	    	Image i = ii.getImage();
//	    	BufferedImage bi = new BufferedImage(i.getWidth(null),i.getHeight(null),BufferedImage.TYPE_INT_RGB);
//	    	Graphics g = bi.getGraphics();
//	    	g.drawImage(i,0,0,null);
//	    	g.dispose();
//	    	ByteArrayOutputStream bas = new ByteArrayOutputStream();
//	    	try {
//	    	ImageIO.write(bi,"gif", bas);
//	    	} catch (IOException e) {
//	    	e.printStackTrace();
//	    	}
//	    	byte[] data = bas.toByteArray();
//	    	InputStream is = new ByteArrayInputStream(data);
//	    	return new DefaultStreamedContent(is);
//	    	}
//	    
//	    
	
//	
//	 switch (idPais) {
//   case '1'/*México*/:
//       $("#imgBandera").attr("src", "../../Images/PanelDeControl/BanderasRect/mexico.gif");
//       $("#imgBandera").attr("title", "México" + (PaisDeBD == "1" ? " (Clic para Cambiar de País u Oprima F2)" : ""));
//       break;
//   case '2'/*Honduras*/:
//	   $("#imgBandera").attr("src", "../../Images/PanelDeControl/BanderasRect/honduras.gif");
//       $("#imgBandera").attr("title", "Honduras" + (PaisDeBD == "1" ? " (Clic para Cambiar de País u Oprima F2)" : ""));
//	       
//       break;
//   case '4'/*Guatemala*/:
//	   $("#imgBandera").attr("src", "../../Images/PanelDeControl/BanderasRect/guatemala.gif");
//       $("#imgBandera").attr("title", "Guatemala" + (PaisDeBD == "1" ? " (Clic para Cambiar de País u Oprima F2)" : ""));
//       break;
//   case '6'/*Perú*/:
//       $("#imgBandera").attr("src", "../../Images/PanelDeControl/BanderasRect/peru.gif");
//       $("#imgBandera").attr("title", "Perú" + (PaisDeBD == "1" ? " (Clic para Cambiar de País u Oprima F2)" : ""));
//       break;
//   case '7'/*Panamá*/:
//       $("#imgBandera").attr("src", "../../Images/PanelDeControl/BanderasRect/panama.gif");
//       $("#imgBandera").attr("title", "Panamá" + (PaisDeBD == "1" ? " (Clic para Cambiar de País u Oprima F2)" : ""));
//       break;
//   case '8'/*El Salvador*/:
//       $("#imgBandera").attr("src", "../../Images/PanelDeControl/BanderasRect/elsalvador.gif");
//       $("#imgBandera").attr("title", "El Salvador" + (PaisDeBD == "1" ? " (Clic para Cambiar de País u Oprima F2)" : ""));
//       break;
//   case '9'/*Argentina*/:
//       $("#imgBandera").attr("src", "../../Images/PanelDeControl/BanderasRect/argentina.png");
//       $("#imgBandera").attr("title", "Argentina" + (PaisDeBD == "1" ? " (Clic para Cambiar de País u Oprima F2)" : ""));
//       break;
//   case '11' /*Brasil*/:
//       $("#imgBandera").attr("src", "../../Images/PanelDeControl/BanderasRect/brasil.gif");
//       $("#imgBandera").attr("title", "Brasil" + (PaisDeBD == "1" ? " (Clic para Cambiar de País u Oprima F2)" : ""));
//       break;
//}
//		
//		}
}
