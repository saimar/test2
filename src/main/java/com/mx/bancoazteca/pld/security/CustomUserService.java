package com.mx.bancoazteca.pld.security;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import com.mx.bancoazteca.pld.table.manager.TableContainer;
import com.mx.bancoazteca.pld.util.GeneraIdentificador;

import mx.com.bancoazteca.utils.exceptions.PLDException;


@Service
public class CustomUserService {

	private static final Logger LOG = LoggerFactory.getLogger(CustomUserService.class);
	
	private AdministracionSI administracionSI;
	private JdbcTemplate jdbcTemplate;


	@Autowired
	public void setAdministracionSI(AdministracionSI administracionSI) {
		this.administracionSI = administracionSI;
		
	}

	@Autowired
	@Qualifier("JDBCTemplateSI")
	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	@Value("${app.cveSystem}")
	private String cveSystem;

	@Value("${app.cve.Pais}")
	private String idPais;
	
	@Value("${pld.db.jdbc.PaginationSize}")
	private String MIN_PAGINATION_SIZE;//=1000;
		
	@Value("${pld.db.jdbc.MinPageSize}")
	private String MIN_PAGE_SIZE;

	public CustomUserService() {
		//LOG.info("@Service CustomUserService()");
	}
	
	public String getCveSystem() {
		return cveSystem;
	}

	public String getIdPais() {
		return idPais;
	}

	@SuppressWarnings("unchecked")
	public CustomUser loadUserByUsername(String token, String hostName, String ip) throws PLDException {
		LOG.info("@Service CustomUserService.loadUserByUsername()");
		

		IUsuario usuario = this.administracionSI.decodificaURL(token);

		

		final SimpleJdbcCall funcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("strAutentificaUsuarioPLD");
		final String result1 = "#result-set-1";

		
		funcCall.returningResultSet(result1, new RowMapper<ApplicationModule>() {

			public ApplicationModule mapRow(ResultSet rs, int rowNum) throws SQLException {
				ApplicationModule appModule = null;
				try {
					if (rs.getMetaData().getColumnCount() != 2) {
						appModule = new ApplicationModule();
						appModule.setRol(rs.getString("Rol"));
						appModule.setIdPerfil(rs.getInt("IdPerfil"));
						appModule.setIdModule(rs.getInt("IdModulo"));
						appModule.setDescription(rs.getString("Descripcion"));
						appModule.setImage(rs.getString("Imagen"));
						appModule.setMapping(rs.getString("Mapeo"));
						appModule.setActive(rs.getBoolean("Activo"));
						appModule.setIdParent(rs.getInt("IdPadre"));
						appModule.setIdOrder(rs.getInt("IdOrden"));
						appModule.setDirectory(rs.getString("Directorio"));
					} else {
						LOG.info("@Service :: strAutentificaUsuarioPLD :: Problemas al generar el aplication module");
						throw new PLDException(rs.getString("ERR_DES"));
					}
				} catch (Exception e) {// intercepta las posibles excepciones
										// que se generen al intentar
										// autentificar al usuario no solo
										// PLDException
					appModule = new ApplicationModule();
					appModule.setError(e.getMessage());
				}
				return appModule;
			}
		});
		
		Long execute_start = System.currentTimeMillis();
		
		String strIdentificador=GeneraIdentificador.generar(usuario);
		Map<String, Object> inParamMap = new HashMap<String, Object>();
		inParamMap.put("IdAleatorio", strIdentificador);
		inParamMap.put("N_EMPLEADO", usuario.getNumeroEmpleado());
		inParamMap.put("CVESISTEMA", this.cveSystem);
		inParamMap.put("IP", "127.1.1");
		inParamMap.put("PC", "PC");
		
		//System.out.println(this.cveSystem);
		
		LOG.info(" Prepared query:{call  strAutentificaUsuarioPLD ("+strIdentificador.toString()+","+usuario.getNumeroEmpleado()+","+this.cveSystem+",127.1.1,PC) }");
		
		List<ApplicationModule> listAppMod = (List<ApplicationModule>) funcCall.execute(new MapSqlParameterSource(inParamMap)).get(result1);
		
		Long execute_end = System.currentTimeMillis();
		if ((execute_end - execute_start) > 1000) {
			LOG.info("-- reducer --" + (execute_end - execute_start));
			LOG.info(" Query ejecutado: strAutentificaUsuarioPLD  Tiempo de ejecucion :"+ String.valueOf((execute_end - execute_start) % 1000) + " ms ");
		} else {
			LOG.info(" Query ejecutado: strAutentificaUsuarioPLD  Tiempo de ejecucion :"+ String.valueOf((execute_end - execute_start)) + " ms ");
		}
		
		
		
		String strRol = "";
		Integer strPerfil = 0;
		if (listAppMod.isEmpty()) {
			LOG.info("Problemas en la autentificación, la cuenta no devuelve ningun modulo.");
			throw new PLDException("Problemas en la autentificación, la cuenta no devuelve ningun modulo.");
		} else {
			//System.out.println("listAppMod.error");
			//System.out.println(listAppMod.get(0).getError());
			
			if (listAppMod.get(0).getError() != null) {
				LOG.info("CustomUserService :: loadUserByUsername :: "+listAppMod.get(0).getError());
				throw new PLDException(listAppMod.get(0).getError());
			} else {
				for (ApplicationModule c : listAppMod) {
					strRol = (c.getRol());
					strPerfil = (c.getIdPerfil());
				}
			}
		}

		Collection<GrantedAuthority> roles = new ArrayList<GrantedAuthority>();
		SimpleGrantedAuthority rol = new SimpleGrantedAuthority("ROLE_ADMIN");
		roles.add(rol);

		CustomCredentials credencial = new CustomCredentials();
		credencial.setIdProfile(strPerfil);
		credencial.setRol(strRol);
		// credencial.setTimeOut(getSessionTimeOut());
		credencial.setModules(listAppMod);
		
		
		String strTools="SELECT PH.IdModulo,PH.IdHerramienta,H.Herramienta,PH.Privilegio,'E' AS Nivel"+
				" FROM tbl_PrivilegiosHerramientas PH WITH(NOLOCK)"+
				" LEFT JOIN tbl_CatHerramientas H WITH(NOLOCK) ON H.IdHerramienta=PH.IdHerramienta"+
				" LEFT JOIN tbl_PerfilesSistema PS WITH(NOLOCK) ON PS.IdPerfil=PH.IdPerfil"+
				" WHERE PS.CveSistema='"+this.cveSystem+"' AND PH.IdPerfil='"+strPerfil+"' ";
		 execute_start = System.currentTimeMillis();
		
		//jdbcTemplate.queryForList(strTools);
		List<ApplicationTool> appTools = jdbcTemplate.query(strTools, new RowMapper<ApplicationTool>() {
			public ApplicationTool mapRow(ResultSet rs, int rowNum) throws SQLException {
				if (rs.getMetaData().getColumnCount()!=2){
					final ApplicationTool appTool = new ApplicationTool();
					appTool.setIdModule(rs.getInt("IdModulo"));
					appTool.setIdTool(rs.getInt("IdHerramienta"));
					appTool.setTool(rs.getString("Herramienta").trim());
					appTool.setPrivilege(rs.getInt("Privilegio"));
					appTool.setLevel(rs.getString("Nivel"));
					return appTool;
				}else{
					LOG.error("@Service :: strgetTools :: Error al generar el aplication module");
					return null;
				}
			}
		});
		execute_end = System.currentTimeMillis();
		if ((execute_end - execute_start) > 1000) {
			LOG.info("-- reducer --" + (execute_end - execute_start));
			LOG.info(" Query ejecutado:" + strTools + "  Tiempo de ejecucion :"
					+ String.valueOf((execute_end - execute_start) % 1000) + " ms ");
		} else {
			LOG.info(" Query ejecutado:" + strTools + "  Tiempo de ejecucion :"
					+ String.valueOf((execute_end - execute_start)) + " ms ");
		}
		//tools
		if(appTools.size()>0){
			for(int ii=0 ; ii< credencial.getModules().size();ii++){
				for(ApplicationTool appTool: appTools){
					Integer a= credencial.getModules().get(ii).getIdModule();
					Integer b= appTool.getIdModule();
					if( (a.intValue()) == (b.intValue()) ){
						credencial.getModules().get(ii).getTools().add(appTool);
					}
				}	
			}
		}

		
		
		
		
		credencial.generateMapChildsModules();
		
		credencial.generateTreeModules();
		
		

		CustomUser customUser = new CustomUser("1", "1", roles);
		customUser.setNoEmpleado(usuario.getNumeroEmpleado());;
		customUser.setAssignedIP(ip);
		customUser.setCompany(usuario.getCompania());
		customUser.setFullName(usuario.getNombreCompleto());
		customUser.setMail(usuario.getMail());
		customUser.setMasterKey(usuario.getUsrLLaveMaestra());
		customUser.setCredential(credencial);
		customUser.setContainer(new TableContainer(usuario.getNumeroEmpleado(),new Integer(MIN_PAGINATION_SIZE),new Integer(MIN_PAGE_SIZE)));
		customUser.setIdPais(idPais);
		
		return customUser;

	}

}